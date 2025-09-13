"""Service layer for urban objects business logic"""

import logging
from typing import List
from urllib.parse import quote
from ..domain.models import UrbanObject
from ..schemas.uo_schemas import UrbanObjectResponseSchema
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
                # Get all objects from repository
                all_objects = await self.uow.urban_objects.get_all()

                # Convert to response DTOs
                response_objects = [self._to_response_dto(obj) for obj in all_objects]

                logger.info(f"Successfully retrieved {len(response_objects)} urban objects")
                return response_objects

        except Exception as e:
            logger.error(f"Error retrieving urban objects: {e}")
            raise

    def _to_response_dto(self, obj: UrbanObject) -> UrbanObjectResponseSchema:
        """Convert domain model to response DTO - matches frontend expectations"""
        # Convert coordinates to array format [lat, lng] for map component
        coordinates = None
        if obj.coordinates:
            coordinates = [obj.coordinates.latitude, obj.coordinates.longitude]

        # Format date as DD/MM/YYYY for display
        date_str = None
        if obj.created_date:
            date_str = obj.created_date.strftime("%d/%m/%Y")

        # Convert UUID to integer for frontend compatibility
        # Using hash to get consistent integer from UUID
        id_int = abs(hash(str(obj.id))) % (10**9)

        # Build absolute image URL if it's a relative path
        image_url = obj.image_url
        if image_url and image_url.startswith("/"):
            try:
                image_url = f"{settings.base_url}{quote(image_url, safe='/')}"
            except Exception:
                image_url = f"{settings.base_url}{image_url}"

        return UrbanObjectResponseSchema(
            id=id_int,
            name=obj.name,
            image=image_url,  # Absolute URL if relative path was provided
            address=obj.address,  # Address from current version
            coordinates=coordinates,  # [lat, lng] for map
            date=date_str,  # Formatted creation date
            version_count=obj.version_count,  # Number of versions
            type=obj.type,  # Object type
            ownership=obj.ownership,  # Ownership from current version
            status=obj.status  # Status from current version
        )
