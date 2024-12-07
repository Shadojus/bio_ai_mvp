from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI app
app = FastAPI()

# Allow CORS for frontend and other origins
origins = [
    "http://localhost:3000",  # Adjust this if your frontend runs on a different port
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample route
@app.get("/")
async def root():
    return {"message": "Welcome to the BioAi MVP API"}

# Example endpoint for fetching state details
@app.get("/state/{state_name}")
async def get_state_details(state_name: str):
    # Replace this with actual logic to fetch state details
    return {"state_name": state_name, "details": f"Details for {state_name}"}

# Example POST endpoint
@app.post("/submit/")
async def submit_data(payload: dict):
    return {"status": "success", "data": payload}

# Debugging endpoint for health check
@app.get("/health")
async def health_check():
    return {"status": "OK"}
