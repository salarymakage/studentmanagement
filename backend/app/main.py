from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import Request
import os

from .database import engine
from . import models
from .api.endpoints import students

# Create tables in the database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Management API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the student router
app.include_router(students.router, prefix="/api/students", tags=["students"])

# Mount the static directory
app.mount("/static", StaticFiles(directory="../frontend/static"), name="static")

# Templates
templates = Jinja2Templates(directory="../frontend/templates")

# Root route to serve the frontend
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
