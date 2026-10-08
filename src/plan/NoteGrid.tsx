import { useState, type FormEvent } from 'react'
import { addComment } from '../firebase/comments'
import type { Comment, PlanNote, PlanNotes } from '../types'
import { CommentThread } from './CommentThread'

type NoteGridProps = {
  block: PlanNotes
  comments: Comment[]
}

function NoteCard({
  note,
  sectionId,
  comments,
}: {
  note: PlanNote
  sectionId: string
  comments: Comment[]
}) {
  const [body, setBody] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [composing, setComposing] = useState(false)
  const thread = comments.filter((comment) => comment.anchorId === note.id)
  const visibleCount = thread.filter((comment) => comment.status !== 'deleted').length
  const showThread = visibleCount > 0 || composing || error !== null

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await addComment({
        sectionId,
        anchorId: note.id,
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

  return (
    <article className={note.departments ? 'note-card wide' : 'note-card'} id={note.id} data-line-id={note.id}>
      <header>
        <h3>{note.title}</h3>
        {note.badge && <span className="note-badge">{note.badge}</span>}
        <button
          type="button"
          className="add-comment"
          aria-label={`Add comment on ${note.title}`}
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
      </header>
      <ul>
        {note.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {note.departments && (
        <div className="departments">
          {note.departments.map((department) => (
            <section key={department.name} className="department">
              <h4>{department.name}</h4>
              <ul>
                {department.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      {showThread && (
        <div className="note-comments">
          <CommentThread comments={thread} />
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
        </div>
      )}
    </article>
  )
}

export function NoteGrid({ block, comments }: NoteGridProps) {
  return (
    <div className="line notes-line">
      <div className="note-grid">
        {block.notes.map((note) => (
          <NoteCard key={note.id} note={note} sectionId={block.sectionId} comments={comments} />
        ))}
      </div>
      <div />
    </div>
  )
}
