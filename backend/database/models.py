from database.db import get_db

DEFAULT_USER_ID = 1


def insert_history(query_text, model_used):
    db = get_db()
    db.execute(
        "INSERT INTO search_history (user_id, query_text, model_used) VALUES (?, ?, ?)",
        (DEFAULT_USER_ID, query_text, model_used),
    )
    db.commit()
    db.close()


def get_history():
    db = get_db()
    rows = db.execute(
        "SELECT search_id, user_id, query_text, model_used, timestamp FROM search_history ORDER BY timestamp DESC"
    ).fetchall()
    db.close()
    return [dict(row) for row in rows]


def save_recommendation(course_id):
    db = get_db()
    cursor = db.execute(
        "INSERT INTO saved_recommendations (user_id, course_id) VALUES (?, ?)",
        (DEFAULT_USER_ID, course_id),
    )
    db.commit()
    saved_id = cursor.lastrowid
    db.close()
    return saved_id


def get_saved():
    db = get_db()
    rows = db.execute(
        """SELECT sr.save_id, sr.user_id, sr.course_id, sr.saved_at,
                  c.title, c.university, c.department, c.difficulty_level, c.rating, c.description
           FROM saved_recommendations sr
           LEFT JOIN courses c ON sr.course_id = c.course_id
           ORDER BY sr.saved_at DESC"""
    ).fetchall()
    db.close()
    return [dict(row) for row in rows]


def delete_saved(save_id):
    db = get_db()
    db.execute("DELETE FROM saved_recommendations WHERE save_id = ?", (save_id,))
    db.commit()
    db.close()


def load_courses_to_db(courses):
    db = get_db()
    for c in courses:
        db.execute(
            "INSERT OR IGNORE INTO courses (course_id, title, university, department, difficulty_level, rating, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (c["course_id"], c["course_title"], c["university"], c.get("department", ""), c["difficulty"], c["rating"], c["description"]),
        )
    db.commit()
    db.close()
