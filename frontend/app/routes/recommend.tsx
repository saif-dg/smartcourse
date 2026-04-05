import type { MetaFunction } from "react-router"
import { useState } from "react"

export const meta: MetaFunction = () => [
  { title: "Get Recommendations — SmartCourse" },
  {
    name: "description",
    content:
      "Describe your learning goals and get personalized course recommendations powered by AI.",
  },
]
import { Loader2, Search, Sparkles, X } from "lucide-react"
import { toast } from "sonner"
import { CourseCard } from "~/components/course-card"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import { fetchRecommendations, saveCourse } from "~/lib/api"
import type { Course, RecommendResponse } from "~/lib/types"

const MAX_QUERY_LENGTH = 500

const exampleQueries = [
  "Machine learning for beginners",
  "Web development with React",
  "Data science with Python",
  "Cloud computing and AWS",
  "Introduction to algorithms",
  "Mobile app development",
]

export default function Recommend() {
  const [query, setQuery] = useState("")
  const [model, setModel] = useState("tfidf")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<RecommendResponse | null>(null)
  const [savingId, setSavingId] = useState<number | null>(null)

  async function handleSearch() {
    const trimmed = query.trim()
    if (!trimmed) return
    if (trimmed.length < 3) {
      toast.error("Query too short — please describe what you want to learn")
      return
    }
    setLoading(true)
    try {
      const data = await fetchRecommendations(trimmed, model)
      setResponse(data)
    } catch {
      toast.error("Failed to get recommendations")
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setQuery("")
    setResponse(null)
  }

  async function handleSave(courseId: number) {
    setSavingId(courseId)
    try {
      await saveCourse(courseId)
      toast.success("Course saved to dashboard")
    } catch {
      toast.error("Failed to save course")
    } finally {
      setSavingId(null)
    }
  }

  function renderCourseList(courses: Course[]) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course, i) => (
          <div
            key={course.course_id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CourseCard
              course={course}
              onSave={handleSave}
              saving={savingId === course.course_id}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Recommend
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe what you want to learn and we'll find the best courses
        </p>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Your Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder='e.g. "I want to learn Python for data science and machine learning"'
              value={query}
              onChange={(e) => {
                if (e.target.value.length <= MAX_QUERY_LENGTH)
                  setQuery(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSearch()
                }
              }}
              rows={3}
              className="resize-none pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2.5 right-2.5 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <span className="mt-1 block text-right text-xs text-muted-foreground">
              {query.length}/{MAX_QUERY_LENGTH}
            </span>
          </div>

          {/* Example query chips */}
          {!response && !loading && (
            <div className="flex flex-wrap gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 text-muted-foreground" />
              {exampleQueries.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuery(q)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tfidf">TF-IDF Model</SelectItem>
                <SelectItem value="neural">Neural Model</SelectItem>
                <SelectItem value="both">Compare Both</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="gap-2 rounded-full px-6"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Minimal loading indicator */}
      {loading && (
        <div className="animate-fade-in mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Finding courses...
        </div>
      )}

      {!loading && response && (
        <div className="animate-fade-in mt-10">
          <div className="mb-5 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <h2 className="font-heading text-lg font-semibold">Results</h2>
              <span className="text-sm text-muted-foreground">
                &ldquo;{response.query}&rdquo; &middot;{" "}
                <span className="font-medium text-primary">
                  {response.model.toUpperCase()}
                </span>
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="gap-1.5 rounded-full"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          </div>

          {response.model === "both" &&
          response.tfidf_results &&
          response.neural_results ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 font-heading text-base font-semibold text-primary">
                  TF-IDF Results
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    (Keyword Matching)
                  </span>
                </h3>
                <div className="grid gap-4">
                  {response.tfidf_results.map((course, i) => (
                    <div
                      key={course.course_id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <CourseCard
                        course={course}
                        onSave={handleSave}
                        saving={savingId === course.course_id}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-heading text-base font-semibold text-primary">
                  Neural Results
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    (Semantic Understanding)
                  </span>
                </h3>
                <div className="grid gap-4">
                  {response.neural_results.map((course, i) => (
                    <div
                      key={course.course_id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <CourseCard
                        course={course}
                        onSave={handleSave}
                        saving={savingId === course.course_id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            renderCourseList(response.results)
          )}
        </div>
      )}
    </div>
  )
}
