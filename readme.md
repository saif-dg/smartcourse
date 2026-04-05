# SmartCourse — AI-Powered Course Recommendation System

An intelligent recommendation engine that uses advanced NLP and machine learning to help users discover relevant courses. The system implements dual algorithmic approaches: **TF-IDF vectorization** for precise keyword matching and a **Neural sentence-transformers model** for semantic understanding.

## Features

- **AI-Powered Recommendations** — Describe what you want to learn in natural language and get personalized course suggestions
- **Dual Model Engine** — Compare results from TF-IDF keyword matching and Neural semantic understanding side by side
- **Search History** — Track all your searches with timestamps and see how different models respond to the same query
- **Save Favorites** — Bookmark courses you like and manage your saved recommendations from the dashboard
- **Neural Understanding** — Neural model captures semantic meaning, finding relevant courses even without exact keyword matches
- **Smart Processing** — Advanced NLP pipeline with spaCy tokenization, stopword removal, and lemmatization for precise results

## Tech Stack

### Backend
- **Python 3.10+** — Core language
- **Flask** — REST API framework
- **SQLite** — Database for search history and saved recommendations
- **Pandas** — Data loading and manipulation
- **scikit-learn** — TF-IDF vectorization and cosine similarity
- **spaCy** — Text preprocessing (tokenization, stopword removal, lemmatization)
- **Sentence-Transformers** — Neural embeddings (all-MiniLM-L6-v2)
- **Joblib** — Model artifact serialization

### Frontend
- **React** with **React Router** — Single-page application
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling
- **Shadcn/UI** — UI components

## Project Structure

```
smartcourse/
├── backend/
│   ├── app.py                          # Flask application entry point
│   ├── config.py                       # Configuration (DB path, CORS, artifacts)
│   ├── requirements.txt                # Python dependencies
│   ├── data/
│   │   ├── mock_courses.py             # Dataset: 3,670+ courses
│   │   └── loader.py                   # Loads courses into pandas DataFrame
│   ├── preprocessing/
│   │   └── text_cleaner.py             # spaCy NLP pipeline
│   ├── models/
│   │   ├── base.py                     # Abstract recommender interface
│   │   ├── tfidf_recommender.py        # TF-IDF model implementation
│   │   ├── neural_recommender.py       # Neural model implementation
│   │   └── model_manager.py            # Model initialization and dispatch
│   ├── database/
│   │   ├── schema.sql                  # SQLite table definitions
│   │   ├── db.py                       # Database connection
│   │   └── models.py                   # Database operations (CRUD)
│   ├── routes/
│   │   ├── recommend.py                # POST /api/recommend
│   │   ├── history.py                  # GET /api/history
│   │   └── save.py                     # POST/GET/DELETE /api/save
│   └── artifacts/                      # Auto-generated model files (.joblib)
├── frontend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── home.tsx                # Home page
│   │   │   ├── recommend.tsx           # Recommendation page
│   │   │   ├── dashboard.tsx           # Search history & saved courses
│   │   │   └── about.tsx               # About page
│   │   ├── components/                 # Reusable UI components
│   │   └── lib/
│   │       ├── api.ts                  # API client functions
│   │       └── types.ts                # TypeScript interfaces
│   └── package.json
└── requirements.md                     # Project requirements document
```

## How It Works

### Recommendation Pipeline

1. **Data Loading** — 3,670+ courses are loaded from the dataset into a pandas DataFrame at startup
2. **Text Preprocessing** — Course descriptions are cleaned using spaCy (HTML removal, lowercasing, stopword removal, lemmatization)
3. **Model Training** — Both models are fitted on the preprocessed course corpus:
   - **TF-IDF**: Builds a sparse word-frequency matrix (3,670 × 50,000) with unigram + bigram features
   - **Neural**: Encodes all courses into 384-dimensional dense embeddings using all-MiniLM-L6-v2
4. **Artifact Caching** — Trained models are saved to disk as `.joblib` files. Subsequent startups load from cache instantly
5. **Query Processing** — User queries are preprocessed and compared against all courses using cosine similarity
6. **Results** — Top-k most similar courses are returned with relevance scores (0-100%)

### TF-IDF vs Neural Model

| Aspect | TF-IDF | Neural |
|--------|--------|--------|
| Approach | Keyword matching | Semantic understanding |
| Preprocessing | Full NLP (stopwords, lemmatization) | Light (HTML/special char removal) |
| Vector Size | ~50,000 (sparse) | 384 (dense) |
| Strength | Exact keyword precision | Understands meaning and synonyms |
| Example | "python" matches "python" | "coding" matches "programming" |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recommend` | Get course recommendations |
| GET | `/api/history` | Retrieve search history |
| POST | `/api/save` | Save a course recommendation |
| GET | `/api/saved` | Get saved recommendations |
| DELETE | `/api/saved/:id` | Remove a saved recommendation |

### POST /api/recommend

**Request:**
```json
{
  "query": "I want to learn python for data science",
  "model": "tfidf",
  "top_k": 10
}
```
- `model`: `"tfidf"`, `"neural"`, or `"both"`

**Response:**
```json
{
  "query": "I want to learn python for data science",
  "model": "tfidf",
  "results": [
    {
      "course_id": 1035472,
      "course_title": "Python for Finance: Investment Fundamentals & Data Analytics",
      "university": "UCLA",
      "department": "Business & Finance",
      "difficulty": "All Levels",
      "rating": 3.7,
      "description": "...",
      "relevance_score": 33.6
    }
  ],
  "timestamp": "2026-04-05T08:45:06.761672+00:00"
}
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy language model
python -m spacy download en_core_web_sm

# Start the server (first run fits models, takes 2-5 minutes)
python app.py
```

The backend runs on `http://localhost:5001`.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Dataset

The system uses a dataset of **3,670+ courses** (after deduplication) with the following metadata:

- Course Name
- University
- Department
- Difficulty Level (Beginner, Intermediate, All Levels)
- Course Rating
- Course Description
- Number of Subscribers, Reviews, and Lectures

## Supervisor

- **Name:** Muhammad Bilal
- **Email:** bilal.saleem@vu.edu.pk
