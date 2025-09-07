from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID
from app.models.domain import UrbanObject


class AbstractUrbanObjectRepository(ABC):
    """Abstract repository for urban objects"""
    
    @abstractmethod
    async def get_all(self) -> List[UrbanObject]:
        """Get all urban objects"""
        pass
    
    @abstractmethod
    async def get_by_id(self, object_id: UUID) -> Optional[UrbanObject]:
        """Get urban object by ID"""
        pass
    
    @abstractmethod
    async def count(self) -> int:
        """Get total count of urban objects"""
        pass
