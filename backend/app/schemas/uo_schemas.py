from typing import Optional, List
from pydantic import BaseModel


class UrbanObjectResponseSchema(BaseModel):
    """Urban object response schema - matches frontend expectations"""
    id: int  # Frontend expects integer ID
    name: str
    image: Optional[str]  # Frontend expects 'image' field
    address: Optional[str]
    date: str  # Frontend expects formatted date string
    floors: Optional[int]  # Frontend expects floors field
    type: str
    ownership: Optional[str]
    status: Optional[str]
    coordinates: Optional[List[float]]  # Frontend expects [lat, lng] array


class PaginationSchema(BaseModel):
    """Pagination metadata schema"""
    current_page: int
    total_pages: int
    total_items: int
    items_per_page: int
    has_next: bool
    has_previous: bool


class FiltersAppliedSchema(BaseModel):
    """Applied filters schema"""
    name: str
    type: str
    status: str
    ownership: str


class UrbanObjectsListResponse(BaseModel):
    """Complete response schema for urban objects list"""
    data: List[UrbanObjectResponseSchema]
    pagination: PaginationSchema
    filters_applied: FiltersAppliedSchema
