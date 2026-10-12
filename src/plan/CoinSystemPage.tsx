import { withBase } from '../basePath'
import type { Comment, PlanText } from '../types'
import { coinSystem } from './coinSystem'
import { LineRow } from './LineRow'
import { TableBlock } from './TableBlock'
import { TableOfContents, type TocItem } from './TableOfContents'

const toc: TocItem[] = coinSystem.lines
  .filter((block): block is PlanText => block.kind === 'heading')
  .map((heading) => ({
    id: heading.id,
    label: heading.text,
    depth: heading.id === 'coin' ? 0 : 1,
  }))

function commentsForLine(comments: Comment[], line: PlanText) {
  return comments.filter(
    (comment) => comment.anchorId === line.id || (comment.anchorId == null && comment.sectionId === line.id),
  )
}

export function CoinSystemPage({ comments }: { comments: Comment[] }) {
  return (
    <main className="page has-toc coin-system">
      <TableOfContents items={toc} />
      <div className="doc">
        <a className="back" href={withBase('/#dong-tien-coin')}>
          ← Về bảng dòng tiền
        </a>
        {coinSystem.lines.map((block) =>
          block.kind === 'table' ? (
            <TableBlock key={block.id} table={block} comments={comments} />
          ) : (
            <LineRow key={block.id} line={block} comments={commentsForLine(comments, block)} />
          ),
        )}
      </div>
    </main>
  )
}
