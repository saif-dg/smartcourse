from datetime import datetime, timezone

from flask import Blueprint, jsonify, request

from database.models import insert_history
from models.model_manager import get_recommendations

recommend_bp = Blueprint("recommend", __name__)


@recommend_bp.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "query is required"}), 400

    query = data["query"]
    model = data.get("model", "tfidf")
    top_k = data.get("top_k", 10)
    timestamp = datetime.now(timezone.utc).isoformat()

    result = get_recommendations(query, model, top_k)
    insert_history(query, model)

    return jsonify({**result, "query": query, "model": model, "timestamp": timestamp})
