import { Brain, Cpu, Database, Layers, Network, Workflow } from "lucide-react"
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
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Network className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            About SmartCourse
          </h1>
          <p className="text-sm text-muted-foreground">
            Technical implementation details and system architecture
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Card className="animate-fade-up" style={{ animationDelay: "0ms" }}>
          <CardHeader className="pb-3">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Workflow className="h-4 w-4" />
            </div>
            <CardTitle className="font-heading text-base font-semibold">
              System Overview
            </CardTitle>
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

        <Card className="animate-fade-up" style={{ animationDelay: "80ms" }}>
          <CardHeader className="pb-3">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers className="h-4 w-4" />
            </div>
            <CardTitle className="font-heading text-base font-semibold">
              Architecture
            </CardTitle>
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

        <Card className="animate-fade-up" style={{ animationDelay: "160ms" }}>
          <CardHeader className="pb-3">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
              <Cpu className="h-4 w-4" />
            </div>
            <CardTitle className="font-heading text-base font-semibold">
              TF-IDF Model
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                Keyword Matching
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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

        <Card className="animate-fade-up" style={{ animationDelay: "240ms" }}>
          <CardHeader className="pb-3">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
              <Brain className="h-4 w-4" />
            </div>
            <CardTitle className="font-heading text-base font-semibold">
              Neural Model
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                Semantic Understanding
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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

        <Card
          className="animate-fade-up md:col-span-2"
          style={{ animationDelay: "320ms" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-base font-semibold">
              Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              {Object.entries(techStack).map(([category, items]) => {
                const Icon = techIcons[category] ?? Layers
                return (
                  <div key={category}>
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <h4 className="font-heading text-sm font-semibold">
                        {category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-0"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card
          className="animate-fade-up md:col-span-2"
          style={{ animationDelay: "400ms" }}
        >
          <CardHeader className="pb-3">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-4 w-4" />
            </div>
            <CardTitle className="font-heading text-base font-semibold">
              Dataset
            </CardTitle>
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

      <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground/60">
        <p>
          Project ID: F25PROJECTBBD65 (BC200401890) &middot; Supervisor:
          Muhammad Bilal
        </p>
      </div>
    </div>
  )
}
