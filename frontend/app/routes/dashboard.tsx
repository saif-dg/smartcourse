import { useEffect, useState } from "react"
import { toast } from "sonner"
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
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-2xl font-bold">User Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Your search history and saved recommendations
      </p>

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
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No search history yet. Try searching for courses!
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
                        <Badge variant="secondary">
                          {entry.model_used.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
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
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No saved courses yet. Save courses from the recommendation page!
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
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(item.save_id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge variant="outline">
                        {item.difficulty_level}
                      </Badge>
                      <Badge variant="outline">
                        Rating: {item.rating}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Saved: {new Date(item.saved_at).toLocaleString()}
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
