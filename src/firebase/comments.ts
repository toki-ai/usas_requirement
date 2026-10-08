import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  type Timestamp,
} from 'firebase/firestore'
import { db } from './client'
import type { Comment, CommentStatus, NewComment } from '../types'

function toComment(id: string, data: Record<string, unknown>): Comment {
  const createdAt = data.createdAt as Timestamp | null | undefined
  return {
    id,
    sectionId: String(data.sectionId),
    anchorId: typeof data.anchorId === 'string' ? data.anchorId : null,
    parentId: typeof data.parentId === 'string' ? data.parentId : null,
    authorName: String(data.authorName ?? ''),
    body: String(data.body ?? ''),
    status: data.status === 'resolved' || data.status === 'deleted' ? data.status : 'open',
    createdAt: createdAt ? createdAt.toDate() : null,
  }
}

export function subscribeToComments(
  onChange: (comments: Comment[]) => void,
  onError: (error: Error) => void,
) {
  const commentsQuery = query(collection(db, 'comments'), orderBy('createdAt', 'asc'))

  return onSnapshot(
    commentsQuery,
    (snapshot) => {
      onChange(snapshot.docs.map((item) => toComment(item.id, item.data())))
    },
    (error) => onError(error),
  )
}

export async function addComment(input: NewComment) {
  const sectionId = input.sectionId.trim()
  const anchorId = input.anchorId?.trim() ?? ''
  const authorName = input.authorName.trim()
  const body = input.body.trim()

  if (!sectionId || !anchorId || !body) {
    throw new Error('A comment needs a line and text.')
  }

  await addDoc(collection(db, 'comments'), {
    sectionId,
    anchorId,
    parentId: input.parentId,
    authorName,
    body,
    status: 'open' satisfies CommentStatus,
    createdAt: serverTimestamp(),
  })
}

export async function setCommentStatus(commentId: string, status: CommentStatus) {
  await updateDoc(doc(db, 'comments', commentId), { status })
}

export async function updateCommentBody(commentId: string, body: string) {
  const text = body.trim()
  if (!text) throw new Error('A comment needs text.')
  await updateDoc(doc(db, 'comments', commentId), { body: text })
}
