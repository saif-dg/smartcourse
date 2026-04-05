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
  if (score >= 70) return "text-emerald"
  if (score >= 40) return "text-amber"
  return "text-red-400"
}

function progressColor(score: number) {
  if (score >= 70) return "[&>div]:bg-emerald"
  if (score >= 40) return "[&>div]:bg-amber"
  return "[&>div]:bg-red-400"
}

interface CourseCardProps {
  course: Course
  onSave?: (courseId: number) => void
  saving?: boolean
}

export function CourseCard({ course, onSave, saving }: CourseCardProps) {
  return (
    <Card className="service-card overflow-hidden border-[#1e3a54] bg-navy-card transition-all hover:border-emerald/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="font-heading text-base leading-snug text-white">
              {course.course_title}
            </CardTitle>
            <CardDescription className="text-[#8899aa]">
              {course.university}
            </CardDescription>
          </div>
          {onSave && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-[#8899aa] hover:bg-emerald/10 hover:text-emerald"
              onClick={() => onSave(course.course_id)}
              disabled={saving}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge className="border-0 bg-emerald/10 text-emerald">
            {course.department}
          </Badge>
          <Badge variant="outline" className="border-[#1e3a54] text-[#8899aa]">
            {course.difficulty}
          </Badge>
          <Badge variant="outline" className="border-amber/30 text-amber">
            Rating: {course.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-[#8899aa]">
          {course.description}
        </p>
        <div className="flex items-center gap-3">
          <Progress
            value={course.relevance_score}
            className={`h-1.5 flex-1 bg-[#1a3350] ${progressColor(course.relevance_score)}`}
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
