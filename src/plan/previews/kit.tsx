import { useState, type ReactNode } from 'react'

export type Tier = 'free' | 'pro' | 'premium'

export type RoleOption<R extends string> = { id: R; label: string }

export const studentRoles: readonly RoleOption<Tier>[] = [
  { id: 'free', label: 'Free' },
  { id: 'pro', label: 'Pro' },
  { id: 'premium', label: 'Premium' },
]

export function RoleScreen<R extends string>({
  name,
  roles,
  children,
}: {
  name: string
  roles: readonly RoleOption<R>[]
  children: (role: R) => ReactNode
}) {
  const [role, setRole] = useState<R>(roles[0].id)

  return (
    <div className="pv-screen" data-role={role}>
      <div className="tp-controls">
        <div role="tablist" aria-label={`${name} role`}>
          {roles.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={role === option.id}
              className={role === option.id ? 'on' : undefined}
              onClick={() => setRole(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {children(role)}
    </div>
  )
}

const tierLabel: Record<Tier, string> = { free: 'Free', pro: 'Pro', premium: 'Premium · U18' }

const tierCoin: Record<Tier, string> = {
  free: '35 / 50 coin tháng này',
  pro: '820 coin · hết hạn cùng Pro',
  premium: '5.400 / 9.900 coin trong gói',
}

const studentNav = ['Dashboard', 'Journey', 'Trường', 'Học bổng', 'Lớp Tutor', 'Ví coin', 'Feed', 'Ngoại khoá']

export function StudentFrame({ tier, active, children }: { tier: Tier; active: string; children: ReactNode }) {
  return (
    <div className="tp-frame">
      <div className="tp-topbar">
        <strong>USAS</strong>
        <span className={`tp-badge ${tier}`}>{tierLabel[tier]}</span>
        <span className="tp-spacer" />
        <span className="tp-coin">{tierCoin[tier]}</span>
        <span className="tp-avatar">MA</span>
      </div>
      <div className="tp-body">
        <nav className="tp-nav">
          {studentNav.map((item) => (
            <span key={item} className={item === active ? 'on' : undefined}>
              {item}
            </span>
          ))}
          {tier === 'premium' && <span className="tp-nav-mentor">Mentor của tôi</span>}
        </nav>
        <div className="tp-main">{children}</div>
      </div>
    </div>
  )
}

export function StaffFrame({
  role,
  nav,
  active,
  avatar,
  children,
}: {
  role: string
  nav: string[]
  active: string
  avatar: string
  children: ReactNode
}) {
  return (
    <div className="tp-frame">
      <div className="tp-topbar">
        <strong>USAS</strong>
        <span className="tp-badge pv-staff">{role}</span>
        <span className="tp-spacer" />
        <span className="tp-coin">Khu vực nhân viên</span>
        <span className="tp-avatar">{avatar}</span>
      </div>
      <div className="tp-body">
        <nav className="tp-nav">
          {nav.map((item) => (
            <span key={item} className={item === active ? 'on' : undefined}>
              {item}
            </span>
          ))}
        </nav>
        <div className="tp-main">{children}</div>
      </div>
    </div>
  )
}

export function PublicFrame({ right, children }: { right: ReactNode; children: ReactNode }) {
  return (
    <div className="tp-frame">
      <div className="tp-topbar">
        <strong>USAS</strong>
        <span className="pv-topnav">Gói học · Ngoại khoá · Học bổng · Câu chuyện</span>
        <span className="tp-spacer" />
        {right}
      </div>
      <div className="tp-main pv-public">{children}</div>
    </div>
  )
}

export function Card({
  title,
  note,
  children,
  wide,
  tone,
}: {
  title: ReactNode
  note?: ReactNode
  children: ReactNode
  wide?: boolean
  tone?: 'locked' | 'alert' | 'mentor'
}) {
  return (
    <section className={`tp-card${wide ? ' wide' : ''}${tone ? ` ${tone}` : ''}`}>
      <header>
        <h4>{title}</h4>
        {note && <span>{note}</span>}
      </header>
      {children}
    </section>
  )
}

export function Future() {
  return <span className="pv-tag future">Tương lai</span>
}

export function Tag({ tone, children }: { tone?: 'ok' | 'warn' | 'info' | 'bad' | 'premium'; children: ReactNode }) {
  return <span className={`pv-tag${tone ? ` ${tone}` : ''}`}>{children}</span>
}

export function Btn({
  kind,
  disabled,
  children,
}: {
  kind?: 'primary' | 'ghost' | 'danger'
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <span className={`pv-btn${kind ? ` ${kind}` : ''}${disabled ? ' disabled' : ''}`} aria-disabled={disabled || undefined}>
      {children}
    </span>
  )
}

export function Bar({ value, tone }: { value: number; tone?: 'warn' | 'ok' }) {
  return (
    <span className={`pv-bar${tone ? ` ${tone}` : ''}`}>
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </span>
  )
}

export function Chips({ items, on = 0 }: { items: string[]; on?: number }) {
  return (
    <div className="tp-tabs">
      {items.map((item, index) => (
        <span key={item} className={index === on ? 'on' : undefined}>
          {item}
        </span>
      ))}
    </div>
  )
}

export function Banner({ tone, children }: { tone?: 'warn' | 'info' | 'ok'; children: ReactNode }) {
  return <div className={`pv-banner${tone ? ` ${tone}` : ''}`}>{children}</div>
}

export function MockTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="pv-table-wrap">
      <table className="pv-table">
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
