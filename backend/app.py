from flask import Flask
from flask_cors import CORS

from config import CORS_ORIGINS
from data.mock_courses import MOCK_COURSES
from database.db import init_db
from database.models import load_courses_to_db
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
    load_courses_to_db(MOCK_COURSES)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
