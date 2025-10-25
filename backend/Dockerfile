# Use lightweight Python base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose port (optional, for documentation purposes)
EXPOSE 8080

# Run FastAPI on Cloud Run using dynamic PORT
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]

# # Use lightweight Python base
# FROM python:3.11-slim

# # Set working directory
# WORKDIR /app

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libpq-dev \
#     && rm -rf /var/lib/apt/lists/*

# # Install Python deps
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy app code
# COPY . .

# # Expose FastAPI default port
# EXPOSE 8080

# # Run FastAPI on Cloud Run
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]


# FROM python:3.11-slim

# WORKDIR /app
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# COPY . .

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]


# # FROM python:3.11-slim
# # WORKDIR /app



# # # install system deps (if any) and python deps
# # COPY requirements.txt ./
# # RUN pip install --no-cache-dir -r requirements.txt


# # # copy app
# # COPY app ./app


# # EXPOSE 8080
# # CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]