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


class VersionImageSchema(BaseModel):
    full: str
    main: str
    thumb: str


class VersionDatesSchema(BaseModel):
    start: str
    end: str | None = None


class UrbanObjectVersionDetailSchema(BaseModel):
    id: int
    number: int
    title: str
    description: str
    status: str
    ownership: str
    address: str
    type: str | None = None
    dates: VersionDatesSchema
    images: list[VersionImageSchema] = []


class UrbanChangeDatesSchema(BaseModel):
    start: str
    end: str | None = None


class UrbanChangeDetailSchema(BaseModel):
    id: int
    title: str
    description: str
    type: str
    author: str | None = None
    status: str
    dates: UrbanChangeDatesSchema
    from_version_id: int | None = None
    to_version_id: int | None = None


class UrbanObjectDetailResponseSchema(BaseModel):
    id: int
    name: str
    address: str | None = None
    coordinates: list[float] | None = None
    versions: list[UrbanObjectVersionDetailSchema]
    changes: list[UrbanChangeDetailSchema]
