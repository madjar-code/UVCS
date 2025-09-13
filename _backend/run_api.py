"""Script to run the FastAPI application"""

import uvicorn
import logging
from app.settings import settings

if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(
        level=getattr(logging, settings.log_level.upper()),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    logger = logging.getLogger(__name__)
    logger.info(f"Starting Urban Objects API server with settings: {settings}")
    logger.info(f"Data files validation: {settings.validate_data_files()}")

    # Run the FastAPI application
    uvicorn.run(
        "main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.api_reload,
        log_level=settings.log_level.lower()
    )
