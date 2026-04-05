from abc import ABC, abstractmethod

import pandas as pd


class BaseRecommender(ABC):
    @abstractmethod
    def fit(self, courses_df: pd.DataFrame) -> None:
        ...

    @abstractmethod
    def recommend(self, query: str, top_k: int = 10) -> list[dict]:
        ...

    @abstractmethod
    def save(self, path: str) -> None:
        ...

    @abstractmethod
    def load(self, path: str) -> None:
        ...
