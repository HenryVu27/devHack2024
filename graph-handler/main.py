from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from graph import Graph

app = FastAPI()
graph = Graph()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Coordinates(BaseModel):
    lat1: float
    lon1: float
    lat2: float
    lon2: float


@app.get("/test")
def read_root():
    return {"Hello": "World"}


@app.post("/navigate")
def navigate(data: Coordinates):
    return graph.navigation(data.lon1, data.lat1, data.lon2, data.lat2)
