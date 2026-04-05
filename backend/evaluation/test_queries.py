"""
Curated test queries with known relevant courses for evaluation.

Each entry has:
- query: the natural language search query
- relevant_titles: exact course titles considered relevant (ground truth)
- relevant_keywords: keywords that indicate relevance (used for soft matching)
"""

TEST_QUERIES = [
    {
        "query": "I want to learn Python programming for beginners",
        "relevant_titles": [
            "The Complete Python Bootcamp From Zero to Hero in Python",
            "Complete Python Bootcamp: Go from zero to hero in Python 3",
            "Python for Beginners - Learn Python Programming Language",
            "Learn Python Programming Masterclass",
        ],
        "relevant_keywords": ["python", "beginner", "programming", "bootcamp"],
    },
    {
        "query": "Machine learning and artificial intelligence",
        "relevant_titles": [
            "Machine Learning A-Z™: Hands-On Python & R In Data Science",
            "Machine Learning, Data Science and Deep Learning with Python",
            "Python for Data Science and Machine Learning Bootcamp",
        ],
        "relevant_keywords": ["machine learning", "artificial intelligence", "deep learning", "data science"],
    },
    {
        "query": "Web development with JavaScript and React",
        "relevant_titles": [
            "The Complete JavaScript Course 2023: From Zero to Expert!",
            "The Web Developer Bootcamp",
            "Modern React with Redux",
            "React - The Complete Guide",
        ],
        "relevant_keywords": ["javascript", "react", "web development", "frontend"],
    },
    {
        "query": "Data science and data analysis with Python",
        "relevant_titles": [
            "Python for Data Science and Machine Learning Bootcamp",
            "The Data Science Course 2023: Complete Data Science Bootcamp",
            "Data Analysis with Pandas and Python",
        ],
        "relevant_keywords": ["data science", "data analysis", "python", "pandas"],
    },
    {
        "query": "Business and financial analysis",
        "relevant_titles": [
            "The Complete Financial Analyst Course 2023",
            "Ultimate Investment Banking Course",
            "An Entire MBA in 1 Course",
            "Financial Modeling and Valuation Analyst (FMVA)",
        ],
        "relevant_keywords": ["business", "finance", "financial", "investment", "accounting"],
    },
    {
        "query": "Photography and photo editing",
        "relevant_titles": [
            "Photography Masterclass: A Complete Guide to Photography",
            "Adobe Photoshop CC – Essentials Training Course",
        ],
        "relevant_keywords": ["photography", "photo", "photoshop", "camera", "editing"],
    },
    {
        "query": "Mobile app development for Android and iOS",
        "relevant_titles": [
            "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp",
            "The Complete Android N Developer Course",
            "Flutter & Dart - The Complete Guide",
        ],
        "relevant_keywords": ["android", "ios", "mobile", "app development", "swift", "flutter"],
    },
    {
        "query": "Cloud computing and AWS certification",
        "relevant_titles": [
            "Ultimate AWS Certified Solutions Architect Associate",
            "AWS Certified Cloud Practitioner",
            "Amazon Web Services (AWS) Certified",
        ],
        "relevant_keywords": ["aws", "cloud", "amazon", "certification", "devops"],
    },
    {
        "query": "Graphic design and illustration",
        "relevant_titles": [
            "Graphic Design Masterclass - Learn GREAT Design",
            "Adobe Illustrator CC – Essentials Training Course",
            "Become a Professional Logo Designer",
        ],
        "relevant_keywords": ["graphic design", "illustrator", "design", "adobe", "logo"],
    },
    {
        "query": "SQL and database management",
        "relevant_titles": [
            "The Complete SQL Bootcamp",
            "SQL - MySQL for Data Analytics and Business Intelligence",
            "The Ultimate MySQL Bootcamp",
        ],
        "relevant_keywords": ["sql", "database", "mysql", "postgresql", "query"],
    },
    {
        "query": "Deep learning and neural networks",
        "relevant_titles": [
            "Machine Learning, Data Science and Deep Learning with Python",
            "Deep Learning A-Z™: Hands-On Artificial Neural Networks",
            "PyTorch for Deep Learning",
        ],
        "relevant_keywords": ["deep learning", "neural network", "tensorflow", "pytorch"],
    },
    {
        "query": "Digital marketing and SEO",
        "relevant_titles": [
            "The Complete Digital Marketing Course",
            "SEO Training Course by Moz",
        ],
        "relevant_keywords": ["marketing", "seo", "digital marketing", "social media", "advertising"],
    },
    {
        "query": "Cybersecurity and ethical hacking",
        "relevant_titles": [
            "The Complete Cyber Security Course",
            "Learn Ethical Hacking From Scratch",
            "CompTIA Security+ Certification",
        ],
        "relevant_keywords": ["security", "hacking", "cyber", "penetration", "network security"],
    },
    {
        "query": "Music production and audio engineering",
        "relevant_titles": [
            "Music Production in Logic Pro X - The Complete Course",
            "Music Theory Comprehensive Complete",
        ],
        "relevant_keywords": ["music", "audio", "production", "sound", "instruments"],
    },
    {
        "query": "Excel and spreadsheet analysis for business",
        "relevant_titles": [
            "Microsoft Excel - Excel from Beginner to Advanced",
            "Excel VBA Programming",
        ],
        "relevant_keywords": ["excel", "spreadsheet", "microsoft", "vba", "pivot"],
    },
]
