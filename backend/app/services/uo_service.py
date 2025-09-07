import logging
import math
from typing import List, Dict, Any, Optional
from app.models.domain import UrbanObject
from app.schemas.uo_schemas import (
    UrbanObjectResponseSchema,
    PaginationSchema,
    FiltersAppliedSchema
)
from app.uow import AbstractUnitOfWork

logger = logging.getLogger(__name__)


class UrbanObjectService:
    """Service layer for urban objects business logic"""
    
    def __init__(self, uow: AbstractUnitOfWork):
        self.uow = uow
    
    async def get_urban_objects_list(
        self,
        name: Optional[str] = None,
        type: str = "any",
        status: str = "any",
        ownership: str = "any",
        page: int = 1,
        limit: int = 20,
        sort_by: str = "name",
        sort_order: str = "asc"
    ) -> Dict[str, Any]:
        """Get paginated and filtered list of urban objects"""
        async with self.uow:
            # Get all objects
            all_objects = await self.uow.urban_objects.get_all()

            # Apply filters
            filtered_objects = self._apply_filters(all_objects, name, type, status, ownership)

            # Apply sorting
            sorted_objects = self._apply_sorting(filtered_objects, sort_by, sort_order)

            # Calculate pagination
            total_items = len(sorted_objects)
            total_pages = math.ceil(total_items / limit) if total_items > 0 else 1

            # Apply pagination
            start_index = (page - 1) * limit
            end_index = start_index + limit
            paginated_objects = sorted_objects[start_index:end_index]

            # Convert to response DTOs
            data = [self._to_response_dto(obj) for obj in paginated_objects]

            # Create pagination metadata
            pagination = PaginationSchema(
                current_page=page,
                total_pages=total_pages,
                total_items=total_items,
                items_per_page=limit,
                has_next=page < total_pages,
                has_previous=page > 1
            )

            # Create filters applied metadata
            filters_applied = FiltersAppliedSchema(
                name=name or "",
                type=type,
                status=status,
                ownership=ownership
            )
            
            return {
                "data": data,
                "pagination": pagination,
                "filters_applied": filters_applied
            }
    
    def _apply_filters(
        self,
        objects: List[UrbanObject],
        name: Optional[str],
        type: str,
        status: str,
        ownership: str
    ) -> List[UrbanObject]:
        """Apply filters to the list of objects"""
        filtered = objects

        # Name filter (partial match, case-insensitive)
        if name:
            filtered = [
                obj for obj in filtered
                if name.lower() in obj.name.lower()
            ]

        # Type filter
        if type and type != "any":
            filtered = [
                obj for obj in filtered
                if obj.type == type
            ]

        # Status filter
        if status and status != "any":
            filtered = [
                obj for obj in filtered
                if obj.status == status
            ]

        # Ownership filter
        if ownership and ownership != "any":
            filtered = [
                obj for obj in filtered
                if obj.ownership == ownership
            ]

        logger.info(f"Applied filters: {len(objects)} -> {len(filtered)} objects")
        return filtered
    
    def _apply_sorting(self, objects: List[UrbanObject], sort_by: str, sort_order: str) -> List[UrbanObject]:
        """Apply sorting to the list of objects"""
        reverse = sort_order == "desc"

        if sort_by == "name":
            return sorted(objects, key=lambda x: x.name.lower(), reverse=reverse)
        elif sort_by == "date":
            return sorted(objects, key=lambda x: x.created_date, reverse=reverse)
        elif sort_by == "type":
            return sorted(objects, key=lambda x: x.type, reverse=reverse)
        elif sort_by == "status":
            return sorted(objects, key=lambda x: x.status or "", reverse=reverse)
        else:
            # Default to name sorting
            return sorted(objects, key=lambda x: x.name.lower(), reverse=reverse)
    
    def _to_response_dto(self, obj: UrbanObject) -> UrbanObjectResponseSchema:
        """Convert domain model to response DTO - matches frontend expectations"""
        # Convert coordinates to array format [lat, lng]
        coordinates = None
        if obj.coordinates:
            coordinates = [obj.coordinates.latitude, obj.coordinates.longitude]

        # Format date as DD/MM/YYYY
        date_str = obj.created_date.strftime("%d/%m/%Y")

        # Convert UUID to integer for frontend compatibility
        # Using hash to get consistent integer from UUID
        id_int = abs(hash(str(obj.id))) % (10**9)

        # Get floors from version count (temporary mapping)
        floors = obj.version_count * 5 if obj.version_count else None

        return UrbanObjectResponseSchema(
            id=id_int,
            name=obj.name,
            image=obj.image_url,
            address=obj.address,
            date=date_str,
            floors=floors,
            type=obj.type,
            ownership=obj.ownership,
            status=obj.status,
            coordinates=coordinates
        )
