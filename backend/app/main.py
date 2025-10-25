# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import api_router
from app.core import firebase

app = FastAPI()

origins = ["*", "http://localhost", "http://localhost:3000", "https://clearpte.vercel.app",
           "https://clearpte-uuq9-6zpl2zmgw-reeteshs-projects-1e809ccb.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Welcome to the API"}