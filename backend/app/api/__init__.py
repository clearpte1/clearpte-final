# app/api/__init__.py

from fastapi import APIRouter
from app.api import healthcheck, openai_routes, auth_routes, evaluation_routes, uploadquestions, questions

api_router = APIRouter()

api_router.include_router(healthcheck.router, prefix="/health", tags=["Healthcheck"])
api_router.include_router(openai_routes.router, prefix="/api", tags=["Audio Comparison"])
api_router.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
api_router.include_router(evaluation_routes.router, prefix="/api", tags=["Evaluation"])
api_router.include_router(uploadquestions.router, prefix="/api", tags=["Upload Questions"])
api_router.include_router(questions.router, prefix="/api/questions", tags=["Questions"])
