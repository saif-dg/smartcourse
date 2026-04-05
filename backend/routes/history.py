from flask import Blueprint, jsonify

from database.models import get_history

history_bp = Blueprint("history", __name__)


@history_bp.route("/api/history", methods=["GET"])
def history():
    return jsonify({"history": get_history()})
