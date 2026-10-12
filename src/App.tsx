import { Fragment, useEffect, useState } from 'react'
import { subscribeToComments } from './firebase/comments'
import { LineRow } from './plan/LineRow'
import { NoteGrid } from './plan/NoteGrid'
import { JourneyRoadmap } from './plan/JourneyRoadmap'
import { FeatureFolds, section3Features } from './plan/FeatureFolds'
import { AiForecastPage } from './plan/AiForecastPage'
import { ExtracurricularPage } from './plan/ExtracurricularPage'
import { CoinPackPage } from './plan/CoinPackPage'
import { CoinSystemPage } from './plan/CoinSystemPage'
import { PackagePage } from './plan/PackagePage'
import { TierPreviewPage } from './plan/TierPreviewPage'
import { appPath, withBase } from './basePath'
import { plan } from './plan/sections'
import { lastUpdated } from './plan/updated'
import { TableOfContents, type TocItem } from './plan/TableOfContents'
import { TableBlock } from './plan/TableBlock'
import type { Comment, PlanBlock, PlanText } from './types'

function isHeading(block: PlanBlock): block is PlanText {
  return block.kind === 'heading'
}

const planToc: TocItem[] = plan.lines.filter(isHeading).map((heading) => ({
  id: heading.id,
  label: heading.text,
  depth: /^\d+\./.test(heading.text) ? 0 : 1,
}))

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

const featureGroups = section3Features(plan.lines)
const featureInnerIds = new Set([...featureGroups.values()].flatMap((group) => group.body.map((block) => block.id)))

export default function App() {
  const [path, setPath] = useState(() => appPath())
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
      const url = new URL(withBase(href), window.location.origin)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      window.history.pushState(null, '', url.pathname + url.hash)
      setPath(appPath(url.pathname))
      if (url.hash) scrollToAnchor(url.hash)
      else window.scrollTo(0, 0)
    }
    const onPop = () => setPath(appPath())
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  if (path === '/ai-du-bao') return <AiForecastPage />
  if (path === '/ngoai-khoa') return <ExtracurricularPage />
  if (path === '/package-tron-goi') return <PackagePage />
  if (path === '/goi-coin') return <CoinPackPage />
  if (path === '/he-thong-coin') return <CoinSystemPage comments={comments} />
  if (path === '/tier-preview') return <TierPreviewPage />

  return (
    <main className="page has-toc">
      <TableOfContents items={planToc} />
      <div className="doc">
        <header className="page-head">
          <div>
            <h1>{plan.title}</h1>
            <p className="last-updated">
              Last updated: {lastUpdated.at} by{' '}
              <a href={`https://github.com/${lastUpdated.by}`}>{lastUpdated.by}</a>
            </p>
          </div>
        </header>
        {error && <p className="error">{error}</p>}
        {plan.lines.map((block) => {
          if (featureInnerIds.has(block.id)) return null
          if (block.kind === 'table') {
            return <TableBlock key={block.id} table={block} comments={comments} />
          }
          if (block.kind === 'notes') return <NoteGrid key={block.id} block={block} comments={comments} />
          if (block.kind === 'roadmap') return <JourneyRoadmap key={block.id} block={block} comments={comments} />
          const row = <LineRow key={block.id} line={block} comments={commentsForLine(comments, block)} />
          if (block.kind === 'heading') {
            const group = featureGroups.get(block.id)
            if (group) {
              return (
                <Fragment key={block.id}>
                  {row}
                  <FeatureFolds
                    featureId={block.id}
                    body={group.body}
                    comments={comments}
                    screens={block.text.startsWith('a. Student journey')}
                  />
                </Fragment>
              )
            }
          }
          return row
        })}
      </div>
    </main>
  )
}
