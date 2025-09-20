"""Service layer for urban objects business logic"""

import logging
from typing import List, Optional
from urllib.parse import quote
from ..domain.models import UrbanObject, UrbanObjectVersion, UrbanChange
from ..schemas.uo_schemas import (
    UrbanObjectResponseSchema,
    UrbanObjectDetailResponseSchema,
    UrbanObjectVersionDetailSchema,
    UrbanChangeDetailSchema,
    VersionImageSchema,
    VersionDatesSchema,
    UrbanChangeDatesSchema,
)
from ..uow import AbstractUnitOfWork
from ..settings import settings

logger = logging.getLogger(__name__)


class UrbanObjectService:
    """Service layer for urban objects business logic"""

    def __init__(self, uow: AbstractUnitOfWork):
        self.uow = uow

    async def get_all_urban_objects(self) -> List[UrbanObjectResponseSchema]:
        """Get all urban objects and convert to DTOs"""
        try:
            async with self.uow:
                all_objects = await self.uow.urban_objects.get_all()
                response_objects = [self._to_response_dto(obj) for obj in all_objects]
                logger.info(f"Successfully retrieved {len(response_objects)} urban objects")
                return response_objects
        except Exception as e:
            logger.error(f"Error retrieving urban objects: {e}")
            raise

    async def get_urban_object_detail(self, object_id: int) -> Optional[UrbanObjectDetailResponseSchema]:
        """
        Get detail info (versions + changes) with normalized structure.
        - Versions are returned newest-first (by start_date desc) to match frontend timeline
        - Changes are paired to adjacent versions and returned newest-first
        """
        try:
            async with self.uow:
                obj = await self.uow.urban_objects.get_by_id(object_id)
                if not obj:
                    return None

                # Top-level coordinates from current version
                coordinates = None
                if obj.coordinates:
                    coordinates = [obj.coordinates.latitude, obj.coordinates.longitude]

                # Build versions DTO - sort by start_date DESC (newest first)
                versions_sorted_asc = sorted(obj.versions, key=lambda v: v.start_date)
                versions_sorted_desc = list(reversed(versions_sorted_asc))
                versions_dto: List[UrbanObjectVersionDetailSchema] = [
                    self._to_version_detail_dto(v, obj.type) for v in versions_sorted_desc
                ]

                # Pair changes to adjacent version pairs using ASC order for pairing
                changes_paired = self._pair_changes_with_versions(versions_sorted_asc, obj.changes)
                print(changes_paired)
                # Return newest-first for UI
                changes_dto: List[UrbanChangeDetailSchema] = list(reversed(changes_paired))

                return UrbanObjectDetailResponseSchema(
                    id=obj.id,
                    name=obj.name,
                    address=obj.address,
                    coordinates=coordinates,
                    versions=versions_dto,
                    changes=changes_dto,
                )
        except Exception as e:
            logger.error(f"Error retrieving urban object detail: {e}")
            raise

    def _to_response_dto(self, obj: UrbanObject) -> UrbanObjectResponseSchema:
        """Convert domain model to response DTO - matches frontend expectations"""
        coordinates = None
        if obj.coordinates:
            coordinates = [obj.coordinates.latitude, obj.coordinates.longitude]

        date_str = None
        if obj.created_date:
            date_str = obj.created_date.strftime("%d/%m/%Y")

        image_url = obj.image_url
        if image_url and image_url.startswith("/"):
            try:
                image_url = f"{settings.base_url}{quote(image_url, safe='/')}"
            except Exception:
                image_url = f"{settings.base_url}{image_url}"

        return UrbanObjectResponseSchema(
            id=obj.id,
            name=obj.name,
            image=image_url,
            address=obj.address,
            coordinates=coordinates,
            date=date_str,
            version_count=obj.version_count,
            type=obj.type,
            ownership=obj.ownership,
            status=obj.status,
        )

    def _build_abs_url(self, url: str) -> str:
        if not url:
            return url
        if url.startswith("http://") or url.startswith("https://"):
            return url
        if not url.startswith("/"):
            # Treat as already absolute or relative path — prepend slash
            url = "/" + url
        try:
            return f"{settings.base_url}{quote(url, safe='/')}"
        except Exception:
            return f"{settings.base_url}{url}"

    def _to_version_detail_dto(self, v: UrbanObjectVersion, obj_type: Optional[str]) -> UrbanObjectVersionDetailSchema:
        images: List[VersionImageSchema] = []
        for m in (v.media or []):
            src = self._build_abs_url(m.source)
            images.append(VersionImageSchema(full=src, main=src, thumb=src))
        return UrbanObjectVersionDetailSchema(
            id=v.id,
            number=v.version,
            title=v.title,
            description=v.description,
            status=v.status,
            ownership=v.ownership,
            address=v.address,
            type=obj_type,
            dates=VersionDatesSchema(
                start=v.start_date.date().isoformat(),
                end=v.end_date.date().isoformat() if v.end_date else None,
            ),
            images=images,
        )

    def _pair_changes_with_versions(
        self,
        versions_asc: List[UrbanObjectVersion],
        changes: List[UrbanChange],
    ) -> List[UrbanChangeDetailSchema]:
        """
        Map each change to a window on the timeline:
        - (None -> v1) for creation or anything occurring before the first version
        - (v_i -> v_{i+1}) for modifications between adjacent versions
        - (v_last -> None) for deletion or anything after the last version
        Returns a list of all changes (not limited by number of version pairs), in ASC order.
        """
        changes_sorted = sorted(changes or [], key=lambda c: c.start_date)
        result: List[UrbanChangeDetailSchema] = []

        if not versions_asc:
            # No versions: return changes with no linkage
            for ch in changes_sorted:
                result.append(
                    UrbanChangeDetailSchema(
                        id=ch.id,
                        title=ch.title,
                        description=ch.description,
                        type=ch.change_type,
                        author=ch.author,
                        status=ch.status,
                        dates=UrbanChangeDatesSchema(
                            start=ch.start_date.date().isoformat(),
                            end=ch.end_date.date().isoformat() if ch.end_date else None,
                        ),
                        from_version_id=None,
                        to_version_id=None,
                    )
                )
            return result

        first_v = versions_asc[0]
        last_v = versions_asc[-1]

        for ch in changes_sorted:
            ch_type = (ch.change_type or "").lower()
            from_id = None
            to_id = None

            # Before first version or explicit creation
            if ch_type == "creation" or ch.start_date <= first_v.start_date:
                from_id = None
                to_id = first_v.id
            # After last version or explicit deletion
            elif ch_type == "deletion" or ch.start_date > last_v.start_date:
                from_id = last_v.id
                to_id = None
            else:
                # Find the adjacent window v_i -> v_{i+1} such that
                # v_i.start < change.start <= v_{i+1}.start
                for i in range(len(versions_asc) - 1):
                    a = versions_asc[i]
                    b = versions_asc[i + 1]
                    if ch.start_date > a.start_date and ch.start_date <= b.start_date:
                        from_id = a.id
                        to_id = b.id
                        break
                # Fallbacks in case of exact boundary mismatches
                if from_id is None and to_id is None:
                    if ch.start_date <= first_v.start_date:
                        to_id = first_v.id
                    else:
                        from_id = last_v.id

            result.append(
                UrbanChangeDetailSchema(
                    id=ch.id,
                    title=ch.title,
                    description=ch.description,
                    type=ch.change_type,
                    author=ch.author,
                    status=ch.status,
                    dates=UrbanChangeDatesSchema(
                        start=ch.start_date.date().isoformat(),
                        end=ch.end_date.date().isoformat() if ch.end_date else None,
                    ),
                    from_version_id=from_id,
                    to_version_id=to_id,
                )
            )

        return result
