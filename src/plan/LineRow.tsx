import { useState, type FormEvent, type ReactNode } from 'react'
import { addComment } from '../firebase/comments'
import type { Comment, PlanText } from '../types'
import { CommentThread } from './CommentThread'
import { RichText } from './RichText'

type LineRowProps = {
  line: PlanText
  comments: Comment[]
  cells?: string[]
  toggle?: {
    expanded: boolean
    label: string
    onToggle: () => void
  }
  below?: ReactNode
  screen?: boolean
}

export function LineRow({ line, comments, cells, toggle, below, screen }: LineRowProps) {
  const [body, setBody] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [composing, setComposing] = useState(false)
  const [commentFocused, setCommentFocused] = useState(false)
  const visibleCount = comments.filter((comment) => comment.status !== 'deleted').length
  const hasOpenComment = comments.some((comment) => comment.parentId == null && comment.status === 'open')
  const showThread = visibleCount > 0 || composing || error !== null

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await addComment({
        sectionId: line.sectionId,
        anchorId: line.id,
        parentId: null,
        authorName: '',
        body,
      })
      setBody('')
      setComposing(false)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the comment.')
    } finally {
      setSaving(false)
    }
  }

  const headingLevel =
    line.kind === 'heading' ? (/^\d+\./.test(line.text) ? 'heading-main' : 'heading-sub') : ''

  const lineBody = (
      <div className="line-body">
        {cells ? (
          <div className="cells">
            {cells.map((cell, index) => (
              <span key={index} className={index === 0 && toggle ? 'cell-with-toggle' : undefined}>
                {index === 0 && toggle ? (
                  <button
                    type="button"
                    className="row-toggle"
                    aria-expanded={toggle.expanded}
                    aria-label={toggle.label}
                    onClick={toggle.onToggle}
                  >
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
                  </button>
                ) : null}
                {index === 0 && toggle ? (
                  <span className="cell-copy">
                    <RichText text={cell} />
                  </span>
                ) : (
                  <RichText text={cell} />
                )}
              </span>
            ))}
          </div>
        ) : (
          <div className="line-copy">
            {line.kind === 'heading' ? (
              <h2>{line.text}</h2>
            ) : screen ? (
              <h3 className="screen-title">{line.text}</h3>
            ) : (
              <p><RichText text={line.text} /></p>
            )}
          </div>
        )}
        <button
          type="button"
          className={hasOpenComment ? 'add-comment has-open-comment' : 'add-comment'}
          aria-label={`Add comment on ${cells?.[0] ?? line.text}`}
          aria-expanded={composing}
          onClick={() => setComposing((open) => !open)}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4 4.5h8.2A2.3 2.3 0 0 1 14.5 6.8V11a2.3 2.3 0 0 1-2.3 2.3H8l-2.6 2.2v-2.2H4A2.3 2.3 0 0 1 1.7 11V6.8A2.3 2.3 0 0 1 4 4.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M15.2 8.2h2.1M16.25 7.15v2.1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
  )

  return (
    <div
      className={`line ${line.kind}${headingLevel ? ` ${headingLevel}` : ''}${screen ? ' screen-line' : ''}${commentFocused ? ' comment-focused' : ''}`}
      data-section-id={line.sectionId}
      data-line-id={line.id}
      id={line.id}
    >
      {below ? (
        <div className="line-stack">
          {lineBody}
          <div className="line-below">{below}</div>
        </div>
      ) : (
        lineBody
      )}

      <div className="line-comments">
        {showThread && (
          <>
            <CommentThread comments={comments} onFocusChange={setCommentFocused} />

            {composing && (
              <form className="comment-card composer" onSubmit={onSubmit}>
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  rows={3}
                  placeholder="Add a comment"
                  aria-label="Comment"
                  required
                />
                <button type="submit" disabled={saving || body.trim().length === 0}>
                  {saving ? 'Saving…' : 'Comment'}
                </button>
              </form>
            )}
            {error && <p className="error">{error}</p>}
          </>
        )}
      </div>
    </div>
  )
}
