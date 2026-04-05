export interface Course {
  course_id: number
  course_title: string
  university: string
  department: string
  difficulty: string
  rating: number
  description: string
  relevance_score: number
}

export interface RecommendResponse {
  query: string
  model: string
  results: Course[]
  tfidf_results?: Course[]
  neural_results?: Course[]
  timestamp: string
}

export interface HistoryEntry {
  search_id: number
  user_id: number
  query_text: string
  model_used: string
  timestamp: string
}

export interface SavedRecommendation {
  save_id: number
  user_id: number
  course_id: number
  title: string
  university: string
  difficulty_level: string
  rating: number
  description: string
  saved_at: string
}
