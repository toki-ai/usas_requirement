import { useState } from 'react'
import type { Comment, PlanBlock, PlanText } from '../types'
import { featureFlows } from './flows/registry'
import { SwimlaneFlow } from './flows/SwimlaneFlow'
import { LineRow } from './LineRow'
import { NoteGrid } from './NoteGrid'
import { featurePreviews } from './previews/registry'
import { TableBlock } from './TableBlock'

export type FeatureGroup = {
  body: PlanBlock[]
}

export function section3Features(lines: PlanBlock[]) {
  const groups = new Map<string, FeatureGroup>()
  let current: string | null = null
  let inSection = false
  for (const block of lines) {
    if (block.kind === 'heading' && block.text.startsWith('3.')) {
      inSection = true
      current = null
      continue
    }
    if (!inSection) continue
    if (block.kind === 'heading' && /^\d+\./.test(block.text)) break
    if (block.kind === 'heading' && /^[a-g]\./.test(block.text)) {
      current = block.id
      groups.set(current, { body: [] })
      continue
    }
    if (!current) continue
    groups.get(current)?.body.push(block)
  }
  return groups
}

function commentsForLine(comments: Comment[], line: PlanText) {
  return comments.filter(
    (comment) => comment.anchorId === line.id || (comment.anchorId == null && comment.sectionId === line.id),
  )
}

function FoldToggle({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="line feature-fold">
      <div className="line-body">
        <button type="button" className="fold-toggle" aria-expanded={open} onClick={onToggle}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M7.5 5.2 12.3 10 7.5 14.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {label}
        </button>
      </div>
    </div>
  )
}

function EmptyNote() {
  return (
    <div className="line feature-fold-body">
      <p className="fold-empty">Chưa có</p>
    </div>
  )
}

function FeatureBlock({ block, comments }: { block: PlanBlock; comments: Comment[] }) {
  if (block.kind === 'table') return <TableBlock table={block} comments={comments} />
  if (block.kind === 'notes') return <NoteGrid block={block} comments={comments} />
  if (block.kind === 'text' || block.kind === 'heading') {
    return <LineRow line={block} comments={commentsForLine(comments, block)} />
  }
  return null
}

export function FeatureFolds({
  featureId,
  body,
  comments,
}: {
  featureId: string
  body: PlanBlock[]
  comments: Comment[]
  screens?: boolean
}) {
  const [flowOpen, setFlowOpen] = useState(false)
  const flows = featureFlows[featureId] ?? []
  const [previewOpen, setPreviewOpen] = useState(false)
  const previews = featurePreviews[featureId] ?? []

  return (
    <div className="feature-folds" data-feature={featureId}>
      <FoldToggle label="User flow" open={flowOpen} onToggle={() => setFlowOpen((open) => !open)} />
      {flowOpen && (
        <>
          {body.map((block) => (
            <FeatureBlock key={block.id} block={block} comments={comments} />
          ))}
          {flows.length > 0 ? (
            <div className="line feature-fold-body">
              <div className="fold-panel">
                {flows.map((flow) => (
                  <SwimlaneFlow key={flow.id} flow={flow} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyNote />
          )}
        </>
      )}
      <FoldToggle label="UI preview" open={previewOpen} onToggle={() => setPreviewOpen((open) => !open)} />
      {previewOpen &&
        (previews.length > 0 ? (
          previews.map(({ line, mock }) => (
            <LineRow key={line.id} line={line} comments={commentsForLine(comments, line)} screen below={mock} />
          ))
        ) : (
          <EmptyNote />
        ))}
    </div>
  )
}
