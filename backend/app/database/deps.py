# app/database/deps.py

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

# Neon connection string (from .env or hardcoded fallback)
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://neondb_owner:npg_rDCjE2RdZit8@ep-steep-mud-ad7mdbzx-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
)

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=2,
    future=True,
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# # app/database/deps.py

# import os
# from dotenv import load_dotenv
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from google.cloud.alloydbconnector import Connector, IPTypes

# load_dotenv()

# # Env vars
# USE_CONNECTOR = os.getenv("USE_CONNECTOR", "false").lower() == "true"
# INSTANCE_URI = os.getenv("ALLOYDB_INSTANCE_URI",
#     "projects/clear-pte-ff08c/locations/us-east1/clusters/clearpte/instances/clearpte-primary"
# )
# DB_USER = os.getenv("DB_USER", "postgres")
# DB_PASS = os.getenv("DB_PASSWORD", "")
# DB_NAME = os.getenv("DB_NAME", "postgres")
# DB_HOST = os.getenv("DB_HOST", "35.237.95.55")  # Public IP for local
# DB_PORT = os.getenv("DB_PORT", "5432")

# if USE_CONNECTOR:
#     # Cloud Run / GCP
#     connector = Connector()

#     def getconn():
#         return connector.connect(
#             INSTANCE_URI,
#             "pg8000",
#             user=DB_USER,
#             password=DB_PASS,
#             db=DB_NAME,
#             ip_type=IPTypes.PRIVATE,  # private IP inside VPC
#         )

#     engine = create_engine(
#         "postgresql+pg8000://",
#         creator=getconn,
#         pool_size=5,
#         max_overflow=2,
#         pool_pre_ping=True,
#         future=True,
#     )
# else:
#     # Localhost / public IP
#     DATABASE_URL = os.getenv(
#         "DATABASE_URL",
#         f"postgresql+psycopg2://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
#     )
#     engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()





# # app/database/deps.py

# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from os import getenv
# from dotenv import load_dotenv

# load_dotenv()

# DATABASE_URL = getenv("DATABASE_URL", "postgresql+psycopg2://postgres:Clearpte%40123@34.93.221.119:5432/postgres")

# engine = create_engine(DATABASE_URL, pool_pre_ping=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
