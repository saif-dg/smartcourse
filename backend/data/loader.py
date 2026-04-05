import pandas as pd

from data.mock_courses import MOCK_COURSES


def load_courses() -> pd.DataFrame:
    """Load courses from MOCK_COURSES into a pandas DataFrame."""
    df = pd.DataFrame(MOCK_COURSES)
    df["description"] = df["description"].fillna("")
    df["department"] = df["department"].fillna("")
    df["course_title"] = df["course_title"].fillna("")
    df = df.drop_duplicates(subset=["course_title", "description"], keep="first")
    df = df.reset_index(drop=True)
    print(f"Loaded {len(df)} courses after deduplication.")
    return df
