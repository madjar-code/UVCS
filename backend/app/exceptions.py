"""Custom exceptions for the UVCS API"""


class UVCSException(Exception):
    """Base exception for UVCS API"""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class UrbanObjectNotFound(UVCSException):
    """Exception raised when urban object is not found"""
    def __init__(self, object_id: str):
        message = f"Urban object with ID {object_id} not found"
        super().__init__(message, status_code=404)


class InvalidQueryParameters(UVCSException):
    """Exception raised when query parameters are invalid"""
    def __init__(self, message: str):
        super().__init__(message, status_code=400)


class DataLoadError(UVCSException):
    """Exception raised when data loading fails"""
    def __init__(self, message: str):
        super().__init__(message, status_code=500)
