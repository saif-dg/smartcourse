import type {
  HistoryEntry,
  RecommendResponse,
  SavedRecommendation,
} from "./types"

const BASE = "/api"

export async function fetchRecommendations(
  query: string,
  model: string,
  topK = 10
): Promise<RecommendResponse> {
  const res = await fetch(`${BASE}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, model, top_k: topK }),
  })
  if (!res.ok) throw new Error("Failed to fetch recommendations")
  return res.json()
}

export async function fetchHistory(): Promise<HistoryEntry[]> {
  const res = await fetch(`${BASE}/history`)
  if (!res.ok) throw new Error("Failed to fetch history")
  const data = await res.json()
  return data.history
}

export async function saveCourse(courseId: number): Promise<{ id: number }> {
  const res = await fetch(`${BASE}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course_id: courseId }),
  })
  if (!res.ok) throw new Error("Failed to save course")
  return res.json()
}

export async function fetchSaved(): Promise<SavedRecommendation[]> {
  const res = await fetch(`${BASE}/saved`)
  if (!res.ok) throw new Error("Failed to fetch saved")
  const data = await res.json()
  return data.saved
}

export async function deleteSaved(saveId: number): Promise<void> {
  const res = await fetch(`${BASE}/saved/${saveId}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete saved")
}
