"""Urban object response schemas"""

from typing import Optional, List
from pydantic import BaseModel


class UrbanObjectResponseSchema(BaseModel):
    id: int
    name: str
    image: Optional[str] = None
    address: Optional[str] = None
    coordinates: Optional[List[float]] = None
    date: Optional[str] = None
    version_count: Optional[int] = None
    type: Optional[str] = None
    ownership: Optional[str] = None
    status: Optional[str] = None
