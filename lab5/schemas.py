"""
Pydantic schemas for request/response validation (not the same as DB models).
"""
from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., min_length=6, description="At least 6 characters")


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class RegisterResponse(BaseModel):
    message: str
    user_id: int


class TokenResponse(BaseModel):
    """Returned after successful login (simple JWT)."""
    message: str
    access_token: str
    token_type: str = "bearer"
