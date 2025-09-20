from abc import ABC, abstractmethod
from typing import List, Optional
from ..domain.models import UrbanObject


class AbstractUrbanObjectRepository(ABC):
    """Abstract repository for urban objects"""

    @abstractmethod
    async def get_all(self) -> List[UrbanObject]:
        """Get all urban objects"""
        pass

    @abstractmethod
    async def get_by_id(self, object_id: int) -> Optional[UrbanObject]:
        """Get single urban object with all versions and changes by int id"""
        pass
