import { useEffect, useState } from 'react'

export type TocItem = {
  id: string
  label: string
  depth?: number
}

const MARKER_PX = 96

function sectionInView(items: readonly TocItem[]) {
  let current = items[0]?.id ?? ''
  for (const item of items) {
    const element = document.getElementById(item.id)
    if (element && element.getBoundingClientRect().top <= MARKER_PX) current = item.id
  }

  const last = items.at(-1)
  const lastElement = last ? document.getElementById(last.id) : null
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
  if (atBottom && last && lastElement && lastElement.getBoundingClientRect().top < window.innerHeight) {
    return last.id
  }
  return current
}

export function TableOfContents({ items }: { items: readonly TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const update = () => setActiveId(sectionInView(items))
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  function jump(id: string) {
    const element = document.getElementById(id)
    if (!element) return
    setActiveId(id)
    element.scrollIntoView({ behavior: 'auto', block: 'start' })
    const next = `${window.location.pathname}${window.location.search}#${id}`
    window.history.replaceState(null, '', next)
  }

  return (
    <nav className="toc" aria-label="Mục lục">
      <p>Mục lục</p>
      <ul>
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id} className={item.depth ? 'sub' : undefined}>
              <button type="button" className={active ? 'active' : undefined} aria-current={active ? 'true' : undefined} onClick={() => jump(item.id)}>
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
