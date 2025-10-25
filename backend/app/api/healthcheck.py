# app/api/healthcheck.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database.deps import get_db

router = APIRouter()

@router.get("")
def health_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        # table_exists = db.execute(text("SELECT to_regclass('public.users');")).scalar()

        return {
            "db_connection": "ok" if result == 1 else "failed",
            # "users_table": "exists" if table_exists else "missing"
        }
    except Exception as e:
        return {"db_connection": "failed", "error": str(e)}
    
# @router.get("")
# def health_check():
#     return {"status": "ok"}
