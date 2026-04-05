import random
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request

from data.mock_courses import MOCK_COURSES
from database.models import insert_history

recommend_bp = Blueprint("recommend", __name__)


def mock_recommend(query, top_k=10):
    """Simple keyword matching + random scores for mock results."""
    query_words = set(query.lower().split())
    scored = []
    for course in MOCK_COURSES:
        text = f"{course['course_title']} {course['description']} {course['department']}".lower()
        matches = sum(1 for w in query_words if w in text)
        base_score = min(matches * 15, 60)
        score = base_score + random.uniform(20, 40) if matches > 0 else random.uniform(30, 60)
        score = min(round(score, 1), 99.9)
        scored.append({**course, "relevance_score": score})
    scored.sort(key=lambda x: x["relevance_score"], reverse=True)
    return scored[:top_k]


@recommend_bp.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "query is required"}), 400

    query = data["query"]
    model = data.get("model", "tfidf")
    top_k = data.get("top_k", 10)
    timestamp = datetime.now(timezone.utc).isoformat()

    if model == "both":
        tfidf_results = mock_recommend(query, top_k)
        neural_results = mock_recommend(query, top_k)
        insert_history(query, model)
        return jsonify({
            "query": query,
            "model": model,
            "results": [],
            "tfidf_results": tfidf_results,
            "neural_results": neural_results,
            "timestamp": timestamp,
        })

    results = mock_recommend(query, top_k)
    insert_history(query, model)
    return jsonify({
        "query": query,
        "model": model,
        "results": results,
        "timestamp": timestamp,
    })
