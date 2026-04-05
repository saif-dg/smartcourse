import joblib
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

from models.base import BaseRecommender
from preprocessing.text_cleaner import clean_text_for_neural, clean_texts_for_neural_batch

MODEL_NAME = "all-MiniLM-L6-v2"


class NeuralRecommender(BaseRecommender):
    def __init__(self):
        self.model: SentenceTransformer | None = None
        self.embeddings: np.ndarray | None = None
        self.courses_df: pd.DataFrame | None = None

    def _load_model(self):
        if self.model is None:
            self.model = SentenceTransformer(MODEL_NAME)

    def fit(self, courses_df: pd.DataFrame) -> None:
        self.courses_df = courses_df.copy()
        self._load_model()

        combined = (
            courses_df["course_title"].fillna("")
            + " " + courses_df["department"].fillna("")
            + " " + courses_df["description"].fillna("")
        ).tolist()

        print("  Neural: Preprocessing texts...")
        cleaned = clean_texts_for_neural_batch(combined)

        print("  Neural: Encoding with sentence-transformers...")
        self.embeddings = self.model.encode(cleaned, show_progress_bar=True, batch_size=64)
        norms = np.linalg.norm(self.embeddings, axis=1, keepdims=True)
        norms[norms == 0] = 1
        self.embeddings = self.embeddings / norms
        print(f"  Neural: Embeddings shape {self.embeddings.shape}")

    def recommend(self, query: str, top_k: int = 10) -> list[dict]:
        self._load_model()
        cleaned_query = clean_text_for_neural(query)
        query_embedding = self.model.encode([cleaned_query])
        query_embedding = query_embedding / np.linalg.norm(query_embedding)

        scores = (query_embedding @ self.embeddings.T)[0]

        top_indices = np.argsort(scores)[::-1][:top_k]
        results = []
        for idx in top_indices:
            row = self.courses_df.iloc[idx]
            score = min(round(float(scores[idx]) * 100, 1), 99.9)
            score = max(score, 0.0)
            results.append({
                "course_id": int(row["course_id"]),
                "course_title": row["course_title"],
                "university": row["university"],
                "department": row.get("department", ""),
                "difficulty": row["difficulty"],
                "rating": float(row["rating"]),
                "description": row["description"],
                "relevance_score": score,
            })
        return results

    def save(self, path: str) -> None:
        joblib.dump({
            "embeddings": self.embeddings,
            "courses_df": self.courses_df,
        }, path)

    def load(self, path: str) -> None:
        self._load_model()
        data = joblib.load(path)
        self.embeddings = data["embeddings"]
        self.courses_df = data["courses_df"]
