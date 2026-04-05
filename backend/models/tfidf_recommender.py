import joblib
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from models.base import BaseRecommender
from preprocessing.text_cleaner import clean_text, clean_texts_batch


class TfidfRecommender(BaseRecommender):
    def __init__(self):
        self.vectorizer: TfidfVectorizer | None = None
        self.tfidf_matrix = None
        self.courses_df: pd.DataFrame | None = None

    def fit(self, courses_df: pd.DataFrame) -> None:
        self.courses_df = courses_df.copy()
        combined = (
            courses_df["course_title"].fillna("")
            + " " + courses_df["department"].fillna("")
            + " " + courses_df["description"].fillna("")
        ).tolist()

        print("  TF-IDF: Preprocessing texts with spaCy...")
        cleaned = clean_texts_batch(combined)

        print("  TF-IDF: Fitting vectorizer...")
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), max_features=50000)
        self.tfidf_matrix = self.vectorizer.fit_transform(cleaned)
        print(f"  TF-IDF: Matrix shape {self.tfidf_matrix.shape}")

    def recommend(self, query: str, top_k: int = 10) -> list[dict]:
        cleaned_query = clean_text(query)
        query_vec = self.vectorizer.transform([cleaned_query])
        scores = cosine_similarity(query_vec, self.tfidf_matrix)[0]

        top_indices = np.argsort(scores)[::-1][:top_k]
        results = []
        for idx in top_indices:
            row = self.courses_df.iloc[idx]
            score = min(round(float(scores[idx]) * 100, 1), 99.9)
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
            "vectorizer": self.vectorizer,
            "tfidf_matrix": self.tfidf_matrix,
            "courses_df": self.courses_df,
        }, path)

    def load(self, path: str) -> None:
        data = joblib.load(path)
        self.vectorizer = data["vectorizer"]
        self.tfidf_matrix = data["tfidf_matrix"]
        self.courses_df = data["courses_df"]
