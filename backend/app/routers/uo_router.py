import logging
from typing import Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from app.schemas.uo_schemas import (
    UrbanObjectsListResponse
)
from app.services.uo_service import UrbanObjectService
from app.uow import AbstractUnitOfWork, get_uow

logger = logging.getLogger(__name__)

router = APIRouter()


def get_urban_object_service(uow: AbstractUnitOfWork = Depends(get_uow)) -> UrbanObjectService:
    """Dependency injection for urban object service"""
    return UrbanObjectService(uow)


@router.get("/urban-objects/", response_model=UrbanObjectsListResponse)
async def get_urban_objects(
    name: Optional[str] = Query(None, description="Partial match for object name"),
    type: str = Query("any", description="Object type filter"),
    status: str = Query("any", description="Object status filter"),
    ownership: str = Query("any", description="Ownership type filter"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("name", description="Field to sort by (name, date, type, status)"),
    sort_order: str = Query("asc", pattern="^(asc|desc)$", description="Sort direction"),
    service: UrbanObjectService = Depends(get_urban_object_service)
):
    """
    Get list of urban objects with pagination, filtering and sorting.
    
    - **name**: Partial match (case-insensitive) for object name
    - **type**: Object type (building, museum, library, office, etc.) or 'any'
    - **status**: Object status (regular, changing, destroying) or 'any'
    - **ownership**: Ownership type (private, governmental, mixed) or 'any'
    - **page**: Page number (minimum: 1)
    - **limit**: Items per page (minimum: 1, maximum: 100)
    - **sort_by**: Field to sort by (name, date, type, status)
    - **sort_order**: Sort direction (asc, desc)
    """
    try:
        logger.info(f"GET /urban-objects/ - params: name={name} type={type} status={status} ownership={ownership} page={page} limit={limit} sort_by={sort_by} sort_order={sort_order}")

        # Get data from service
        result = await service.get_urban_objects_list(
            name=name,
            type=type,
            status=status,
            ownership=ownership,
            page=page,
            limit=limit,
            sort_by=sort_by,
            sort_order=sort_order
        )
        
        logger.info(f"Returning {len(result['data'])} objects, page {page}")
        
        return result
        
    except Exception as e:
        logger.error(f"Error in get_urban_objects: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
