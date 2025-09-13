"""CSV-based repository for urban objects"""

import csv
import os
from datetime import datetime
from typing import List, Optional
from uuid import UUID

from ..domain.models import (
    UrbanObject,
    UrbanObjectVersion,
    Media,
    Coordinates
)
from .abstract import AbstractUrbanObjectRepository


class CSVUrbanObjectRepository(AbstractUrbanObjectRepository):
    """CSV implementation of urban object repository"""

    def __init__(self, data_path: str):
        """Initialize repository with path to data directory"""
        self.data_path = data_path

        self.urban_objects_file = os.path.join(self.data_path, 'urban_objects.csv')
        self.versions_file = os.path.join(self.data_path, 'urban_object_versions.csv')
        self.media_file = os.path.join(self.data_path, 'version_media.csv')

    def _parse_datetime(self, date_str: str) -> datetime:
        """Parse datetime string from CSV"""
        return datetime.fromisoformat(date_str)

    def _load_media_for_version(self, version_id: UUID) -> List[Media]:
        """Load media for specific version"""
        media_list = []

        if not os.path.exists(self.media_file):
            return media_list

        with open(self.media_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if UUID(row['version_id']) == version_id:
                    media = Media(
                        id=UUID(row['id']),
                        source=row['source'],
                        title=row['title'] if row['title'] else None,
                        description=row['description'] if row['description'] else None,
                        created_date=self._parse_datetime(row['created_date'])
                    )
                    media_list.append(media)

        return media_list

    def _load_current_version_for_object(self, urban_object_id: UUID) -> Optional[UrbanObjectVersion]:
        """Load only the current version for specific urban object"""

        if not os.path.exists(self.versions_file):
            return None

        with open(self.versions_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if (UUID(row['urban_object_id']) == urban_object_id and
                    row['is_current'].lower() == 'true'):

                    version_id = UUID(row['id'])

                    # Load media only for current version
                    media = self._load_media_for_version(version_id)

                    # Create coordinates
                    coordinates = Coordinates(
                        latitude=float(row['latitude']),
                        longitude=float(row['longitude'])
                    )

                    # Create and return current version
                    return UrbanObjectVersion(
                        id=version_id,
                        version=int(row['version']),
                        title=row['title'],
                        description=row['description'],
                        status=row['status'],
                        ownership=row['ownership'],
                        address=row['address'],
                        coordinates=coordinates,
                        media=media,
                        created_date=self._parse_datetime(row['created_date']),
                        start_date=self._parse_datetime(row['start_date']),
                        end_date=self._parse_datetime(row['end_date']) if row['end_date'] else None,
                        is_current=True
                    )

        return None

    def _count_versions_for_object(self, urban_object_id: UUID) -> int:
        """Count all versions related to a specific urban object"""
        if not os.path.exists(self.versions_file):
            return 0
        count = 0
        with open(self.versions_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    if UUID(row['urban_object_id']) == urban_object_id:
                        count += 1
                except Exception:
                    continue
        return count


    async def get_all(self) -> List[UrbanObject]:
        """Get all urban objects with only current version data and metadata"""
        urban_objects = []

        if not os.path.exists(self.urban_objects_file):
            return urban_objects

        with open(self.urban_objects_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                urban_object_id = UUID(row['id'])

                # Load only current version for this object
                current_version = self._load_current_version_for_object(urban_object_id)


                # Create versions list with only current version
                versions = [current_version] if current_version else []

                # Count all versions for this object
                version_count = self._count_versions_for_object(urban_object_id)

                # Create urban object with metadata and current version only
                urban_object = UrbanObject(
                    id=urban_object_id,
                    name=row['name'],
                    type=row['type'],
                    created_date=self._parse_datetime(row['created_date']),
                    last_modified=self._parse_datetime(row['last_modified']),
                    versions=versions,
                    changes=[],  # Empty changes list as requested
                    version_count=version_count
                )

                urban_objects.append(urban_object)

        return urban_objects
