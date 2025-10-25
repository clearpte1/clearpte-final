# app/api/auth_routes.py

import os
import hashlib
import binascii
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from firebase_admin import auth
from jose import jwt
from os import getenv

from app.database.deps import get_db
from app.schemas import AuthBody, LoginDetails, RegisterDetails
from app.database.models import User

router = APIRouter()

# --- PBKDF2 helpers ---
def get_salt():
    return os.urandom(16)

def hash_password(password: str, salt: bytes = None) -> str:
    if salt is None:
        salt = get_salt()
    dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return binascii.hexlify(salt + dk).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    hashed_bytes = binascii.unhexlify(hashed)
    salt = hashed_bytes[:16]
    stored_hash = hashed_bytes[16:]
    new_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return new_hash == stored_hash

# --- Environment config ---
SECRET_KEY = getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# --- Register route ---
@router.post("/register")
def register(body: RegisterDetails, db: Session = Depends(get_db)):
    email = body.email.strip()
    password = str(body.password).strip()
    full_name = body.full_name.strip()

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already registered")

    hashed_password = hash_password(password)

    user = User(
        email=email,
        password_hash=hashed_password,
        full_name=full_name,
        role="student"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "status": "registered",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role
        }
    }

# --- Login route ---
@router.post("/login")
def login(body: LoginDetails, db: Session = Depends(get_db)):
    email = body.email.strip()
    password = body.password.strip()

    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "user_id": user.id, "role": user.role},
        expires_delta=access_token_expires
    )

    return {
        "status": "logged_in",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role
        }
    }

# --- Token creation helper ---
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
