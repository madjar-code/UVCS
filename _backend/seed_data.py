"""
Script to generate synthetic test data for UVCS
Creates 3 urban objects with multiple versions, changes, and images
"""

import csv
import os
from datetime import datetime, timedelta
from pathlib import Path

# Paths
DATA_DIR = Path(__file__).parent / "data"
MEDIA_DIR = Path(__file__).parent / "media" / "images"

# Ensure directories exist
DATA_DIR.mkdir(parents=True, exist_ok=True)
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

# Sample data
URBAN_OBJECTS = [
    {
        "id": 1,
        "name": "Central Park",
        "type": "park",
        "created_date": "2020-01-15T10:00:00",
        "last_modified": "2024-03-20T14:30:00"
    },
    {
        "id": 2,
        "name": "City Library",
        "type": "library",
        "created_date": "2018-05-10T09:00:00",
        "last_modified": "2024-02-15T16:45:00"
    },
    {
        "id": 3,
        "name": "Shopping Mall Plaza",
        "type": "shopping_center",
        "created_date": "2019-08-20T11:30:00",
        "last_modified": "2024-01-10T12:20:00"
    }
]

VERSIONS = [
    # Central Park - 3 versions
    {"id": 1, "urban_object_id": 1, "version": 1, "title": "Central Park - Initial Construction", 
     "description": "The park was initially built with basic infrastructure including walking paths, benches, and green spaces.", 
     "status": "completed", "ownership": "municipal", "address": "Park Street 1", 
     "latitude": 47.0266, "longitude": 28.8309, "created_date": "2020-01-15T10:00:00", 
     "start_date": "2020-01-15T10:00:00", "end_date": "2022-06-01T00:00:00", "is_current": "false"},
    
    {"id": 2, "urban_object_id": 1, "version": 2, "title": "Central Park - Renovation Phase", 
     "description": "Major renovation including new playground, fountain installation, and improved lighting system.", 
     "status": "under_construction", "ownership": "municipal", "address": "Park Street 1", 
     "latitude": 47.0266, "longitude": 28.8309, "created_date": "2022-06-01T09:00:00", 
     "start_date": "2022-06-01T09:00:00", "end_date": "2023-12-15T00:00:00", "is_current": "false"},
    
    {"id": 3, "urban_object_id": 1, "version": 3, "title": "Central Park - Modern Recreation Area", 
     "description": "Fully renovated park with modern amenities, sports facilities, and eco-friendly features.", 
     "status": "active", "ownership": "municipal", "address": "Park Street 1", 
     "latitude": 47.0266, "longitude": 28.8309, "created_date": "2023-12-15T10:00:00", 
     "start_date": "2023-12-15T10:00:00", "end_date": "", "is_current": "true"},
    
    # City Library - 2 versions
    {"id": 4, "urban_object_id": 2, "version": 1, "title": "City Library - Original Building", 
     "description": "Historic library building with traditional reading rooms and book collections.", 
     "status": "active", "ownership": "governmental", "address": "Lenin Avenue 45", 
     "latitude": 47.0229, "longitude": 28.8569, "created_date": "2018-05-10T09:00:00", 
     "start_date": "2018-05-10T09:00:00", "end_date": "2023-09-01T00:00:00", "is_current": "false"},
    
    {"id": 5, "urban_object_id": 2, "version": 2, "title": "City Library - Digital Hub", 
     "description": "Modernized library with digital resources, co-working spaces, and multimedia center.", 
     "status": "active", "ownership": "governmental", "address": "Lenin Avenue 45", 
     "latitude": 47.0229, "longitude": 28.8569, "created_date": "2023-09-01T10:00:00", 
     "start_date": "2023-09-01T10:00:00", "end_date": "", "is_current": "true"},
    
    # Shopping Mall - 2 versions
    {"id": 6, "urban_object_id": 3, "version": 1, "title": "Shopping Mall Plaza - Grand Opening", 
     "description": "Modern shopping center with retail stores, food court, and entertainment facilities.", 
     "status": "active", "ownership": "private", "address": "Stefan cel Mare 100", 
     "latitude": 47.0245, "longitude": 28.8322, "created_date": "2019-08-20T11:30:00", 
     "start_date": "2019-08-20T11:30:00", "end_date": "2024-01-10T00:00:00", "is_current": "false"},
    
    {"id": 7, "urban_object_id": 3, "version": 2, "title": "Shopping Mall Plaza - Expansion", 
     "description": "Expanded mall with new wing, cinema complex, and rooftop terrace.", 
     "status": "active", "ownership": "private", "address": "Stefan cel Mare 100", 
     "latitude": 47.0245, "longitude": 28.8322, "created_date": "2024-01-10T12:20:00", 
     "start_date": "2024-01-10T12:20:00", "end_date": "", "is_current": "true"},
]

CHANGES = [
    # Central Park changes
    {"id": 1, "urban_object_id": 1, "title": "Park Construction", "description": "Initial construction of the park", 
     "change_type": "creation", "author": "City Planning Department", "status": "completed", 
     "created_date": "2020-01-15T10:00:00", "start_date": "2020-01-15T10:00:00", "end_date": "2020-06-30T00:00:00"},
    
    {"id": 2, "urban_object_id": 1, "title": "Renovation Project", "description": "Major renovation and modernization", 
     "change_type": "modification", "author": "Urban Development Agency", "status": "completed", 
     "created_date": "2022-06-01T09:00:00", "start_date": "2022-06-01T09:00:00", "end_date": "2023-12-15T00:00:00"},
    
    # Library changes
    {"id": 3, "urban_object_id": 2, "title": "Library Opening", "description": "Official opening of the library", 
     "change_type": "creation", "author": "Ministry of Culture", "status": "completed", 
     "created_date": "2018-05-10T09:00:00", "start_date": "2018-05-10T09:00:00", "end_date": "2018-05-10T00:00:00"},
    
    {"id": 4, "urban_object_id": 2, "title": "Digital Transformation", "description": "Modernization with digital technologies", 
     "change_type": "modification", "author": "Ministry of Culture", "status": "completed", 
     "created_date": "2023-09-01T10:00:00", "start_date": "2023-09-01T10:00:00", "end_date": "2023-12-01T00:00:00"},
    
    # Mall changes
    {"id": 5, "urban_object_id": 3, "title": "Mall Construction", "description": "Construction of shopping center", 
     "change_type": "creation", "author": "Plaza Development LLC", "status": "completed", 
     "created_date": "2019-08-20T11:30:00", "start_date": "2019-08-20T11:30:00", "end_date": "2019-12-20T00:00:00"},
    
    {"id": 6, "urban_object_id": 3, "title": "Mall Expansion", "description": "Addition of new wing and facilities", 
     "change_type": "modification", "author": "Plaza Development LLC", "status": "completed", 
     "created_date": "2024-01-10T12:20:00", "start_date": "2024-01-10T12:20:00", "end_date": "2024-03-10T00:00:00"},
]

# Generate 2-3 images per version
VERSION_MEDIA = []
media_id = 1
for version in VERSIONS:
    num_images = 2 if version["version"] == 1 else 3
    for i in range(num_images):
        VERSION_MEDIA.append({
            "id": media_id,
            "version_id": version["id"],
            "source": f"/media/images/object_{version['urban_object_id']}_v{version['version']}_img{i+1}.jpg",
            "title": f"Image {i+1}",
            "description": f"Photo {i+1} of version {version['version']}",
            "media_type": "image",
            "created_date": version["created_date"]
        })
        media_id += 1

def write_csv(filename, data, fieldnames):
    """Write data to CSV file"""
    filepath = DATA_DIR / filename
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    print(f"✅ Created {filepath}")

# Write all CSV files
print("🚀 Generating synthetic data...")
print()

write_csv("urban_objects.csv", URBAN_OBJECTS, 
          ["id", "name", "type", "created_date", "last_modified"])

write_csv("urban_object_versions.csv", VERSIONS,
          ["id", "urban_object_id", "version", "title", "description", "status", "ownership", 
           "address", "latitude", "longitude", "created_date", "start_date", "end_date", "is_current"])

write_csv("urban_changes.csv", CHANGES,
          ["id", "urban_object_id", "title", "description", "change_type", "author", 
           "status", "created_date", "start_date", "end_date"])

write_csv("version_media.csv", VERSION_MEDIA,
          ["id", "version_id", "source", "title", "description", "media_type", "created_date"])

print()
print("✅ All data generated successfully!")
print()
print(f"📊 Summary:")
print(f"   - {len(URBAN_OBJECTS)} urban objects")
print(f"   - {len(VERSIONS)} versions")
print(f"   - {len(CHANGES)} changes")
print(f"   - {len(VERSION_MEDIA)} media files")
print()
print("⚠️  Note: You need to add actual image files to _backend/media/images/")
print("   Expected image names:")
for media in VERSION_MEDIA:
    print(f"   - {os.path.basename(media['source'])}")

