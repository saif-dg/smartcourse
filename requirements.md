**[SmartCourse -- AI Powered Course Recommendation System]{.underline}**

**[Project Domain / Category]{.underline}**

Machine Learning / Natural Language Processing (NLP)

**[Abstract / Introduction]{.underline}**

SmartCourse is an intelligent recommendation engine that addresses
educational discovery challenges through advanced NLP and machine
learning. The system implements dual algorithmic approaches: a TF-IDF
vectorization model for precise keyword matching and a neural
sentence-transformers model for semantic understanding. Using a
comprehensive course dataset, the application processes natural language
queries to deliver personalized course recommendations. The end product
provides unique results for each query by analyzing semantic
relationships and keyword relevance, ensuring different preferences
yield distinct, context-aware recommendations.

**[Functional Requirements:]{.underline}**

The functional requirements of this project are given below:

**1. Professional Web Interface Design**

The interface shall implement a complete multi-page web application with
the following components:

> **Home Page:** Project overview with system capabilities and access to
> recommendation features

**Recommendation Page:**

- Text input area for natural language preferences (e.g., \"I want to
  learn Python for data science\")

- Model selection between TF-IDF (keyword-focused) and Neural (semantic
  understanding)

- Dynamic results displaying top 10 courses with:

  - Course title, department, and description

  - Relevance score (0-100%) with visual progress bar

  - Save functionality for preferred recommendations

**User Dashboard:**

- Complete search history with timestamps

- Saved recommendations organized by search session

- Side-by-side model comparison for identical queries

**About Page: **Technical implementation details and dataset information

**2. Flask Backend API with Processing Logic**

The backend shall implement a robust REST API with intelligent query
processing:

POST /api/recommend:

- Accepts user preferences as natural language text

- Processes identical queries differently through each model:

  - TF-IDF Model: Matches exact keywords and phrases from course
    descriptions

  - Neural Model: Understands semantic meaning and conceptual
    relationships

- Returns unique result sets highlighting each model\'s strengths

**GET /api/history:** Tracks how same preferences yield different
results across sessions

**POST /api/save:** Stores user preferences and corresponding model
outputs

Real-time processing ensuring fresh recommendations for each query

**3. Data Collection**

**Requirement:** Load a dataset containing at least 8,500+ courses with
detailed descriptions.\
**Details:**

- Use the dataset from: [Course Recommendation System
  Dataset](https://drive.google.com/file/d/1w5g6SqPGCw6kB2OwtLEKH1GP631kb6uR/view?usp=sharing)

- Ensure the dataset includes course metadata: Course Name, University,
  Difficulty Level, Course Rating, Course Description, and Department

- Verify data completeness and structure before processing

**4. Data Preparation**\
**Requirement:** Clean and standardize the course dataset.\
**Details:**

- Manually review and validate course descriptions and metadata

- Save cleaned data in CSV format for consistent access

- Handle missing values in critical fields like Course Description

- Remove duplicate course entries based on title and description

**5. Data Pre-Processing**\
**Requirement:** Normalize and preprocess raw text data from course
descriptions.\
**Details:**

- Remove HTML tags, punctuation, and special characters

- Convert text to lowercase and tokenize descriptions into words

- Remove stopwords and perform lemmatization using spaCy

- Handle missing values and ensure text consistency across the dataset

**6. Feature Extraction**\
**Requirement:** Convert text into numerical representations for model
input.\
**Details:**

- **For TF-IDF Model:** Apply TF-IDF vectorization with N-Grams
  (Uni-Gram, Bi-Grams)

- **For Neural Model:** Generate dense embeddings using
  sentence-transformers (all-MiniLM-L6-v2)

- Create consistent preprocessing pipeline for both training and
  inference

**7. Train & Test Data Preparation**\
**Requirement:** Prepare data for model training and evaluation.\
**Details:**

- Use the entire course corpus for training both recommendation models

- Create evaluation sets with sample queries for performance testing

- Ensure proper data splitting for model validation metrics

**8. Model Development -- TF-IDF Content-Based Filtering**\
**Requirement:** Build a classical content-based recommendation model.\
**Details:**

- Train a TF-IDF vectorizer on course descriptions with scikit-learn

- Implement cosine similarity for matching user queries with courses

- Evaluate performance using precision@k, recall@k, and hit-rate metrics

**9. Model Development -- Neural Embedding Model**\
**Requirement:** Build a deep learning recommendation model using
semantic embeddings.\
**Details:**

- Implement sentence-transformers for generating course embeddings

- Construct similarity matching using cosine distance in embedding space

- Train and optimize the model for semantic understanding of course
  content

**10. Performance Evaluation**\
**Requirement:** Evaluate and compare both recommendation models.\
**Details:**

- Generate quantitative metrics (precision@k, recall@k) for both models

- Perform qualitative analysis by comparing recommendations for sample
  queries

- Analyze which model performs better for different types of user
  queries

**[Tools & Technologies]{.underline}**

- Backend: Python 3.10+, Flask, SQLite, Pandas, Scikit-learn

- ML/NLP: spaCy, Sentence-Transformers, Joblib

- Frontend: HTML5, Bootstrap 5, JavaScript (Fetch API)

- Development: PyCharm with virtual environment, Git for version control

**[Helping Material:]{.underline}**

  ------------------------------------------------------------------------------------------------------------------
  **SR.**   **Resource Title**                  **Link**
  --------- ----------------------------------- --------------------------------------------------------------------
  1         Python Official Website             <https://www.python.org/>

  2         Python Tutorial - W3Schools         <https://www.w3schools.com/python/>

  3         Python Tutorial - TutorialsPoint    <https://www.tutorialspoint.com/python/index.htm>

  4         Kaggle Python Course                <https://www.kaggle.com/learn/python>

  5         Intro to Machine Learning - Kaggle  <https://www.kaggle.com/learn/intro-to-machine-learning>

  6         Google Machine Learning Crash       <https://developers.google.com/machine-learning/crash-course>
            Course                              

  7         Intro to Deep Learning - Kaggle     <https://www.kaggle.com/learn/intro-to-deep-learning>

  8         Python Deep Learning Tutorial       <https://www.tutorialspoint.com/python_deep_learning/index.htm>

  9         Deep Learning Tutorials             <https://www.tutorialspoint.com/deep-learning-tutorials/index.asp>

  10        NLP with Python - YouTube           <https://www.youtube.com/watch?v=VyWAvY2CF9c>

  11        Machine Learning Tutorial - YouTube <https://www.youtube.com/watch?v=6M5VXKLf4D4>

  12        Natural Language Processing         Coursera NLP courses
            Specialization                      

  13        spaCy v3 NER Tutorial               YouTube spaCy tutorials

  14        Flask Official Documentation        <https://flask.palletsprojects.com/>

  15        Bootstrap 5 Documentation           <https://getbootstrap.com/docs/5.0/>

  16        spaCy Documentation                 <https://spacy.io/usage>

  17        Sentence Transformers Docs          <https://www.sbert.net/>

  18        scikit-learn Documentation          <https://scikit-learn.org/stable/>

  19        Pandas Documentation                <https://pandas.pydata.org/docs/>

  20        SQLite with Python                  <https://docs.python.org/3/library/sqlite3.html>

  21        JavaScript Fetch API                MDN Web Docs

  22        Git Version Control                 <https://git-scm.com/doc>

  23        PyCharm IDE Guide                   JetBrains documentation

  24        Virtual Environments Guide          Python venv documentation
  ------------------------------------------------------------------------------------------------------------------

**[Supervisor:]{.underline}**

Name: Muhammad Bilal

Email ID: <bilal.saleem@vu.edu.pk>

Teams ID: bilalsaleemteams@outlook.com
