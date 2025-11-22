
# app/api/auth_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.database.models import User, UserProfile

router = APIRouter()

# @router.get("")
# def get_users(db: Session = Depends(get_db)):
#     return db.query(User).all()

@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/profile/{user_id}")
def upsert_profile(
    user_id: int,
    target_score: int = 0,
    test_date: str = None,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()

    if profile:
        profile.target_score = target_score
        profile.test_date = test_date
    else:
        # Create new profile
        profile = UserProfile(
            user_id=user_id,
            target_score=target_score,
            test_date=test_date
        )
        db.add(profile)

    db.commit()
    db.refresh(profile)
    return profile
