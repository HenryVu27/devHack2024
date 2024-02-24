from fastapi import FastAPI
from graph import Graph

app = FastAPI()
graph = Graph()

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
    return graph.navigation(data.lat1, data.lon1, data.lat2, data.lon2)
