"""FastAPI application main entry point"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers.uo_router import router as urban_objects_router
from app.settings import settings

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

# Create FastAPI application
app = FastAPI(
    title="Urban Objects API",
    description="API for managing urban objects and their versions",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Static files (serve like Django)
app.mount("/media", StaticFiles(directory=str(settings.media_dir)), name="media")
app.mount("/images", StaticFiles(directory=str(settings.media_images_dir)), name="images")


# Include routers
app.include_router(urban_objects_router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Urban Objects API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    validation = settings.validate_data_files()
    return {
        "status": "healthy" if validation["all_files_exist"] else "degraded",
        "data_files": validation,
        "settings": {
            "data_dir": str(settings.data_dir),
            "api_host": settings.api_host,
            "api_port": settings.api_port
        }
    }


if __name__ == "__main__":
    import uvicorn

    logger.info(f"Starting Urban Objects API server with settings: {settings}")
    logger.info(f"Data files validation: {settings.validate_data_files()}")

    uvicorn.run(
        "main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.api_reload,
        log_level=settings.log_level.lower()
    )
