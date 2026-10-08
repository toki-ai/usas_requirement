import type { CSSProperties } from 'react'
import { LineRow } from './LineRow'
import type { Comment, PlanTable } from '../types'

type TableBlockProps = {
  table: PlanTable
  comments: Comment[]
}

function commentsForRow(comments: Comment[], rowId: string) {
  return comments.filter((comment) => comment.anchorId === rowId)
}

export function TableBlock({ table, comments }: TableBlockProps) {
  return (
    <div className="plan-table" style={{ '--cols': table.columns.length } as CSSProperties}>
      <div className="line table-head">
        <div className="line-body">
          <div className="cells">
            {table.columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>
          <span className="icon-gap" aria-hidden="true" />
        </div>
        <div />
      </div>
      {table.rows.map((row) => (
        <LineRow
          key={row.id}
          line={{ id: row.id, sectionId: table.sectionId, kind: 'text', text: row.cells[0] ?? row.id }}
          cells={row.cells}
          comments={commentsForRow(comments, row.id)}
        />
      ))}
    </div>
  )
}
