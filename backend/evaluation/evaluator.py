"""
Evaluation module for SmartCourse recommendation models.

Computes precision@k, recall@k, and hit-rate using curated test queries
with known relevant courses.
"""

import json
import os
from datetime import datetime, timezone

import numpy as np

from evaluation.test_queries import TEST_QUERIES


def _titles_match(title_a: str, title_b: str) -> bool:
    return title_a.strip().lower() == title_b.strip().lower()


def _is_relevant(course: dict, relevant_titles: list[str], relevant_keywords: list[str]) -> bool:
    title = course.get("course_title", "").lower()
    desc = course.get("description", "").lower()
    dept = course.get("department", "").lower()

    for rt in relevant_titles:
        if _titles_match(rt, course.get("course_title", "")):
            return True

    combined = f"{title} {desc} {dept}"
    matched = sum(1 for kw in relevant_keywords if kw.lower() in combined)
    return matched >= 2


def precision_at_k(recommended: list[dict], relevant_titles: list[str],
                   relevant_keywords: list[str], k: int) -> float:
    top_k = recommended[:k]
    if not top_k:
        return 0.0
    relevant_count = sum(
        1 for c in top_k if _is_relevant(c, relevant_titles, relevant_keywords)
    )
    return relevant_count / k


def recall_at_k(recommended: list[dict], relevant_titles: list[str],
                relevant_keywords: list[str], k: int) -> float:
    top_k = recommended[:k]
    total_relevant = max(len(relevant_titles), 1)
    found = sum(
        1 for c in top_k if _is_relevant(c, relevant_titles, relevant_keywords)
    )
    return found / total_relevant


def hit_rate(recommended: list[dict], relevant_titles: list[str],
             relevant_keywords: list[str]) -> float:
    for c in recommended:
        if _is_relevant(c, relevant_titles, relevant_keywords):
            return 1.0
    return 0.0


def evaluate_model(recommender, model_name: str, k: int = 10) -> dict:
    metrics = {"precision_at_k": [], "recall_at_k": [], "hit_rate": []}
    per_query = []

    for tq in TEST_QUERIES:
        results = recommender.recommend(tq["query"], top_k=k)

        p = precision_at_k(results, tq["relevant_titles"], tq["relevant_keywords"], k)
        r = recall_at_k(results, tq["relevant_titles"], tq["relevant_keywords"], k)
        h = hit_rate(results, tq["relevant_titles"], tq["relevant_keywords"])

        metrics["precision_at_k"].append(p)
        metrics["recall_at_k"].append(r)
        metrics["hit_rate"].append(h)

        per_query.append({
            "query": tq["query"],
            "precision_at_k": round(p, 4),
            "recall_at_k": round(r, 4),
            "hit_rate": h,
            "top_results": [c["course_title"] for c in results[:5]],
        })

    return {
        "model": model_name,
        "k": k,
        "num_queries": len(TEST_QUERIES),
        "avg_precision_at_k": round(float(np.mean(metrics["precision_at_k"])), 4),
        "avg_recall_at_k": round(float(np.mean(metrics["recall_at_k"])), 4),
        "avg_hit_rate": round(float(np.mean(metrics["hit_rate"])), 4),
        "per_query": per_query,
    }


def run_evaluation(tfidf_recommender, neural_recommender, k: int = 10) -> dict:
    print("Evaluating TF-IDF model...")
    tfidf_eval = evaluate_model(tfidf_recommender, "tfidf", k)
    print("Evaluating Neural model...")
    neural_eval = evaluate_model(neural_recommender, "neural", k)

    report = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "k": k,
        "tfidf": tfidf_eval,
        "neural": neural_eval,
        "comparison": {
            "precision_at_k": {
                "tfidf": tfidf_eval["avg_precision_at_k"],
                "neural": neural_eval["avg_precision_at_k"],
                "winner": "tfidf" if tfidf_eval["avg_precision_at_k"] >= neural_eval["avg_precision_at_k"] else "neural",
            },
            "recall_at_k": {
                "tfidf": tfidf_eval["avg_recall_at_k"],
                "neural": neural_eval["avg_recall_at_k"],
                "winner": "tfidf" if tfidf_eval["avg_recall_at_k"] >= neural_eval["avg_recall_at_k"] else "neural",
            },
            "hit_rate": {
                "tfidf": tfidf_eval["avg_hit_rate"],
                "neural": neural_eval["avg_hit_rate"],
                "winner": "tfidf" if tfidf_eval["avg_hit_rate"] >= neural_eval["avg_hit_rate"] else "neural",
            },
        },
    }

    results_path = os.path.join(os.path.dirname(__file__), "..", "artifacts", "evaluation_results.json")
    os.makedirs(os.path.dirname(results_path), exist_ok=True)
    with open(results_path, "w") as f:
        json.dump(report, f, indent=2)
    print(f"Evaluation results saved to {results_path}")

    return report
