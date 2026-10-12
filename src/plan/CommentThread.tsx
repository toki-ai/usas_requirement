import { useEffect, useRef, useState, type FocusEvent, type FormEvent, type KeyboardEvent, type MouseEvent } from 'react'
import { addComment, setCommentStatus, updateCommentBody } from '../firebase/comments'
import type { Comment } from '../types'

function formatWhen(date: Date | null) {
  if (!date) return 'Just now'
  const minutes = Math.round((Date.now() - date.getTime()) / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString()
}

function isFormControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest('button, input, textarea, select, a, label'))
}

function stop(event: { stopPropagation: () => void }) {
  event.stopPropagation()
}

function rootOf(comment: Comment, byId: Map<string, Comment>) {
  let current = comment
  const seen = new Set<string>()
  while (current.parentId && !seen.has(current.id)) {
    const parent = byId.get(current.parentId)
    if (!parent) break
    seen.add(current.id)
    current = parent
  }
  return current
}

function AnswerRow({
  item,
  onKeepFocus,
  onExpandedChange,
}: {
  item: Comment
  onKeepFocus: () => void
  onExpandedChange: (expanded: boolean) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(item.body)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!editing) return
    textareaRef.current?.focus({ preventScroll: true })
  }, [editing])

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await updateCommentBody(item.id, draft)
      onKeepFocus()
      setEditing(false)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not update the answer.')
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <form className="composer answer-composer" onSubmit={onSave} onMouseDown={stop} onClick={stop}>
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={2}
          aria-label="Edit answer"
          required
        />
        <div className="composer-actions">
          <button type="submit" disabled={saving || draft.trim().length === 0}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            className="resolve"
            onMouseDown={stop}
            onClick={(event) => {
              stop(event)
              setDraft(item.body)
              setError(null)
              onKeepFocus()
              setEditing(false)
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="resolve"
            onMouseDown={stop}
            onClick={(event) => {
              stop(event)
              onKeepFocus()
              void setCommentStatus(item.id, 'deleted').catch((deleteError) => {
                setError(deleteError instanceof Error ? deleteError.message : 'Could not delete the answer.')
              })
            }}
          >
            Delete
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    )
  }

  return (
    <p className="comment-answer">
      <button
        type="button"
        className="comment-answer-pen"
        aria-label="Edit answer"
        onMouseDown={(event) => {
          stop(event)
          event.preventDefault()
        }}
        onClick={(event) => {
          stop(event)
          setDraft(item.body)
          setError(null)
          setEditing(true)
          onExpandedChange(true)
        }}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M12.2 3.6 16.4 7.8 7.1 17.1 3 18l.9-4.1 8.3-10.3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M11 4.8 15.2 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      <span>{item.body}</span>
    </p>
  )
}

function CommentCard({
  comment,
  answers,
  expanded,
  onExpandedChange,
}: {
  comment: Comment
  answers: Comment[]
  expanded: boolean
  onExpandedChange: (expanded: boolean) => void
}) {
  const cardRef = useRef<HTMLElement>(null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(comment.body)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [answering, setAnswering] = useState(false)
  const [answer, setAnswer] = useState('')
  const [answerSaving, setAnswerSaving] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)
  const resolved = comment.status === 'resolved'
  const visibleAnswers = answers.filter((item) => item.status !== 'deleted')

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await updateCommentBody(comment.id, draft)
      setEditing(false)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not update the comment.')
    } finally {
      setSaving(false)
    }
  }

  async function onAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAnswerSaving(true)
    setAnswerError(null)
    try {
      await addComment({
        sectionId: comment.sectionId,
        anchorId: comment.anchorId,
        parentId: comment.id,
        authorName: '',
        body: answer,
      })
      setAnswer('')
      setAnswering(false)
    } catch (saveError) {
      setAnswerError(saveError instanceof Error ? saveError.message : 'Could not save the answer.')
    } finally {
      setAnswerSaving(false)
    }
  }

  function onClick(event: MouseEvent<HTMLElement>) {
    if (isFormControl(event.target) && event.target !== event.currentTarget) return
    event.currentTarget.focus({ preventScroll: true })
    onExpandedChange(true)
  }

  function onFocus() {
    onExpandedChange(true)
  }

  function onBlur(event: FocusEvent<HTMLElement>) {
    const next = event.relatedTarget
    if (next instanceof Node && event.currentTarget.contains(next)) return
    onExpandedChange(false)
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onExpandedChange(true)
  }

  if (editing) {
    return (
      <form className="comment-card composer" onSubmit={onSave} onMouseDown={stop} onClick={stop}>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          aria-label="Edit comment"
          required
        />
        <div className="composer-actions">
          <button type="submit" disabled={saving || draft.trim().length === 0}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            className="resolve"
            onMouseDown={stop}
            onClick={(event) => {
              stop(event)
              setDraft(comment.body)
              setEditing(false)
            }}
          >
            Cancel
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    )
  }

  return (
    <article
      ref={cardRef}
      className={resolved ? `comment-card resolved${expanded ? ' expanded' : ''}` : `comment-card${expanded ? ' expanded' : ''}`}
      tabIndex={0}
      aria-expanded={expanded}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      {resolved && (
        <svg className="comment-check" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3.2 8.3 6.4 11.5 12.8 4.7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="comment-main">
        <time dateTime={comment.createdAt?.toISOString()}>{formatWhen(comment.createdAt)}</time>
        <p className="comment-body">{comment.body}</p>
        {visibleAnswers.length > 0 && (
          <div className="comment-answers">
            {visibleAnswers.map((item) => (
              <AnswerRow
                key={item.id}
                item={item}
                onKeepFocus={() => cardRef.current?.focus({ preventScroll: true })}
                onExpandedChange={onExpandedChange}
              />
            ))}
          </div>
        )}
        {answering && (
          <form className="composer answer-composer" onSubmit={onAnswer} onMouseDown={stop} onClick={stop}>
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              rows={2}
              placeholder="Write an answer"
              aria-label="Answer"
              required
            />
            <button type="submit" disabled={answerSaving || answer.trim().length === 0}>
              {answerSaving ? 'Saving…' : 'Answer'}
            </button>
            {answerError && <p className="error">{answerError}</p>}
          </form>
        )}
        <div className="comment-actions">
          <button
            type="button"
            className="icon-button"
            aria-label="Edit comment"
            onMouseDown={stop}
            onClick={(event) => {
              stop(event)
              setDraft(comment.body)
              setEditing(true)
              onExpandedChange(false)
            }}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M12.2 3.6 16.4 7.8 7.1 17.1 3 18l.9-4.1 8.3-10.3Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M11 4.8 15.2 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            className="resolve"
            onMouseDown={stop}
            onClick={(event) => {
              stop(event)
              onExpandedChange(true)
              setAnswering((open) => !open)
            }}
          >
            Answer
          </button>
          {comment.status === 'open' ? (
            <button
              type="button"
              className="resolve"
              onMouseDown={stop}
              onClick={(event) => {
                stop(event)
                setCommentStatus(comment.id, 'resolved')
              }}
            >
              Resolve
            </button>
          ) : (
            <button
              type="button"
              className="resolve"
              onMouseDown={stop}
              onClick={(event) => {
                stop(event)
                setCommentStatus(comment.id, 'open')
              }}
            >
              Reopen
            </button>
          )}
          <button
            type="button"
            className="resolve"
            onMouseDown={stop}
            onClick={(event) => {
              stop(event)
              setCommentStatus(comment.id, 'deleted')
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export function CommentThread({
  comments,
  onFocusChange,
}: {
  comments: Comment[]
  onFocusChange?: (focused: boolean) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const expandedIdRef = useRef<string | null>(null)

  function setExpanded(id: string, expanded: boolean) {
    const current = expandedIdRef.current
    const next = expanded ? id : current === id ? null : current
    if (next === current) return
    expandedIdRef.current = next
    setExpandedId(next)
    onFocusChange?.(next !== null)
  }

  useEffect(() => {
    const id = expandedIdRef.current
    if (!id) return
    const stillVisible = comments.some((comment) => comment.id === id && comment.status !== 'deleted')
    if (stillVisible) return
    expandedIdRef.current = null
    setExpandedId(null)
    onFocusChange?.(false)
  }, [comments, onFocusChange])

  const byId = new Map(comments.map((comment) => [comment.id, comment]))
  const answers = new Map<string, Comment[]>()
  const roots: Comment[] = []

  for (const comment of comments) {
    const root = rootOf(comment, byId)
    if (root.id === comment.id) {
      if (comment.status !== 'deleted') roots.push(comment)
      continue
    }
    if (root.status === 'deleted' || comment.status === 'deleted') continue
    const list = answers.get(root.id) ?? []
    list.push(comment)
    answers.set(root.id, list)
  }

  return (
    <>
      {roots.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          answers={answers.get(comment.id) ?? []}
          expanded={expandedId === comment.id}
          onExpandedChange={(expanded) => setExpanded(comment.id, expanded)}
        />
      ))}
    </>
  )
}
