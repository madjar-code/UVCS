"""Unit of Work pattern implementation"""

from abc import ABC
from .repositories.abstract import AbstractUrbanObjectRepository
from .settings import settings


class AbstractUnitOfWork(ABC):
    """Abstract Unit of Work"""

    urban_objects: AbstractUrbanObjectRepository

    def __enter__(self):
        return self

    def __exit__(self, *args):
        pass

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        pass


class CSVUnitOfWork(AbstractUnitOfWork):
    """CSV-based Unit of Work implementation"""

    def __init__(self, data_path: str):
        self.data_path = data_path

    def __enter__(self):
        from .repositories.uo_repository import CSVUrbanObjectRepository
        self.urban_objects = CSVUrbanObjectRepository(self.data_path)
        return super().__enter__()

    async def __aenter__(self):
        from .repositories.uo_repository import CSVUrbanObjectRepository
        self.urban_objects = CSVUrbanObjectRepository(self.data_path)
        return await super().__aenter__()


# Dependency injection
def get_uow() -> AbstractUnitOfWork:
    """Get Unit of Work instance for dependency injection"""
    return CSVUnitOfWork(settings.get_data_path())
