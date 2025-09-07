from datetime import datetime
from typing import List, Optional
from dataclasses import dataclass
from uuid import UUID


@dataclass
class Coordinates:
    """Coordinates domain model"""
    latitude: float
    longitude: float


@dataclass
class Media:
    """Media domain model"""
    id: UUID
    url: str
    media_type: str  # 'image', 'video', etc.
    created_date: datetime
    description: Optional[str] = None


@dataclass
class UrbanChange:
    """Urban Change domain model"""
    id: UUID
    title: str
    description: str
    change_type: str  # 'creation', 'modification', 'destruction'
    start_date: datetime
    author: str
    created_date: datetime
    end_date: Optional[datetime] = None


@dataclass
class UrbanObjectVersion:
    """Urban Object Version domain model"""
    id: UUID
    version_number: int
    title: str
    description: str
    status: str  # 'regular', 'changing', 'destroying'
    ownership: str  # 'private', 'governmental', 'mixed'
    address: str
    coordinates: Coordinates
    media: List[Media]
    changes: List[UrbanChange]
    created_date: datetime
    is_current: bool = False


@dataclass
class UrbanObject:
    """Urban Object domain model"""
    id: UUID
    name: str
    type: str  # 'building', 'museum', 'library', 'office', etc.
    created_date: datetime
    last_modified: datetime
    code: Optional[str] = None
    versions: List[UrbanObjectVersion] = None
    
    def __post_init__(self):
        if self.versions is None:
            self.versions = []
    
    @property
    def current_version(self) -> Optional[UrbanObjectVersion]:
        """Get the current version of the urban object"""
        for version in self.versions:
            if version.is_current:
                return version
        return None
    
    @property
    def version_count(self) -> int:
        """Get the total number of versions"""
        return len(self.versions)
    
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
                if media.media_type == 'image':
                    return media.url
        return None
