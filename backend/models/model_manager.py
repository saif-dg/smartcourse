import os

import pandas as pd

from config import ARTIFACTS_DIR
from models.neural_recommender import NeuralRecommender
from models.tfidf_recommender import TfidfRecommender

TFIDF_PATH = os.path.join(ARTIFACTS_DIR, "tfidf_model.joblib")
NEURAL_PATH = os.path.join(ARTIFACTS_DIR, "neural_model.joblib")

_tfidf: TfidfRecommender | None = None
_neural: NeuralRecommender | None = None


def initialize(courses_df: pd.DataFrame) -> None:
    global _tfidf, _neural
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)

    # TF-IDF model
    _tfidf = TfidfRecommender()
    if os.path.exists(TFIDF_PATH):
        print("Loading TF-IDF model from disk...")
        _tfidf.load(TFIDF_PATH)
    else:
        print("Fitting TF-IDF model (first run)...")
        _tfidf.fit(courses_df)
        _tfidf.save(TFIDF_PATH)
    print("TF-IDF model ready.")

    # Neural model
    _neural = NeuralRecommender()
    if os.path.exists(NEURAL_PATH):
        print("Loading Neural model from disk...")
        _neural.load(NEURAL_PATH)
    else:
        print("Fitting Neural model (first run)...")
        _neural.fit(courses_df)
        _neural.save(NEURAL_PATH)
    print("Neural model ready.")


def get_recommendations(query: str, model: str, top_k: int = 10) -> dict:
    if model == "both":
        return {
            "results": [],
            "tfidf_results": _tfidf.recommend(query, top_k),
            "neural_results": _neural.recommend(query, top_k),
        }
    elif model == "neural":
        return {"results": _neural.recommend(query, top_k)}
    else:
        return {"results": _tfidf.recommend(query, top_k)}
