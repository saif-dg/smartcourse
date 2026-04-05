import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const techStack = {
  Backend: ["Python 3.10+", "Flask", "SQLite", "Pandas", "Scikit-learn"],
  "ML/NLP": ["spaCy", "Sentence-Transformers", "TF-IDF", "Cosine Similarity"],
  Frontend: ["React Router", "TypeScript", "Tailwind CSS", "shadcn/ui"],
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold">
        About SmartCourse
      </h1>
      <p className="mt-1 text-muted-foreground">
        Technical implementation details and system architecture
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              SmartCourse is an intelligent recommendation engine that addresses
              educational discovery challenges through advanced NLP and machine
              learning. The system implements dual algorithmic approaches for
              course recommendations.
            </p>
            <p>
              Using a comprehensive course dataset, the application processes
              natural language queries to deliver personalized course
              recommendations with unique results for each query.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Architecture</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              The system follows a 3-tier architecture: Presentation (React),
              Application (Flask/Python), and Data (SQLite/CSV).
            </p>
            <p>
              The Flask REST API handles query processing, model inference, and
              data persistence. The React frontend communicates with the backend
              via JSON API calls.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              TF-IDF Model (Keyword Matching)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              The TF-IDF (Term Frequency-Inverse Document Frequency) model uses
              vectorization with N-Grams (Uni-Gram, Bi-Grams) to convert course
              descriptions into numerical representations.
            </p>
            <p>
              It matches user queries with courses using cosine similarity,
              excelling at finding courses with exact keyword matches.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Neural Model (Semantic Understanding)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              The Neural model uses Sentence-Transformers (all-MiniLM-L6-v2) to
              generate dense embeddings that capture semantic meaning of course
              descriptions.
            </p>
            <p>
              It understands conceptual relationships between queries and
              courses, finding relevant results even without exact keyword
              matches.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {Object.entries(techStack).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Dataset</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              The system uses a curated dataset of 8,500+ courses containing
              metadata including course name, university, difficulty level,
              course rating, description, and department. The data is
              preprocessed using spaCy for tokenization, stopword removal, and
              lemmatization.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Project ID: F25PROJECTBBD65 (BC200401890) &middot; Supervisor:
          Muhammad Bilal
        </p>
      </div>
    </div>
  )
}
