# backend/app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import httpx

# Initialize the FastAPI app
app = FastAPI()

# Allow CORS for frontend
origins = [
    "http://localhost:3000",  # Frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Convex endpoint
CONVEX_URL = "http://localhost:8080"

# Models
class UpdateStateRequest(BaseModel):
    state_name: str
    content: str
    author_id: str
    created_at: datetime

@app.get("/state/{state_name}")
async def get_state_details(state_name: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{CONVEX_URL}/functions/getStateDetails", params={"arg": state_name})
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.post("/state/update")
async def update_state(request: UpdateStateRequest):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{CONVEX_URL}/functions/updateState",
            json={
                "stateName": request.state_name,
                "content": request.content,
                "authorId": request.author_id,
                "createdAt": request.created_at.timestamp(),
            },
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.get("/health")
async def health_check():
    """Return the health status of the system."""
    return {
        "API": "Healthy",
        "Active_State": "Running",  # You can make this dynamic based on your state system
        "Last_Updated": datetime.now().isoformat()
    }