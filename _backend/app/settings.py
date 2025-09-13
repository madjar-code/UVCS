"""Application settings and configuration"""

import os
from pathlib import Path
from typing import Optional


class Settings:
    """Application settings"""

    def __init__(self):
        # Base paths
        self.app_dir = Path(__file__).parent
        self.project_dir = self.app_dir.parent

        # Data configuration
        self.data_dir = self._get_data_dir()
        self.urban_objects_file = self.data_dir / "urban_objects.csv"
        self.urban_object_versions_file = self.data_dir / "urban_object_versions.csv"
        self.version_media_file = self.data_dir / "version_media.csv"

        # Media configuration
        self.media_dir = self.project_dir / "media"
        self.media_images_dir = self.media_dir / "images"
        self._ensure_media_dirs()

        # API configuration
        self.api_host = os.getenv("API_HOST", "127.0.0.1")
        self.api_port = int(os.getenv("API_PORT", "8000"))
        self.api_reload = os.getenv("API_RELOAD", "true").lower() == "true"

        # Logging configuration
        self.log_level = os.getenv("LOG_LEVEL", "INFO")

    def _get_data_dir(self) -> Path:
        """Get data directory path with environment variable override"""
        data_dir_env = os.getenv("DATA_DIR")
        if data_dir_env:
            return Path(data_dir_env)

        # Default: project/_backend/data/
        return self.project_dir / "data"

    def _ensure_media_dirs(self) -> None:
        """Ensure media directories exist"""
        try:
            self.media_images_dir.mkdir(parents=True, exist_ok=True)
        except Exception:
            pass

    @property
    def base_url(self) -> str:
        """Base URL for building absolute links"""
        return os.getenv("BASE_URL", f"http://{self.api_host}:{self.api_port}")

    def validate_data_files(self) -> dict:
        """Validate that all required data files exist"""
        validation_result = {
            "data_dir_exists": self.data_dir.exists(),
            "urban_objects_file_exists": self.urban_objects_file.exists(),
            "urban_object_versions_file_exists": self.urban_object_versions_file.exists(),
            "version_media_file_exists": self.version_media_file.exists(),
        }

        validation_result["all_files_exist"] = all(validation_result.values())
        return validation_result

    def get_data_path(self) -> str:
        """Get data directory path as string"""
        return str(self.data_dir)

    def __repr__(self):
        return f"Settings(data_dir='{self.data_dir}', api_host='{self.api_host}', api_port={self.api_port})"


# Global settings instance
settings = Settings()
