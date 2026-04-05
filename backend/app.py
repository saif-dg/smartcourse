from flask import Flask
from flask_cors import CORS

from config import CORS_ORIGINS
from data.loader import load_courses
from database.db import init_db
from database.models import load_courses_to_db
from models.model_manager import initialize as init_models
from routes.history import history_bp
from routes.recommend import recommend_bp
from routes.save import save_bp

app = Flask(__name__)
CORS(app, origins=CORS_ORIGINS)

app.register_blueprint(recommend_bp)
app.register_blueprint(history_bp)
app.register_blueprint(save_bp)

with app.app_context():
    init_db()
    courses_df = load_courses()
    load_courses_to_db(courses_df.to_dict("records"))
    print("Initializing ML models...")
    init_models(courses_df)
    print("All models ready. Server starting.")

if __name__ == "__main__":
    app.run(debug=True, port=5001)
