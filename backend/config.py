import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, "smartcourse.db")
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")
CORS_ORIGINS = ["http://localhost:5173", "http://localhost:5174"]
