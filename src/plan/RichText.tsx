import type { ReactNode } from 'react'

const linkPattern = /\[\[([^|\]]+)\|([^\]]+)\]\]/g

export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(linkPattern)) {
    const [raw, href, label] = match
    const start = match.index ?? 0
    if (start > cursor) parts.push(text.slice(cursor, start))
    parts.push(
      <a key={`${start}-${href}`} href={href}>
        {label}
      </a>,
    )
    cursor = start + raw.length
  }

  if (cursor < text.length) parts.push(text.slice(cursor))
  return <>{parts}</>
}
