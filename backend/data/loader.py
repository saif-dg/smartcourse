import os

import pandas as pd

CSV_PATH = os.path.join(os.path.dirname(__file__), "courses.csv")


def load_courses() -> pd.DataFrame:
    """Load courses from CSV into a pandas DataFrame."""
    df = pd.read_csv(CSV_PATH)
    df["description"] = df["description"].fillna("")
    df["department"] = df["department"].fillna("")
    df["course_title"] = df["course_title"].fillna("")
    df = df.drop_duplicates(subset=["course_title", "description"], keep="first")
    df = df.reset_index(drop=True)
    print(f"Loaded {len(df)} courses from CSV after deduplication.")
    return df
