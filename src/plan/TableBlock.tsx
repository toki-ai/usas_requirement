import { Fragment, useState, type CSSProperties } from 'react'
import { LineRow } from './LineRow'
import { RichText } from './RichText'
import type { Comment, PlanTable } from '../types'

type TableBlockProps = {
  table: PlanTable
  comments: Comment[]
  fullWidth?: boolean
}

function commentsForRow(comments: Comment[], rowId: string) {
  return comments.filter((comment) => comment.anchorId === rowId)
}

export function TableBlock({ table, comments, fullWidth }: TableBlockProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  return (
    <div className={fullWidth ? 'plan-table full' : 'plan-table'} style={{ '--cols': table.columns.length } as CSSProperties}>
      <div className="line table-head">
        <div className="line-body">
          <div className="cells">
            {table.columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>
          <span className="icon-gap" aria-hidden="true" />
        </div>
        {fullWidth ? null : <div />}
      </div>
      {table.rows.map((row) => {
        const details = row.details ?? []
        const expanded = open[row.id] === true
        const stageName = row.cells[0] ?? row.id
        return (
          <Fragment key={row.id}>
            <LineRow
              line={{ id: row.id, sectionId: table.sectionId, kind: 'text', text: stageName }}
              cells={row.cells}
              comments={commentsForRow(comments, row.id)}
              toggle={
                details.length > 0
                  ? {
                      expanded,
                      label: `${expanded ? 'Thu gọn' : 'Mở'} việc của ${stageName}`,
                      onToggle: () => setOpen((current) => ({ ...current, [row.id]: !current[row.id] })),
                    }
                  : undefined
              }
            />
            {expanded
              ? details.map((detail) => (
                  <div key={detail.id} className="line table-detail" id={detail.id}>
                    <div className="line-body">
                      <div className="cells">
                        {detail.cells.map((cell, index) => (
                          <span key={index} className={index === 0 ? 'detail-name' : undefined}>
                            <RichText text={cell} />
                          </span>
                        ))}
                      </div>
                      <span className="icon-gap" aria-hidden="true" />
                    </div>
                    {fullWidth ? null : <div />}
                  </div>
                ))
              : null}
          </Fragment>
        )
      })}
    </div>
  )
}
