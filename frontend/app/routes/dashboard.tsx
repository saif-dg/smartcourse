import { useEffect, useState } from "react"
import { LayoutDashboard, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
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
      <div className="flex items-center justify-center px-6 py-28">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald border-t-transparent" />
          <p className="text-sm text-[#8899aa]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center gap-3">
        <div className="icon-box icon-box-dark">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-sm text-[#8899aa]">
            Your search history and saved recommendations
          </p>
        </div>
      </div>

      <Tabs defaultValue="history" className="mt-6">
        <TabsList className="border border-[#1e3a54] bg-navy-light">
          <TabsTrigger value="history">
            Search History ({history.length})
          </TabsTrigger>
          <TabsTrigger value="saved">
            Saved Courses ({saved.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#1e3a54] py-16 text-center">
              <p className="text-[#8899aa]">No search history yet.</p>
              <p className="text-sm text-[#5a6a7a]">
                Try searching for courses to get started!
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#1e3a54] bg-navy-card">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#1e3a54] hover:bg-transparent">
                    <TableHead className="font-heading font-semibold text-white">
                      Query
                    </TableHead>
                    <TableHead className="font-heading font-semibold text-white">
                      Model
                    </TableHead>
                    <TableHead className="font-heading font-semibold text-white">
                      Timestamp
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((entry, i) => (
                    <TableRow
                      key={entry.search_id}
                      className="animate-fade-up border-[#1e3a54] hover:bg-navy-light/50"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <TableCell className="font-medium text-white">
                        {entry.query_text}
                      </TableCell>
                      <TableCell>
                        <Badge className="border-0 bg-emerald/10 font-mono text-xs text-emerald">
                          {entry.model_used.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="tabular-nums text-[#8899aa]">
                        {new Date(entry.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-5">
          {saved.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#1e3a54] py-16 text-center">
              <p className="text-[#8899aa]">No saved courses yet.</p>
              <p className="text-sm text-[#5a6a7a]">
                Save courses from the recommendation page!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {saved.map((item, i) => (
                <div
                  key={item.save_id}
                  className="animate-fade-up service-card rounded-2xl border border-[#1e3a54] bg-navy-card p-5 transition-all hover:border-emerald/30"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#8899aa]">
                        {item.university}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-[#8899aa] hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => handleDelete(item.save_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge
                      variant="outline"
                      className="border-[#1e3a54] text-[#8899aa]"
                    >
                      {item.difficulty_level}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-amber/30 text-amber"
                    >
                      Rating: {item.rating}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#8899aa]">
                    {item.description}
                  </p>
                  <p className="mt-3 text-xs tabular-nums text-[#5a6a7a]">
                    Saved {new Date(item.saved_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
