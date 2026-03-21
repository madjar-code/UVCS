# UVCS - Urban Version Control System

This project is an experimental platform for tracking urban changes in cities. It serves as a **"GitHub for cities"** - storing urban objects, their versions, changes, and visual documentation. The system tracks construction, demolition, and renovation events with geolocation data, providing a complete history of urban development.

## Features
- Track urban objects (buildings, parks, bridges, towers, etc.) with geolocation
- Maintain version history for each urban object
- Record urban changes (construction, demolition, renovation)
- Interactive map visualization using Leaflet
- View complete change history for any urban object
- Store and display images of urban objects

## Technologies Used
- **Python 3.10+**: Backend programming language with strong typing and async support
- **FastAPI**: High-performance web framework for building APIs with automatic documentation
- **React.js + Vite**: Frontend with component-based UI and fast build tooling
- **Leaflet + React-Leaflet**: Interactive 2D maps for displaying urban objects with geolocation
- **Uvicorn**: ASGI server for running FastAPI applications
- **CSV files**: Current data storage solution (planned migration to PostgreSQL)

## Prerequisites
- **Python 3.10** or higher (PyEnv recommended)
- **Node.js 16+** and npm (for frontend)
- Basic understanding of Python, FastAPI, and React
- Git for version control

## Setup and Usage

### 1. Clone the Repository
```bash
git clone <repository-url>
cd UVCS
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 4. Run the Project

**Backend:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Services
- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **FastAPI Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **API Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Project Structure

### Key Concepts
- **Urban Object (UO)**: A city object registered in the system (buildings, parks, bridges, towers, etc.)
- **Urban Change (UC)**: An event that creates, destroys, or significantly modifies an urban object
- **History of Changes (HoC)**: A chronological sequence of changes associated with an urban object
- **Urban Object Version (UOV)**: A snapshot of an urban object after a specific change

### Architecture
The project follows **Clean Architecture** principles with:
- **API Layer**: FastAPI endpoints and request/response handling
- **Service Layer**: Business logic with Unit of Work pattern
- **Repository Layer**: Data access abstraction
- **Domain Layer**: Core business entities and rules

## Future Development
This project is currently on pause but can be extended with:
- Forms for editing tables and managing data
- Mobile version for field data collection
- Production deployment
- User authentication and role-based access control
- Migration from CSV to PostgreSQL database
- S3 integration for media storage

## Notes
- The project uses CSV files for data storage as a starting point
- Comprehensive architecture documentation is available in the `architecture/` directory
- The codebase follows strict type hints and code style guidelines
- Designed specifically for Chisinau but can be adapted for other cities

## Project Metadata
- **Project Date**: October 25, 2025
- **Status**: Completed (on pause, ready for continuation)
- **Scope**: Urban Planning and Development Tracking

## References
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Leaflet Documentation](https://leafletjs.com/)
- [React-Leaflet Documentation](https://react-leaflet.js.org/)