import json
import os

from flask import Blueprint, jsonify, request

from config import ARTIFACTS_DIR
from evaluation.evaluator import run_evaluation
from models.model_manager import _tfidf, _neural

evaluate_bp = Blueprint("evaluate", __name__)

RESULTS_PATH = os.path.join(ARTIFACTS_DIR, "evaluation_results.json")


@evaluate_bp.route("/api/evaluate", methods=["POST"])
def evaluate():
    k = request.get_json().get("k", 10) if request.get_json() else 10
    report = run_evaluation(_tfidf, _neural, k=k)
    return jsonify(report)


@evaluate_bp.route("/api/evaluate", methods=["GET"])
def get_evaluation():
    if os.path.exists(RESULTS_PATH):
        with open(RESULTS_PATH) as f:
            return jsonify(json.load(f))
    return jsonify({"error": "No evaluation results found. Run POST /api/evaluate first."}), 404
