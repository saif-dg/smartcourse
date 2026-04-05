import { Bookmark } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import type { Course } from "~/lib/types"

function scoreColor(score: number) {
  if (score >= 70) return "text-green-600"
  if (score >= 40) return "text-yellow-600"
  return "text-red-600"
}

function progressColor(score: number) {
  if (score >= 70) return "[&>div]:bg-green-500"
  if (score >= 40) return "[&>div]:bg-yellow-500"
  return "[&>div]:bg-red-500"
}

interface CourseCardProps {
  course: Course
  onSave?: (courseId: number) => void
  saving?: boolean
}

export function CourseCard({ course, onSave, saving }: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-base leading-snug">
              {course.course_title}
            </CardTitle>
            <CardDescription>{course.university}</CardDescription>
          </div>
          {onSave && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => onSave(course.course_id)}
              disabled={saving}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="secondary">{course.department}</Badge>
          <Badge variant="outline">{course.difficulty}</Badge>
          <Badge variant="outline">Rating: {course.rating}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {course.description}
        </p>
        <div className="flex items-center gap-3">
          <Progress
            value={course.relevance_score}
            className={`h-2 flex-1 ${progressColor(course.relevance_score)}`}
          />
          <span
            className={`text-sm font-semibold tabular-nums ${scoreColor(course.relevance_score)}`}
          >
            {course.relevance_score}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
