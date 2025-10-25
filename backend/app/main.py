# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import api_router
from app.core import firebase

app = FastAPI()

origins = [
    "https://clearpte.vercel.app",  # frontend
    "https://clearpte-uuq9-6zpl2zmgw-reeteshs-projects-1e809ccb.vercel.app",  # backend
    "http://localhost:3000",  # local React dev
    "http://localhost"        # fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # only these origins allowed
    allow_credentials=True,       # allow cookies / auth headers if needed
    allow_methods=["*"],          # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],          # allow all headers
)

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Welcome to the API"}
