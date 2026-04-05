import { Bookmark, GraduationCap, Loader2, Star } from "lucide-react"
import { Button } from "~/components/ui/button"
import type { Course } from "~/lib/types"

function scoreColor(score: number) {
  if (score >= 70) return "bg-emerald-500"
  if (score >= 40) return "bg-amber-500"
  return "bg-red-500"
}

function difficultyStyle(level: string) {
  const l = level.toLowerCase()
  if (l.includes("beginner"))
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  if (l.includes("intermediate"))
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  if (l.includes("advanced") || l.includes("mixed"))
    return "bg-red-500/10 text-red-500 dark:text-red-400"
  return "bg-muted text-muted-foreground"
}

interface CourseCardProps {
  course: Course
  onSave?: (courseId: number) => void
  saving?: boolean
}

export function CourseCard({ course, onSave, saving }: CourseCardProps) {
  const score = course.relevance_score

  return (
    <div className="group rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20 hover:shadow-sm">
      {/* Top row: department + save */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary/15">
          {course.department}
        </span>
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary"
            onClick={() => onSave(course.course_id)}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Title + university */}
      <h3 className="mt-3 font-heading text-[15px] font-semibold leading-snug text-foreground">
        {course.course_title}
      </h3>
      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
        <GraduationCap className="h-3.5 w-3.5 shrink-0" />
        {course.university}
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {course.description}
      </p>

      {/* Bottom row: metadata + score */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyStyle(course.difficulty)}`}
          >
            {course.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
        </div>

        {/* Relevance score pill */}
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full ${scoreColor(score)} transition-all`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-xs font-semibold tabular-nums text-foreground">
            {score}%
          </span>
        </div>
      </div>
    </div>
  )
}
