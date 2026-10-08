export type CommentStatus = 'open' | 'resolved' | 'deleted'

export type PlanText = {
  id: string
  sectionId: string
  kind: 'heading' | 'text'
  text: string
}

export type PlanTable = {
  id: string
  sectionId: string
  kind: 'table'
  columns: string[]
  rows: { id: string; cells: string[] }[]
}

export type PlanNote = {
  id: string
  title: string
  badge?: string
  items: string[]
  departments?: { name: string; items: string[] }[]
}

export type PlanNotes = {
  id: string
  sectionId: string
  kind: 'notes'
  notes: PlanNote[]
}

export type PlanBlock = PlanText | PlanTable | PlanNotes

export type Comment = {
  id: string
  sectionId: string
  anchorId: string | null
  parentId: string | null
  authorName: string
  body: string
  status: CommentStatus
  createdAt: Date | null
}

export type NewComment = {
  sectionId: string
  anchorId: string | null
  parentId: string | null
  authorName: string
  body: string
}
