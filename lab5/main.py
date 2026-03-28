"""
FastAPI entry point: creates tables and mounts routes.
"""
from fastapi import FastAPI

from database import Base, engine
import models  # noqa: F401 — registers User with Base.metadata
from routes.auth import router as auth_router

# Simple migration: create missing tables (no Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Lab Auth API",
    description="Register and login with SQLite + JWT",
    version="1.0.0",
)

app.include_router(auth_router)


@app.get("/")
def root():
    """Quick pointer to the main endpoints."""
    return {
        "message": "Lab auth API",
        "endpoints": {
            "register": "POST /register",
            "login": "POST /login",
            "docs": "GET /docs",
        },
    }


@app.get("/health")
def health():
    return {"status": "ok"}
