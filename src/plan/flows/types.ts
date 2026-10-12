export type FlowLane = { id: string; label: string; color: string }
export type FlowNodeKind = 'start' | 'action' | 'decision' | 'end'
export type FlowNode = {
  id: string
  lane: string // FlowLane.id
  col: number // 0-based column, left to right
  kind: FlowNodeKind
  label: string // short Vietnamese action, not a screen name
  note?: string // optional small second line
  future?: boolean // planned feature, render dashed + small "Tương lai" tag
  undecided?: boolean // product owner not decided, render a small "Chưa chốt" tag
}
export type FlowEdge = { from: string; to: string; label?: string }
export type FeatureFlow = { id: string; title: string; lanes: FlowLane[]; nodes: FlowNode[]; edges: FlowEdge[] }

export const ROLE_COLORS = {
  hocSinh: '#2563eb',
  mentor: '#0f766e',
  admin: '#9f1239',
  heThong: '#6b7280',
  tutor: '#b45309',
  sales: '#7c3aed',
  staffNoiDung: '#0e7490',
} as const

export const ROLE_LANES = {
  hocSinh: { id: 'hoc-sinh', label: 'Học sinh', color: ROLE_COLORS.hocSinh },
  mentor: { id: 'mentor', label: 'Mentor', color: ROLE_COLORS.mentor },
  admin: { id: 'admin', label: 'Admin', color: ROLE_COLORS.admin },
  heThong: { id: 'he-thong', label: 'Hệ thống', color: ROLE_COLORS.heThong },
  tutor: { id: 'tutor', label: 'Tutor', color: ROLE_COLORS.tutor },
  sales: { id: 'sales', label: 'Sales', color: ROLE_COLORS.sales },
  staffNoiDung: { id: 'staff-noi-dung', label: 'Staff nội dung', color: ROLE_COLORS.staffNoiDung },
} as const satisfies Record<keyof typeof ROLE_COLORS, FlowLane>
