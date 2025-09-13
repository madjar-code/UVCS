from abc import ABC, abstractmethod
from typing import List
from ..domain.models import UrbanObject


class AbstractUrbanObjectRepository(ABC):
    """Abstract repository for urban objects"""
    
    @abstractmethod
    async def get_all(self) -> List[UrbanObject]:
        """Get all urban objects"""
        pass
