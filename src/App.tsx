import { useEffect, useState } from 'react'
import { subscribeToComments } from './firebase/comments'
import { LineRow } from './plan/LineRow'
import { NoteGrid } from './plan/NoteGrid'
import { AiForecastPage } from './plan/AiForecastPage'
import { ExtracurricularPage } from './plan/ExtracurricularPage'
import { plan } from './plan/sections'
import { TableBlock } from './plan/TableBlock'
import type { Comment, PlanText } from './types'

function scrollToAnchor(hash: string) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (target) target.scrollIntoView()
  else window.scrollTo(0, 0)
}

function commentsForLine(comments: Comment[], line: PlanText) {
  return comments.filter(
    (comment) => comment.anchorId === line.id || (comment.anchorId == null && comment.sectionId === line.id),
  )
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return subscribeToComments(setComments, (loadError) => setError(loadError.message))
  }, [])

  useEffect(() => {
    if (path === '/' && window.location.hash) scrollToAnchor(window.location.hash)
  }, [path])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as HTMLElement).closest('a')
      const href = anchor?.getAttribute('href')
      if (!anchor || !href || anchor.target === '_blank') return
      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      window.history.pushState(null, '', url.pathname + url.hash)
      setPath(url.pathname)
      if (url.hash) scrollToAnchor(url.hash)
      else window.scrollTo(0, 0)
    }
    const onPop = () => setPath(window.location.pathname)
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  if (path === '/ai-du-bao') return <AiForecastPage />
  if (path === '/ngoai-khoa') return <ExtracurricularPage />

  return (
    <main className="page">
      <div className="doc">
        <header className="page-head">
          <h1>{plan.title}</h1>
        </header>
        {error && <p className="error">{error}</p>}
        {plan.lines.map((block) =>
          block.kind === 'table' ? (
            <TableBlock key={block.id} table={block} comments={comments} />
          ) : block.kind === 'notes' ? (
            <NoteGrid key={block.id} block={block} comments={comments} />
          ) : (
            <LineRow key={block.id} line={block} comments={commentsForLine(comments, block)} />
          ),
        )}
      </div>
    </main>
  )
}
