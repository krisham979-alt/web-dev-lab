"""
SQLite connection and SQLAlchemy session setup.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite file in project folder (created automatically on first run)
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# check_same_thread=False is required for SQLite with FastAPI (multiple threads)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all ORM models
Base = declarative_base()


def get_db():
    """Yield a database session per request; closes when the request ends."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
