import type { FeatureFlow } from './types.ts'

export function validateFlow(flow: FeatureFlow): string[] {
  const errors: string[] = []
  const laneIds = new Set(flow.lanes.map((lane) => lane.id))
  const nodes = new Map(flow.nodes.map((node) => [node.id, node]))
  const out = new Map<string, string[]>()
  const into = new Map<string, string[]>()

  if (nodes.size !== flow.nodes.length) errors.push('Có node trùng id.')

  const cells = new Map<string, string>()
  for (const node of flow.nodes) {
    if (!laneIds.has(node.lane)) errors.push(`Node "${node.id}" dùng lane không tồn tại "${node.lane}".`)
    if (!Number.isInteger(node.col) || node.col < 0) errors.push(`Node "${node.id}" có col không hợp lệ (${node.col}).`)
    const cell = `${node.lane}:${node.col}`
    const taken = cells.get(cell)
    if (taken) errors.push(`Node "${taken}" và "${node.id}" cùng lane "${node.lane}", col ${node.col}.`)
    else cells.set(cell, node.id)
    out.set(node.id, [])
    into.set(node.id, [])
  }

  for (const edge of flow.edges) {
    const missing = [edge.from, edge.to].filter((id) => !nodes.has(id))
    if (missing.length > 0) {
      errors.push(`Edge ${edge.from} → ${edge.to} trỏ tới node không tồn tại: ${missing.join(', ')}.`)
      continue
    }
    out.get(edge.from)?.push(edge.to)
    into.get(edge.to)?.push(edge.from)
  }

  const starts = flow.nodes.filter((node) => node.kind === 'start')
  const ends = flow.nodes.filter((node) => node.kind === 'end')
  if (starts.length === 0) errors.push('Thiếu node start.')
  if (ends.length === 0) errors.push('Thiếu node end.')

  for (const node of flow.nodes) {
    const outgoing = flow.edges.filter((edge) => edge.from === node.id && nodes.has(edge.to))
    if (node.kind === 'end' && outgoing.length > 0) errors.push(`Node end "${node.id}" không được có edge đi ra.`)
    if (node.kind !== 'end' && outgoing.length === 0) errors.push(`Node "${node.id}" là ngõ cụt (không có edge đi ra).`)
    if (node.kind === 'decision') {
      if (outgoing.length < 2) errors.push(`Decision "${node.id}" cần ít nhất 2 edge đi ra.`)
      for (const edge of outgoing) {
        if (!edge.label?.trim()) errors.push(`Edge ${edge.from} → ${edge.to} từ decision cần label.`)
      }
    }
  }

  const walk = (seeds: string[], next: Map<string, string[]>) => {
    const seen = new Set(seeds)
    const queue = [...seeds]
    while (queue.length > 0) {
      const id = queue.shift() as string
      for (const other of next.get(id) ?? []) {
        if (seen.has(other)) continue
        seen.add(other)
        queue.push(other)
      }
    }
    return seen
  }

  const reached = walk(starts.map((node) => node.id), out)
  const reachesEnd = walk(ends.map((node) => node.id), into)
  for (const node of flow.nodes) {
    if (starts.length > 0 && !reached.has(node.id)) errors.push(`Node "${node.id}" không đi tới được từ start.`)
    if (ends.length > 0 && !reachesEnd.has(node.id)) errors.push(`Node "${node.id}" không đi tới được end nào.`)
  }

  return errors
}
