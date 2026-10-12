import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { FeatureFlow, FlowEdge, FlowNode } from './types.ts'
import { validateFlow } from './validate.ts'

const LABEL_W = 116
const COL_W = 260
const NODE_W = 200
const DIAMOND_H = 112
const LANE_PAD = 34
const MIN_NODE_H = 44
const RIGHT_PAD = 16
const CLEARANCE = 6
const CHANNEL_OFFSETS = [0, 10, -10, 20, -20]

type Point = [number, number]
type Port = 'R' | 'L' | 'T' | 'B'
type Box = { node: FlowNode; x0: number; x1: number; y0: number; y1: number; cx: number; cy: number }
type Route = { edge: FlowEdge; key: string; port: Port; points: Point[] }
type Layout = {
  width: number
  height: number
  laneTop: number[]
  laneHeight: number[]
  boxes: Map<string, Box>
  routes: Route[]
}

const chan = (col: number) => LABEL_W + (col + 1) * COL_W

function port(box: Box, side: Port): Point {
  if (side === 'R') return [box.x1, box.cy]
  if (side === 'L') return [box.x0, box.cy]
  if (side === 'T') return [box.cx, box.y0]
  return [box.cx, box.y1]
}

function segmentHits([ax, ay]: Point, [bx, by]: Point, box: Box) {
  const x0 = Math.min(ax, bx)
  const x1 = Math.max(ax, bx)
  const y0 = Math.min(ay, by)
  const y1 = Math.max(ay, by)
  return (
    x1 > box.x0 - CLEARANCE && x0 < box.x1 + CLEARANCE && y1 > box.y0 - CLEARANCE && y0 < box.y1 + CLEARANCE
  )
}

function routeHits(points: Point[], boxes: Box[]) {
  for (let i = 1; i < points.length; i += 1) {
    if (boxes.some((box) => segmentHits(points[i - 1], points[i], box))) return true
  }
  return false
}

function candidates(s: Box, t: Box, ls: number, lt: number, laneTop: number[], loopY: number) {
  const out: { port: Port; points: Point[] }[] = []
  const cs = s.node.col
  const ct = t.node.col
  const decision = s.node.kind === 'decision'
  if (ct > cs) {
    if (ls === lt) out.push({ port: 'R', points: [port(s, 'R'), port(t, 'L')] })
    if (decision && ls !== lt) {
      const side = lt > ls ? 'B' : 'T'
      out.push({ port: side, points: [port(s, side), [s.cx, t.cy], port(t, 'L')] })
    }
    out.push({ port: 'R', points: [port(s, 'R'), [chan(ct - 1), s.cy], [chan(ct - 1), t.cy], port(t, 'L')] })
    out.push({ port: 'R', points: [port(s, 'R'), [chan(cs), s.cy], [chan(cs), t.cy], port(t, 'L')] })
    const yb = ls === lt ? laneTop[ls] + 12 : laneTop[Math.max(ls, lt)]
    out.push({
      port: 'R',
      points: [port(s, 'R'), [chan(cs), s.cy], [chan(cs), yb], [chan(ct - 1), yb], [chan(ct - 1), t.cy], port(t, 'L')],
    })
  } else if (ct === cs) {
    const down = lt > ls
    out.push({ port: down ? 'B' : 'T', points: [port(s, down ? 'B' : 'T'), port(t, down ? 'T' : 'B')] })
    out.push({ port: 'R', points: [port(s, 'R'), [chan(cs), s.cy], [chan(cs), t.cy], port(t, 'R')] })
  } else {
    out.push({ port: 'T', points: [port(s, 'T'), [s.cx, loopY], [t.cx, loopY], port(t, 'T')] })
    out.push({ port: 'R', points: [port(s, 'R'), [chan(cs), s.cy], [chan(cs), loopY], [t.cx, loopY], port(t, 'T')] })
    out.push({ port: 'T', points: [port(s, 'T'), [s.cx, loopY], [chan(ct - 1), loopY], [chan(ct - 1), t.cy], port(t, 'L')] })
    out.push({
      port: 'R',
      points: [port(s, 'R'), [chan(cs), s.cy], [chan(cs), loopY], [chan(ct - 1), loopY], [chan(ct - 1), t.cy], port(t, 'L')],
    })
  }
  return out
}

type ChannelUse = { x: number; y0: number; y1: number; edge: FlowEdge }

function spreadChannels(points: Point[], edge: FlowEdge, used: ChannelUse[], channels: Set<number>) {
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1]
    const b = points[i]
    if (a[0] !== b[0] || !channels.has(a[0])) continue
    const base = a[0]
    const y0 = Math.min(a[1], b[1])
    const y1 = Math.max(a[1], b[1])
    const clash = (x: number) =>
      used.some(
        (use) =>
          use.x === x && use.y1 > y0 && use.y0 < y1 && use.edge.from !== edge.from && use.edge.to !== edge.to,
      )
    const x = base + (CHANNEL_OFFSETS.find((offset) => !clash(base + offset)) ?? 0)
    a[0] = x
    b[0] = x
    used.push({ x, y0, y1, edge })
  }
}

function layoutFlow(flow: FeatureFlow, heights: Record<string, number>): Layout {
  const laneIndex = new Map(flow.lanes.map((lane, index) => [lane.id, index]))
  const nodeHeight = (node: FlowNode) =>
    node.kind === 'decision' ? DIAMOND_H : Math.max(heights[node.id] ?? 64, MIN_NODE_H)
  const laneHeight = flow.lanes.map((lane) => {
    const tallest = Math.max(MIN_NODE_H, ...flow.nodes.filter((node) => node.lane === lane.id).map(nodeHeight))
    return tallest + LANE_PAD * 2
  })
  const laneTop: number[] = []
  laneHeight.reduce((top, height, index) => {
    laneTop[index] = top
    return top + height
  }, 0)
  const height = laneHeight.reduce((sum, h) => sum + h, 0)
  const cols = Math.max(0, ...flow.nodes.map((node) => node.col)) + 1
  const width = LABEL_W + cols * COL_W + RIGHT_PAD

  const boxes = new Map<string, Box>()
  for (const node of flow.nodes) {
    const lane = laneIndex.get(node.lane)
    if (lane === undefined) continue
    const h = nodeHeight(node)
    const x0 = LABEL_W + node.col * COL_W + (COL_W - NODE_W) / 2
    const cy = laneTop[lane] + laneHeight[lane] / 2
    boxes.set(node.id, { node, x0, x1: x0 + NODE_W, y0: cy - h / 2, y1: cy + h / 2, cx: x0 + NODE_W / 2, cy })
  }

  const channels = new Set(Array.from({ length: cols + 1 }, (_, index) => chan(index - 1)))
  const used: ChannelUse[] = []
  const loops = new Map<number, number>()
  const routes: Route[] = []
  flow.edges.forEach((edge, index) => {
    const s = boxes.get(edge.from)
    const t = boxes.get(edge.to)
    if (!s || !t) return
    const ls = laneIndex.get(s.node.lane) as number
    const lt = laneIndex.get(t.node.lane) as number
    const upper = Math.min(ls, lt)
    const loopCount = loops.get(upper) ?? 0
    const back = t.node.col < s.node.col
    if (back) loops.set(upper, loopCount + 1)
    const loopY = laneTop[upper] + 12 + loopCount * 7
    const others = [...boxes.values()].filter((box) => box !== s && box !== t)
    const options = candidates(s, t, ls, lt, laneTop, loopY)
    const chosen = options.find((option) => !routeHits(option.points, others)) ?? options[options.length - 1]
    const points = chosen.points.map((point) => [...point] as Point)
    spreadChannels(points, edge, used, channels)
    routes.push({ edge, key: `${edge.from}-${edge.to}-${index}`, port: chosen.port, points })
  })

  return { width, height, laneTop, laneHeight, boxes, routes }
}

function labelSpot(route: Route, shared: boolean): { x: number; y: number; below: boolean } {
  const [first] = route.points
  if (shared && route.points.length >= 3) {
    const turn = route.points[route.points.length - 2]
    return { x: turn[0] + 8, y: turn[1] - 4, below: false }
  }
  if (route.port === 'B') return { x: first[0] + 7, y: first[1] + 4, below: true }
  return { x: first[0] + 8, y: first[1] - 4, below: false }
}

function NodeTags({ node }: { node: FlowNode }) {
  if (!node.future && !node.undecided) return null
  return (
    <span className="swimlane-tags">
      {node.future ? <span className="swimlane-tag" data-tag="future">Tương lai</span> : null}
      {node.undecided ? <span className="swimlane-tag" data-tag="undecided">Chưa chốt</span> : null}
    </span>
  )
}

export function SwimlaneFlow({ flow }: { flow: FeatureFlow }) {
  const [heights, setHeights] = useState<Record<string, number>>({})
  const nodeRefs = useRef(new Map<string, HTMLElement>())
  const errors = useMemo(() => (import.meta.env.DEV ? validateFlow(flow) : []), [flow])
  const layout = useMemo(() => layoutFlow(flow, heights), [flow, heights])
  const laneColor = new Map(flow.lanes.map((lane) => [lane.id, lane.color]))

  useLayoutEffect(() => {
    const measure = () => {
      const next: Record<string, number> = {}
      nodeRefs.current.forEach((element, id) => {
        next[id] = element.offsetHeight
      })
      setHeights((current) =>
        Object.keys(next).every((id) => current[id] === next[id]) &&
        Object.keys(current).length === Object.keys(next).length
          ? current
          : next,
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    nodeRefs.current.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [flow])

  const portCount = new Map<string, number>()
  for (const route of layout.routes) {
    const key = `${route.edge.from}:${route.port}`
    portCount.set(key, (portCount.get(key) ?? 0) + 1)
  }
  const markerId = `swimlane-arrow-${flow.id}`

  return (
    <figure className="swimlane" aria-label={`${flow.title}, đọc từ trái sang phải`}>
      <figcaption className="swimlane-title">{flow.title}</figcaption>
      {errors.length > 0 ? (
        <div className="swimlane-errors" role="alert">
          <strong>Flow "{flow.id}" chưa hợp lệ</strong>
          <ul>
            {errors.map((error, index) => (
              <li key={`${index}-${error}`}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="swimlane-scroll">
        <div className="swimlane-board" style={{ width: layout.width, height: layout.height }}>
          {flow.lanes.map((lane, index) => (
            <div
              className="swimlane-lane"
              key={lane.id}
              style={{ height: layout.laneHeight[index], '--lane': lane.color } as CSSProperties}
            >
              <div className="swimlane-lane-label" style={{ width: LABEL_W }}>
                {lane.label}
              </div>
            </div>
          ))}
          <svg className="swimlane-edges" width={layout.width} height={layout.height} aria-hidden="true">
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="9"
                markerHeight="9"
                markerUnits="userSpaceOnUse"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" />
              </marker>
            </defs>
            {layout.routes.map((route) => (
              <polyline
                key={route.key}
                points={route.points.map(([x, y]) => `${x},${y}`).join(' ')}
                markerEnd={`url(#${markerId})`}
              />
            ))}
          </svg>
          {flow.nodes.map((node) => {
            const box = layout.boxes.get(node.id)
            if (!box) return null
            return (
              <div
                key={node.id}
                ref={(element) => {
                  if (element) nodeRefs.current.set(node.id, element)
                  else nodeRefs.current.delete(node.id)
                }}
                className={`swimlane-node is-${node.kind}`}
                data-node={node.id}
                data-future={node.future ? 'true' : undefined}
                style={
                  { left: box.x0, top: box.cy, width: NODE_W, '--lane': laneColor.get(node.lane) } as CSSProperties
                }
              >
                {node.kind === 'decision' ? (
                  <svg className="swimlane-diamond" viewBox={`0 0 ${NODE_W} ${DIAMOND_H}`} aria-hidden="true">
                    <polygon
                      points={`${NODE_W / 2},1 ${NODE_W - 1},${DIAMOND_H / 2} ${NODE_W / 2},${DIAMOND_H - 1} 1,${DIAMOND_H / 2}`}
                    />
                  </svg>
                ) : null}
                <NodeTags node={node} />
                <p className="swimlane-node-label">{node.label}</p>
                {node.note ? <p className="swimlane-node-note">{node.note}</p> : null}
              </div>
            )
          })}
          {layout.routes.map((route) => {
            if (!route.edge.label) return null
            const spot = labelSpot(route, (portCount.get(`${route.edge.from}:${route.port}`) ?? 0) > 1)
            return (
              <span
                key={route.key}
                className="swimlane-edge-label"
                data-below={spot.below ? 'true' : undefined}
                style={{ left: spot.x, top: spot.y }}
              >
                {route.edge.label}
              </span>
            )
          })}
        </div>
      </div>
    </figure>
  )
}
