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
  if (score >= 70) return "text-emerald-600"
  if (score >= 40) return "text-amber-600"
  return "text-red-500"
}

function progressColor(score: number) {
  if (score >= 70) return "[&>div]:bg-emerald-500"
  if (score >= 40) return "[&>div]:bg-amber-500"
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
              className="shrink-0 text-muted-foreground hover:text-primary"
              onClick={() => onSave(course.course_id)}
              disabled={saving}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge>{course.department}</Badge>
          <Badge variant="outline">{course.difficulty}</Badge>
          <Badge variant="outline" className="border-amber-500/30 text-amber-600">
            Rating: {course.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>
        <div className="flex items-center gap-3">
          <Progress
            value={course.relevance_score}
            className={`h-1.5 flex-1 ${progressColor(course.relevance_score)}`}
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
