import type { MetaFunction } from "react-router"
import { useEffect, useState } from "react"

export const meta: MetaFunction = () => [
  { title: "Dashboard — SmartCourse" },
  { name: "description", content: "View and manage your saved course recommendations." },
]
import { Bookmark, Clock, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Link } from "react-router"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { deleteSaved, fetchHistory, fetchSaved } from "~/lib/api"
import type { HistoryEntry, SavedRecommendation } from "~/lib/types"

export default function Dashboard() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [saved, setSaved] = useState<SavedRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchHistory(), fetchSaved()])
      .then(([h, s]) => {
        setHistory(h)
        setSaved(s)
      })
      .catch(() => toast.error("Failed to load dashboard data"))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(saveId: number) {
    try {
      await deleteSaved(saveId)
      setSaved((prev) => prev.filter((s) => s.save_id !== saveId))
      toast.success("Removed from saved")
    } catch {
      toast.error("Failed to remove")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center px-4 py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your search history and saved recommendations
        </p>
      </div>

      <Tabs defaultValue="history" className="mt-6">
        <TabsList>
          <TabsTrigger value="history">
            Search History ({history.length})
          </TabsTrigger>
          <TabsTrigger value="saved">
            Saved Courses ({saved.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-4">
          {history.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">No search history yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your searches will appear here once you start exploring courses.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-2 gap-2 rounded-full">
                  <Link to="/recommend">
                    <Search className="h-3.5 w-3.5" />
                    Start Searching
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((entry) => (
                    <TableRow key={entry.search_id}>
                      <TableCell className="font-medium">
                        {entry.query_text}
                      </TableCell>
                      <TableCell>
                        <Badge className="font-mono text-xs">
                          {entry.model_used.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          {saved.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Bookmark className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">No saved courses yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Bookmark courses from the recommendation page to save them here.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-2 gap-2 rounded-full">
                  <Link to="/recommend">
                    <Search className="h-3.5 w-3.5" />
                    Find Courses
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {saved.map((item) => (
                <Card key={item.save_id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-base">
                          {item.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {item.university}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(item.save_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      <Badge variant="outline">{item.difficulty_level}</Badge>
                      <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                        Rating: {item.rating}
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-3 text-xs tabular-nums text-muted-foreground/60">
                      Saved {new Date(item.saved_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
