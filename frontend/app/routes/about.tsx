import { Brain, Cpu, Layers } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const techStack = {
  Backend: ["Python 3.10+", "Flask", "SQLite", "Pandas", "Scikit-learn"],
  "ML/NLP": ["spaCy", "Sentence-Transformers", "TF-IDF", "Cosine Similarity"],
  Frontend: ["React Router", "TypeScript", "Tailwind CSS", "shadcn/ui"],
}

const techIcons: Record<string, typeof Brain> = {
  Backend: Cpu,
  "ML/NLP": Brain,
  Frontend: Layers,
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          About SmartCourse
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Technical implementation details and system architecture
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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
          <CardHeader className="pb-3">
            <CardTitle>Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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
          <CardHeader className="pb-3">
            <CardTitle>
              TF-IDF Model
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                Keyword Matching
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The TF-IDF model uses vectorization with N-Grams to convert course
              descriptions into numerical representations.
            </p>
            <p>
              It matches user queries with courses using cosine similarity,
              excelling at finding courses with exact keyword matches.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              Neural Model
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                Semantic Understanding
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The Neural model uses Sentence-Transformers (all-MiniLM-L6-v2) to
              generate dense embeddings that capture semantic meaning.
            </p>
            <p>
              It understands conceptual relationships between queries and
              courses, finding relevant results even without exact keyword
              matches.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              {Object.entries(techStack).map(([category, items]) => {
                const Icon = techIcons[category] ?? Layers
                return (
                  <div key={category}>
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-heading text-sm font-semibold">
                        {category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Dataset</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
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
    </div>
  )
}
