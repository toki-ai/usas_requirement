const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export function withBase(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (base && (href === base || href.startsWith(`${base}/`) || href.startsWith(`${base}#`))) return href
  return `${base}${href}`
}

export function appPath(pathname = window.location.pathname) {
  const stripped = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname
  if (!stripped) return '/'
  return stripped.startsWith('/') ? stripped : `/${stripped}`
}
