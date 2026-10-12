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

export type RoadmapAssignment = {
  text: string
  format: string
}

export type RoadmapStep = {
  id: string
  number: string
  name: string
  window: [number, number]
  goal: string
  does: string
  output: string
  assignments: RoadmapAssignment[]
  timing: string
  checker: string
  unlock: string
  handbook: string
}

export type RoadmapStage = {
  id: string
  name: string
  opens: string
  tone: 'apply' | 'depart' | 'settle'
  steps: RoadmapStep[]
}

export type PlanRoadmap = {
  id: string
  sectionId: string
  kind: 'roadmap'
  stats: { value: string; label: string }[]
  axis: { from: number; to: number; bay: number; note: string }
  stages: RoadmapStage[]
}

export type PlanBlock = PlanText | PlanTable | PlanNotes | PlanRoadmap

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
