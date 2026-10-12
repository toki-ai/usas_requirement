import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import { addComment } from '../firebase/comments'
import type { Comment, PlanRoadmap, RoadmapStage, RoadmapStep } from '../types'
import { CommentThread } from './CommentThread'

type JourneyRoadmapProps = {
  block: PlanRoadmap
  comments: Comment[]
}

function stepLabel(step: RoadmapStep) {
  return /^\d+$/.test(step.number) ? `Bước ${step.number}: ${step.name}` : `${step.number}: ${step.name}`
}

function tickLabel(month: number, bay: number) {
  if (month === 0) return 'D'
  if (month === bay) return 'Bay'
  return month > 0 ? `+${month}` : `${month}`
}

function commentsForStep(comments: Comment[], stepId: string) {
  return comments.filter((comment) => comment.anchorId === stepId)
}

function StepDetail({
  step,
  stage,
  composing,
  onToggleComment,
}: {
  step: RoadmapStep
  stage: RoadmapStage
  composing: boolean
  onToggleComment: () => void
}) {
  const fields: [string, string][] = [
    ['Mục tiêu', step.goal],
    ['Học sinh làm', step.does],
    ['Đầu ra, bằng chứng', step.output],
    ['Thời điểm', step.timing],
    ['Ai kiểm tra', step.checker],
    ['Mở bước sau', step.unlock],
    ['Cẩm nang mentor', step.handbook],
  ]

  return (
    <article className={`roadmap-card ${stage.tone}`} id={step.id} data-section-id={step.id} data-line-id={step.id}>
      <header>
        <span className="roadmap-num">{/^\d+$/.test(step.number) ? step.number : '→'}</span>
        <div>
          <h3>{stepLabel(step)}</h3>
          <p>{stage.name}</p>
        </div>
        <button
          type="button"
          className="add-comment"
          aria-label={`Add comment on ${stepLabel(step)}`}
          aria-expanded={composing}
          onClick={onToggleComment}
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
      <dl>
        {fields.slice(0, 3).map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div>
          <dt>Assignment</dt>
          <dd>
            <ul className="roadmap-assignments">
              {step.assignments.map((assignment) => (
                <li key={assignment.text}>
                  <span>{assignment.text}</span>
                  <span className="note-badge">{assignment.format}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        {fields.slice(3).map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export function JourneyRoadmap({ block, comments }: JourneyRoadmapProps) {
  const steps = useMemo(
    () => block.stages.flatMap((stage) => stage.steps.map((step) => ({ step, stage }))),
    [block.stages],
  )
  const firstId = steps[0]?.step.id ?? ''
  const [activeId, setActiveId] = useState(firstId)
  const [body, setBody] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [composing, setComposing] = useState(false)
  const active = steps.find((item) => item.step.id === activeId) ?? steps[0]
  const thread = commentsForStep(comments, active?.step.id ?? '')
  const visibleCount = thread.filter((comment) => comment.status !== 'deleted').length
  const showThread = visibleCount > 0 || composing || error !== null
  const { from, to, bay, note } = block.axis
  const span = to - from
  const months = Array.from({ length: span + 1 }, (_, index) => from + index)
  const at = (month: number) => `${((month - from) / span) * 100}%`

  function selectStep(id: string) {
    setActiveId(id)
    setBody('')
    setError(null)
    setComposing(false)
    const next = `${window.location.pathname}${window.location.search}#${id}`
    window.history.replaceState(null, '', next)
  }

  useEffect(() => {
    const fromHash = decodeURIComponent(window.location.hash.slice(1))
    if (steps.some((item) => item.step.id === fromHash)) setActiveId(fromHash)
  }, [steps])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!active) return
    setSaving(true)
    setError(null)
    try {
      await addComment({
        sectionId: block.sectionId,
        anchorId: active.step.id,
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

  if (!active) return null

  return (
    <div className="line roadmap-line" id={block.id} data-section-id={block.sectionId} data-line-id={active.step.id}>
      <div className="roadmap">
        <div className="roadmap-stats">
          {block.stats.map((stat) => (
            <div key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <h3 className="roadmap-title">Cấu trúc journey</h3>
        <div className="roadmap-stages">
          {block.stages.map((stage) => (
            <section
              key={stage.id}
              className={`roadmap-stage ${stage.tone}`}
              style={{ '--steps': stage.steps.length } as CSSProperties}
            >
              <header>
                <strong>{stage.name}</strong>
                <span>{stage.opens}</span>
              </header>
              <ol>
                {stage.steps.map((step) => (
                  <li key={step.id}>
                    <button
                      type="button"
                      className={step.id === active.step.id ? 'active' : undefined}
                      aria-current={step.id === active.step.id ? 'step' : undefined}
                      onClick={() => selectStep(step.id)}
                    >
                      <span>{step.number}</span>
                      {step.name}
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <h3 className="roadmap-title">Dòng thời gian</h3>
        <div className="roadmap-timeline">
          <div className="roadmap-timeline-inner">
            <div className="roadmap-axis">
              <span />
              <div className="roadmap-track">
                {months.map((month) => (
                  <span key={month} style={{ left: at(month) }} className={month === 0 || month === bay ? 'mark' : undefined}>
                    {tickLabel(month, bay)}
                  </span>
                ))}
              </div>
            </div>
            {steps.map(({ step, stage }) => (
              <button
                key={step.id}
                type="button"
                className={`roadmap-row ${step.id === active.step.id ? 'active' : ''}`}
                onClick={() => selectStep(step.id)}
              >
                <span>{/^\d+$/.test(step.number) ? `${step.number}. ${step.name}` : step.name}</span>
                <div className="roadmap-track">
                  <i className="roadmap-guide" style={{ left: at(0) }} />
                  <i className="roadmap-guide" style={{ left: at(bay) }} />
                  <b
                    className={stage.tone}
                    style={{ left: at(step.window[0]), width: `${((step.window[1] - step.window[0]) / span) * 100}%` }}
                  />
                </div>
              </button>
            ))}
            <p className="roadmap-note">{note}</p>
          </div>
        </div>

        <h3 className="roadmap-title">Chi tiết từng bước</h3>
        <div className="roadmap-step-switch" role="tablist" aria-label="Chọn bước">
          {steps.map(({ step }) => {
            const hasComments = commentsForStep(comments, step.id).some((comment) => comment.status !== 'deleted')
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={step.id === active.step.id}
                className={step.id === active.step.id ? 'active' : undefined}
                onClick={() => selectStep(step.id)}
              >
                {step.number}
                {hasComments ? <i /> : null}
              </button>
            )
          })}
        </div>
        <StepDetail
          step={active.step}
          stage={active.stage}
          composing={composing}
          onToggleComment={() => setComposing((open) => !open)}
        />
      </div>

      <div className="line-comments">
        {showThread && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
