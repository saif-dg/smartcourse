from flask import Blueprint, jsonify, request

from database.models import delete_saved, get_saved, save_recommendation

save_bp = Blueprint("save", __name__)


@save_bp.route("/api/save", methods=["POST"])
def save():
    data = request.get_json()
    if not data or "course_id" not in data:
        return jsonify({"error": "course_id is required"}), 400

    saved_id = save_recommendation(data["course_id"])
    return jsonify({"status": "saved", "id": saved_id})


@save_bp.route("/api/saved", methods=["GET"])
def saved():
    return jsonify({"saved": get_saved()})


@save_bp.route("/api/saved/<int:save_id>", methods=["DELETE"])
def remove_saved(save_id):
    delete_saved(save_id)
    return jsonify({"status": "deleted"})
