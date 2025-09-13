"""Urban objects API router"""

import logging
from typing import List
from fastapi import APIRouter, Depends, HTTPException

from ..schemas.uo_schemas import UrbanObjectResponseSchema
from ..service.uo_service import UrbanObjectService
from ..uow import AbstractUnitOfWork, get_uow

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1", tags=["urban-objects"])


def get_urban_object_service(uow: AbstractUnitOfWork = Depends(get_uow)) -> UrbanObjectService:
    """Dependency injection for urban object service"""
    return UrbanObjectService(uow)


@router.get("/urban-objects", response_model=List[UrbanObjectResponseSchema])
async def get_urban_objects(
    service: UrbanObjectService = Depends(get_urban_object_service)
):
    """
    Get all urban objects

    Returns a list of all urban objects formatted for frontend consumption.
    Each object includes:
    - Basic metadata (id, name, type, date)
    - Current version details (status, ownership, address)
    - Coordinates in [latitude, longitude] format for map display
    - Media information (image URL)
    - Version count for display
    """
    try:
        logger.info("Fetching all urban objects")
        urban_objects = await service.get_all_urban_objects()
        logger.info(f"Successfully returned {len(urban_objects)} urban objects")
        return urban_objects

    except Exception as e:
        logger.error(f"Error fetching urban objects: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error while fetching urban objects"
        )
