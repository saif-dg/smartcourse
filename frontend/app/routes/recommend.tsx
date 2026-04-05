import { useState } from "react"
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
        {courses.map((course) => (
          <CourseCard
            key={course.course_id}
            course={course}
            onSave={handleSave}
            saving={savingId === course.course_id}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold">
        Course Recommendation Engine
      </h1>
      <p className="mt-1 text-muted-foreground">
        Describe what you want to learn in natural language
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Your Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder='e.g. "I want to learn Python for data science and machine learning"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
          />
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
            <Button onClick={handleSearch} disabled={loading || !query.trim()}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {response && (
        <div className="mt-8">
          <h2 className="font-heading text-lg font-semibold">Results</h2>
          <p className="text-sm text-muted-foreground">
            Query: &ldquo;{response.query}&rdquo; &middot; Model:{" "}
            {response.model.toUpperCase()}
          </p>

          <div className="mt-4">
            {response.model === "both" &&
            response.tfidf_results &&
            response.neural_results ? (
              <Tabs defaultValue="tfidf">
                <TabsList>
                  <TabsTrigger value="tfidf">TF-IDF Results</TabsTrigger>
                  <TabsTrigger value="neural">Neural Results</TabsTrigger>
                </TabsList>
                <TabsContent value="tfidf" className="mt-4">
                  {renderCourseList(response.tfidf_results)}
                </TabsContent>
                <TabsContent value="neural" className="mt-4">
                  {renderCourseList(response.neural_results)}
                </TabsContent>
              </Tabs>
            ) : (
              renderCourseList(response.results)
            )}
          </div>
        </div>
      )}
    </div>
  )
}
