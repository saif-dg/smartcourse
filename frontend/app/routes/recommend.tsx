import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { CourseCard } from "~/components/course-card"
import { Button } from "~/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Textarea } from "~/components/ui/textarea"
import { fetchRecommendations, saveCourse } from "~/lib/api"
import type { Course, RecommendResponse } from "~/lib/types"

export default function Recommend() {
  const [query, setQuery] = useState("")
  const [model, setModel] = useState("tfidf")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<RecommendResponse | null>(null)
  const [savingId, setSavingId] = useState<number | null>(null)

  async function handleSearch() {
    if (!query.trim()) return
    setLoading(true)
    try {
      const data = await fetchRecommendations(query, model)
      setResponse(data)
    } catch {
      toast.error("Failed to get recommendations")
    } finally {
      setLoading(false)
    }
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
            className="animate-fade-up"
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
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center gap-3">
        <div className="icon-box icon-box-dark">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white">
            Course Recommendation Engine
          </h1>
          <p className="text-sm text-[#8899aa]">
            Describe what you want to learn in natural language
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#1e3a54] bg-navy-card p-6">
        <h3 className="font-heading text-sm font-semibold text-white">
          Your Preferences
        </h3>
        <div className="mt-4 space-y-4">
          <Textarea
            placeholder='e.g. "I want to learn Python for data science and machine learning"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
            className="resize-none border-[#1e3a54] bg-navy/60 text-white placeholder:text-[#5a6a7a] focus:border-emerald/40 focus:bg-navy"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-48 border-[#1e3a54] bg-navy/60 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[#1e3a54] bg-navy-light text-white">
                <SelectItem value="tfidf">TF-IDF Model</SelectItem>
                <SelectItem value="neural">Neural Model</SelectItem>
                <SelectItem value="both">Compare Both</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="btn-primary gap-2 rounded-full px-6"
            >
              <Search className="h-4 w-4" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      {response && (
        <div className="mt-10">
          <div className="mb-5 flex items-baseline gap-2">
            <h2 className="font-heading text-lg font-semibold text-white">
              Results
            </h2>
            <span className="text-sm text-[#8899aa]">
              &ldquo;{response.query}&rdquo; &middot;{" "}
              <span className="font-medium text-emerald">
                {response.model.toUpperCase()}
              </span>
            </span>
          </div>

          {response.model === "both" &&
          response.tfidf_results &&
          response.neural_results ? (
            <Tabs defaultValue="tfidf">
              <TabsList className="border border-[#1e3a54] bg-navy-light">
                <TabsTrigger value="tfidf">TF-IDF Results</TabsTrigger>
                <TabsTrigger value="neural">Neural Results</TabsTrigger>
              </TabsList>
              <TabsContent value="tfidf" className="mt-5">
                {renderCourseList(response.tfidf_results)}
              </TabsContent>
              <TabsContent value="neural" className="mt-5">
                {renderCourseList(response.neural_results)}
              </TabsContent>
            </Tabs>
          ) : (
            renderCourseList(response.results)
          )}
        </div>
      )}
    </div>
  )
}
