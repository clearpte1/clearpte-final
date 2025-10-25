from pydantic import BaseModel
from pydantic import BaseModel
from typing import Optional


class ScoreResponse(BaseModel):
  score: float
  similarity: float
  transcript: str
  feedback: str

class AuthBody(BaseModel):
    token: str

class EvaluationScore(BaseModel):
    content: float
    fluency: float
    pronunciation: float

class MaxScores(BaseModel):
    content: int
    fluency: int
    pronunciation: int

class EvaluationResult(BaseModel):
    transcribed_text: str
    evaluation: EvaluationScore


class UserInput(BaseModel):
    id: Optional[int]
    email: str
    full_name: Optional[str]
    role: Optional[str]

class LoginDetails(BaseModel):
    email: str
    password: str

class RegisterDetails(BaseModel):
    email: str
    password: str
    full_name: Optional[str]