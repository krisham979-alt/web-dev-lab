from fastapi import FastAPI

from database import Base, engine
import models  # noqa: F401 — register models with Base before create_all
from routes import auth, todo

app = FastAPI(title="Todo API", version="1.0.0")


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


app.include_router(auth.router)
app.include_router(todo.router)


@app.get("/")
def root():
    return {"message": "Todo API — see /docs for Swagger UI"}
