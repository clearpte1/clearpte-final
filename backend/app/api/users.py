
# app/api/auth_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.database.models import User

router = APIRouter()

@router.get("")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
