import json
import logging
from datetime import datetime
from pathlib import Path
from typing import List, Optional
from uuid import UUID

from app.models.domain import (
    UrbanObject, UrbanObjectVersion, UrbanChange, Media, Coordinates
)
from app.repositories.abstract import AbstractUrbanObjectRepository

logger = logging.getLogger(__name__)


class JsonUrbanObjectRepository(AbstractUrbanObjectRepository):
    """JSON-based repository for urban objects"""
    
    def __init__(self, data_file_path: str = "data/urban_objects.json"):
        self.data_file_path = Path(data_file_path)
        self._cache: Optional[List[UrbanObject]] = None
    
    async def get_all(self) -> List[UrbanObject]:
        """Get all urban objects from JSON file"""
        if self._cache is None:
            await self._load_data()
        return self._cache or []
    
    async def get_by_id(self, object_id: UUID) -> Optional[UrbanObject]:
        """Get urban object by ID"""
        objects = await self.get_all()
        for obj in objects:
            if obj.id == object_id:
                return obj
        return None
    
    async def count(self) -> int:
        """Get total count of urban objects"""
        objects = await self.get_all()
        return len(objects)
    
    async def _load_data(self) -> None:
        """Load data from JSON file"""
        try:
            if not self.data_file_path.exists():
                logger.warning(f"Data file {self.data_file_path} not found")
                self._cache = []
                return
            
            with open(self.data_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            self._cache = [self._parse_urban_object(obj_data) for obj_data in data]
            logger.info(f"Loaded {len(self._cache)} urban objects from {self.data_file_path}")
            
        except Exception as e:
            logger.error(f"Error loading data from {self.data_file_path}: {e}")
            self._cache = []
    
    def _parse_urban_object(self, data: dict) -> UrbanObject:
        """Parse urban object from JSON data"""
        # Parse versions
        versions = []
        for version_data in data.get('versions', []):
            # Parse coordinates
            coords_data = version_data.get('coordinates', {})
            coordinates = Coordinates(
                latitude=coords_data.get('latitude', 0.0),
                longitude=coords_data.get('longitude', 0.0)
            )
            
            # Parse media
            media = []
            for media_data in version_data.get('media', []):
                media.append(Media(
                    id=UUID(media_data['id']),
                    url=media_data['url'],
                    media_type=media_data['media_type'],
                    description=media_data.get('description'),
                    created_date=datetime.fromisoformat(media_data['created_date'].replace('Z', '+00:00'))
                ))
            
            # Parse changes
            changes = []
            for change_data in version_data.get('changes', []):
                changes.append(UrbanChange(
                    id=UUID(change_data['id']),
                    title=change_data['title'],
                    description=change_data['description'],
                    change_type=change_data['change_type'],
                    start_date=datetime.fromisoformat(change_data['start_date'].replace('Z', '+00:00')),
                    end_date=datetime.fromisoformat(change_data['end_date'].replace('Z', '+00:00')) if change_data.get('end_date') else None,
                    author=change_data['author'],
                    created_date=datetime.fromisoformat(change_data['created_date'].replace('Z', '+00:00'))
                ))
            
            # Create version
            version = UrbanObjectVersion(
                id=UUID(version_data['id']),
                version_number=version_data['version_number'],
                title=version_data['title'],
                description=version_data['description'],
                status=version_data['status'],
                ownership=version_data['ownership'],
                address=version_data['address'],
                coordinates=coordinates,
                media=media,
                changes=changes,
                created_date=datetime.fromisoformat(version_data['created_date'].replace('Z', '+00:00')),
                is_current=version_data.get('is_current', False)
            )
            versions.append(version)
        
        # Create urban object
        return UrbanObject(
            id=UUID(data['id']),
            name=data['name'],
            type=data['type'],
            code=data.get('code'),
            created_date=datetime.fromisoformat(data['created_date'].replace('Z', '+00:00')),
            last_modified=datetime.fromisoformat(data['last_modified'].replace('Z', '+00:00')),
            versions=versions
        )
