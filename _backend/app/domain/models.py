from datetime import datetime
from typing import List, Optional
from dataclasses import dataclass
from enum import Enum


class ChangeType(str, Enum):
    CREATION = "creation"
    MODIFICATION = "modification"
    DELETION = "deletion"


@dataclass
class Coordinates:
    """Coordinates domain model"""
    latitude: float
    longitude: float


@dataclass
class Media:
    """Media domain model"""
    id: int
    source: str
    created_date: datetime
    title: Optional[str] = None
    description: Optional[str] = None


@dataclass
class UrbanChange:
    """Urban Change domain model"""
    id: int
    title: str
    description: str
    change_type: str
    author: str
    status: str
    created_date: datetime
    start_date: datetime
    end_date: Optional[datetime] = None


@dataclass
class UrbanObjectVersion:
    """Urban Object Version domain model"""
    id: int
    version: int
    title: str
    description: str
    status: str
    ownership: str
    address: str
    coordinates: Coordinates
    media: List[Media]
    created_date: datetime
    start_date: datetime
    end_date: Optional[datetime] = None
    is_current: bool = False


@dataclass
class UrbanObject:
    """Urban Object domain model"""
    id: int
    name: str
    type: str
    created_date: datetime
    last_modified: datetime
    versions: List[UrbanObjectVersion]
    changes: List[UrbanChange]
    version_count: Optional[int] = None

    @property
    def current_version(self) -> Optional[UrbanObjectVersion]:
        """Get the current version of the urban object"""
        for version in self.versions:
            if version.is_current:
                return version
        return None

    @property
    def status(self) -> Optional[str]:
        """Get status from current version"""
        current = self.current_version
        return current.status if current else None

    @property
    def ownership(self) -> Optional[str]:
        """Get ownership from current version"""
        current = self.current_version
        return current.ownership if current else None

    @property
    def address(self) -> Optional[str]:
        """Get address from current version"""
        current = self.current_version
        return current.address if current else None

    @property
    def coordinates(self) -> Optional[Coordinates]:
        """Get coordinates from current version"""
        current = self.current_version
        return current.coordinates if current else None

    @property
    def image_url(self) -> Optional[str]:
        """Get first image URL from current version"""
        current = self.current_version
        if current and current.media:
            for media in current.media:
                return media.source
        return None
