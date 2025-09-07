from abc import ABC, abstractmethod
from app.repositories.abstract import AbstractUrbanObjectRepository
from app.repositories.uo_repository import JsonUrbanObjectRepository


class AbstractUnitOfWork(ABC):
    """Abstract Unit of Work"""
    urban_objects: AbstractUrbanObjectRepository
    
    def __enter__(self):
        return self
    
    def __exit__(self, *args):
        self.rollback()
    
    async def __aenter__(self):
        return self
    
    async def __aexit__(self, *args):
        await self.rollback()
    
    @abstractmethod
    async def commit(self):
        pass
    
    @abstractmethod
    async def rollback(self):
        pass


class JsonUnitOfWork(AbstractUnitOfWork):
    """JSON-based Unit of Work implementation"""
    
    def __init__(self, data_file_path: str = "data/urban_objects.json"):
        self.data_file_path = data_file_path
    
    def __enter__(self):
        self.urban_objects = JsonUrbanObjectRepository(self.data_file_path)
        return super().__enter__()
    
    async def __aenter__(self):
        self.urban_objects = JsonUrbanObjectRepository(self.data_file_path)
        return await super().__aenter__()
    
    async def commit(self):
        # For JSON storage, no explicit commit needed
        pass
    
    async def rollback(self):
        # For JSON storage, no explicit rollback needed
        pass


# Dependency injection
def get_uow() -> AbstractUnitOfWork:
    """Get Unit of Work instance"""
    return JsonUnitOfWork()
