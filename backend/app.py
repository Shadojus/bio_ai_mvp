# File path: your-project-folder/backend/app.py

"""
Backend entry point using FastAPI to manage state-driven operations.
"""

from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create FastAPI app instance
app = FastAPI()

# Simulated database for MVP (will replace with Convex DB)
states_db = {
    "Deep Blue": {"purpose": "High focus tasks", "active": False},
    "Green": {"purpose": "Recovery and health", "active": False},
    "Purple": {"purpose": "Learning and creativity", "active": False},
    "Orange": {"purpose": "Collaboration and communication", "active": False},
    "Gray": {"purpose": "Maintenance", "active": False},
    "Red": {"purpose": "Emergency response", "active": False}
}

# Pydantic model for state updates
class StateUpdate(BaseModel):
    state: str
    active: bool

@app.get("/")
def read_root():
    """
    Root endpoint to verify API is running.
    """
    return {"message": "Welcome to the Bio-AI Backend API"}

@app.get("/states")
def get_states():
    """
    Fetch all operational states and their statuses.
    """
    return states_db

@app.put("/states")
def update_state(state_update: StateUpdate):
    """
    Update the activation status of a specific state.
    """
    state = state_update.state
    if state not in states_db:
        return {"error": "State not found"}
    states_db[state]["active"] = state_update.active
    return {state: states_db[state]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
