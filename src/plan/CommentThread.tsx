import { useState, type FormEvent } from 'react'
import { setCommentStatus, updateCommentBody } from '../firebase/comments'
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

function CommentCard({ comment }: { comment: Comment }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(comment.body)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  if (editing) {
    return (
      <form className="comment-card composer" onSubmit={onSave}>
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
            onClick={() => {
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
    <article className={comment.status === 'resolved' ? 'comment-card resolved' : 'comment-card'}>
      <time dateTime={comment.createdAt?.toISOString()}>{formatWhen(comment.createdAt)}</time>
      <p>{comment.body}</p>
      <div className="comment-actions">
        <button
          type="button"
          className="icon-button"
          aria-label="Edit comment"
          onClick={() => {
            setDraft(comment.body)
            setEditing(true)
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
        {comment.status === 'open' ? (
          <button type="button" className="resolve" onClick={() => setCommentStatus(comment.id, 'resolved')}>
            Resolve
          </button>
        ) : (
          <button type="button" className="resolve" onClick={() => setCommentStatus(comment.id, 'open')}>
            Reopen
          </button>
        )}
        <button type="button" className="resolve" onClick={() => setCommentStatus(comment.id, 'deleted')}>
          Delete
        </button>
      </div>
    </article>
  )
}

export function CommentThread({ comments }: { comments: Comment[] }) {
  const visible = comments.filter((comment) => comment.status !== 'deleted')
  return (
    <>
      {visible.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  )
}
