import { Banner, Btn, Card, Chips, RoleScreen, StaffFrame, StudentFrame, Tag, studentRoles, type Tier } from './kit'

type PostType = 'sharing' | 'scholarship' | 'mission'

const typeLabel: Record<PostType, string> = { sharing: 'Sharing', scholarship: 'Học bổng', mission: 'Mission' }
const typeTone: Record<PostType, 'info' | 'ok' | 'premium'> = { sharing: 'info', scholarship: 'ok', mission: 'premium' }

function Post({
  author,
  badge,
  type,
  country,
  children,
  pinned,
  tier,
}: {
  author: string
  badge: string
  type: PostType
  country: string
  children: React.ReactNode
  pinned?: boolean
  tier: Tier
}) {
  return (
    <article className={`pv-post${pinned ? ' pinned' : ''}`}>
      <header className="pv-row">
        <div className="pv-author">
          <span className="tp-avatar">{author.slice(0, 2).toUpperCase()}</span>
          <div>
            <b>{author}</b> <span className="tp-muted">{badge}</span>
            <div className="pv-tags">
              <Tag tone={typeTone[type]}>{typeLabel[type]}</Tag>
              <Tag>{country}</Tag>
              {pinned && <Tag tone="warn">Ghim</Tag>}
            </div>
          </div>
        </div>
        <span className="tp-muted">2 giờ</span>
      </header>
      <div className="pv-post-body">{children}</div>
      <footer className="pv-post-actions">
        <span>♡ Thích</span>
        <span>Bình luận</span>
        {type === 'mission' && tier === 'free' && <span className="tp-link">Làm nhiệm vụ · +5 coin</span>}
        {type === 'mission' && tier !== 'free' && <span className="tp-link">Làm nhiệm vụ</span>}
        {type === 'sharing' && <span className="pv-report">⚑ Báo cáo</span>}
      </footer>
    </article>
  )
}

function Feed({ tier }: { tier: Tier }) {
  const myBadge = tier === 'free' ? 'Free' : tier === 'pro' ? 'Pro' : 'Premium'
  return (
    <StudentFrame tier={tier} active="Feed">
      <div className="pv-feed">
        <div>
          <div className="pv-input">Bạn muốn chia sẻ gì? · Sharing hoặc Học bổng</div>
          <Chips items={['Tất cả', 'Sharing', 'Học bổng', 'Mission', 'Hà Lan', 'Đức', 'Visa', 'Tuần đầu']} />
          <Post author="USAS Admin" badge="Staff" type="mission" country="Tất cả" pinned tier={tier}>
            <p>Mission tuần này: viết 150 chữ về tuần đầu ở trường mới, đăng dạng Sharing.</p>
          </Post>
          <Post author="Thu Hà" badge="Pro" type="sharing" country="Hà Lan" tier={tier}>
            <p>Phỏng vấn Erasmus 15 phút, hỏi 3 câu: vì sao chọn IBA, 1 dự án nhóm, kế hoạch sau tốt nghiệp…</p>
          </Post>
          <Post author="Thảo" badge="Mentor" type="sharing" country="Hà Lan" tier={tier}>
            <p>5 lỗi hay gặp trong Motivation Letter Hà Lan, rút ra từ 12 bộ hồ sơ mùa trước.</p>
          </Post>
          <Post author="Quốc Bảo" badge="Premium" type="scholarship" country="Phần Lan" tier={tier}>
            <p>Học bổng Aalto 50–100% học phí, hạn 02/01. Cần IELTS 6.5, bài luận 500 chữ.</p>
            <span className="tp-link">Mở trong Học bổng · xem match %</span>
          </Post>
        </div>
        <aside className="tp-side">
          <Card title="Bạn đăng với nhãn" note={myBadge}>
            <p>Quyền đăng và tương tác giống nhau ở cả 3 gói. Chỉ nhãn cạnh tên khác.</p>
          </Card>
          {tier === 'premium' && (
            <Card title="Bài mentor của bạn" tone="mentor">
              <p>Chị Thảo · “5 lỗi hay gặp trong ML Hà Lan”</p>
            </Card>
          )}
          <Card title="3 loại bài">
            <ul className="tp-list">
              <li>Sharing · đăng ngay, ai cũng báo cáo được</li>
              <li>Học bổng · học sinh, mentor đăng thì chờ duyệt; Staff đăng ngay</li>
              <li>Mission · chỉ Staff, Admin đăng</li>
            </ul>
          </Card>
        </aside>
      </div>
    </StudentFrame>
  )
}

type ComposerRole = Tier | 'mentor'

function ComposerFrame({ role, children }: { role: ComposerRole; children: React.ReactNode }) {
  if (role === 'mentor') {
    return (
      <StaffFrame role="Mentor" avatar="TH" active="Feed" nav={['Học sinh', 'Hàng chờ chấm', 'AI đề xuất', 'Lịch họp', 'Studio lớp', 'Feed']}>
        {children}
      </StaffFrame>
    )
  }
  return (
    <StudentFrame tier={role} active="Feed">
      {children}
    </StudentFrame>
  )
}

function Composer({ role }: { role: ComposerRole }) {
  const tier = role
  return (
    <ComposerFrame role={role}>
      <div className="tp-journey">
        <div className="tp-step">
          <h4>Đăng bài</h4>
          <div className="pv-tags pv-gap">
            <span className="pv-choice on">Sharing · đăng ngay</span>
            <span className="pv-choice">Học bổng · cần duyệt</span>
          </div>
          <p className="tp-muted">
            {tier === 'mentor'
              ? 'Mentor đăng như học sinh: Sharing đăng ngay, Học bổng chờ duyệt. Mission chỉ Staff, Admin đăng.'
              : 'Mission chỉ Staff, Admin đăng. Bạn xem và làm, không tạo được.'}
          </p>
          <div className="pv-row">
            <span className="tp-muted">Bài hiện với nhãn</span>
            <Tag tone={tier === 'mentor' ? 'premium' : undefined}>{tier === 'mentor' ? 'Mentor' : tier === 'free' ? 'Free' : tier === 'pro' ? 'Pro' : 'Premium'}</Tag>
          </div>
          <div className="pv-textarea">
            {tier === 'mentor'
              ? '5 lỗi hay gặp trong Motivation Letter Hà Lan, rút ra từ 12 bộ hồ sơ mùa trước…'
              : 'Tuần đầu ở Rotterdam: mở tài khoản ngân hàng mất 2 tuần, nên đặt lịch từ Việt Nam…'}
          </div>
          <div className="pv-tags">
            <span className="pv-select">Nước: Hà Lan ▾</span>
            <span className="pv-select">Chủ đề: Tuần đầu ▾</span>
            <span className="pv-select">Ảnh: 2 / 4</span>
          </div>
          <Banner tone="warn">Bài có số điện thoại “09xx…”. Xóa thông tin liên hệ trước khi đăng.</Banner>
          <div className="pv-actions">
            <Btn kind="ghost">Lưu nháp</Btn>
            <Btn kind="primary">Đăng ngay</Btn>
          </div>
          <small className="tp-muted">Chọn Học bổng thì nút thành “Gửi duyệt”.</small>
        </div>
        <aside className="tp-side">
          <Card title="Bài của tôi">
            <Chips items={['Đã đăng · 3', 'Chờ duyệt · 1', 'Bị từ chối · 1', 'Nháp · 1']} on={1} />
            <ul className="tp-list">
              <li>
                <Tag tone="ok">Học bổng</Tag> Orange Tulip 2027 · <Tag tone="warn">Chờ duyệt</Tag>
              </li>
              <li>
                <Tag tone="ok">Học bổng</Tag> Holland Scholarship · <Tag tone="bad">Bị từ chối</Tag>
                <small className="tp-muted pv-block">Lý do: thiếu link trang chính thức.</small>
                <span className="tp-link">Sửa và gửi lại</span> · <span className="tp-link">Xóa</span>
              </li>
            </ul>
          </Card>
          {(tier === 'pro' || tier === 'premium') && (
            <Card title="Mẹo">
              <p>Bài Sharing có thể bị báo cáo và gỡ nếu vi phạm.</p>
            </Card>
          )}
          {tier === 'free' && (
            <Card title="Nhiệm vụ">
              <p>Đăng 1 bài Sharing · +5 coin, tính vào trần 50 / tháng.</p>
            </Card>
          )}
          {tier === 'mentor' && (
            <Card title="Luật cho mentor" tone="mentor">
              <p>Bài Sharing của mentor cũng có nút báo cáo. Không đăng thông tin liên hệ riêng hay quảng cáo lớp của mình.</p>
            </Card>
          )}
        </aside>
      </div>
    </ComposerFrame>
  )
}

function Moderation({ role }: { role: 'admin' | 'content' }) {
  const isAdmin = role === 'admin'
  return (
    <StaffFrame
      role={isAdmin ? 'Admin' : 'Staff nội dung'}
      avatar={isAdmin ? 'AD' : 'ND'}
      active="Kiểm duyệt"
      nav={isAdmin ? ['Tổng quan', 'Học sinh', 'Mentor', 'Lead', 'Lớp Tutor', 'Kiểm duyệt'] : ['Kiểm duyệt', 'Đăng bài', 'Thư viện học bổng']}
    >
      <div className="tp-journey-head">
        <Chips items={['Học bổng chờ duyệt · 4', 'Sharing bị báo cáo · 2']} />
        <Btn kind="primary">+ Đăng bài</Btn>
      </div>
      <div className="tp-grid">
        <Card title={`Đăng bài của ${isAdmin ? 'Admin' : 'Staff nội dung'}`} note="Đăng ngay, không cần duyệt" tone="mentor" wide>
          <div className="pv-tags">
            <span className="pv-choice on">Học bổng</span>
            <span className="pv-choice">Mission</span>
          </div>
          <div className="pv-textarea">Học bổng Aalto 2027 · 50–100% học phí · hạn 02/01 · link trang chính thức…</div>
          <div className="pv-row">
            <span className="tp-muted">Bài học bổng của học sinh vẫn vào hàng chờ duyệt bên dưới. Học sinh không đăng được Mission.</span>
            <Btn kind="primary">Đăng ngay</Btn>
          </div>
        </Card>
        <Card title="Học bổng chờ duyệt" note="Cũ nhất trước" wide>
          <ul className="tp-assign">
            <li>
              <div>
                <span>Orange Tulip 2027 · Minh Anh</span>
                <small className="tp-muted">Chờ 6 giờ · 0 cảnh cáo · có link trang chính thức</small>
              </div>
              <span className="pv-actions">
                <Btn kind="primary">Duyệt</Btn>
                <Btn>Từ chối · ghi lý do</Btn>
              </span>
            </li>
            <li>
              <div>
                <span>DAAD EPOS · Gia Huy</span>
                <small className="tp-muted">Chờ 1 ngày · thiếu hạn nộp</small>
              </div>
              <span className="pv-actions">
                <Btn kind="primary">Duyệt</Btn>
                <Btn>Từ chối · ghi lý do</Btn>
              </span>
            </li>
          </ul>
        </Card>
        <Card title="Sharing bị báo cáo" note="Bài đã hiện, chờ xử lý" tone="alert" wide>
          <ul className="tp-assign">
            <li>
              <div>
                <span>“Ai cần dịch công chứng rẻ inbox Zalo…” · Tuấn</span>
                <small className="tp-muted">3 báo cáo: quảng cáo, có số liên hệ · tác giả 1 cảnh cáo</small>
              </div>
              <span className="pv-actions">
                <Btn>Giữ</Btn>
                <Btn kind="danger">Gỡ + cảnh cáo</Btn>
                {isAdmin && <Btn kind="danger">Khóa đăng 7 ngày</Btn>}
              </span>
            </li>
          </ul>
        </Card>
        {isAdmin ? (
          <Card title="Nhật ký" wide>
            <ul className="tp-list">
              <li>10:12 · Staff Ngọc duyệt “Aalto 2027”</li>
              <li>09:40 · Staff Ngọc gỡ 1 bài Sharing, cảnh cáo tác giả</li>
              <li>Hôm qua · Admin đăng Mission “Tuần đầu”</li>
            </ul>
          </Card>
        ) : (
          <Card title="Phân quyền" wide>
            <p className="tp-muted">Staff nội dung duyệt, gỡ bài, đăng Học bổng và Mission không qua duyệt. Khóa tài khoản do Admin.</p>
          </Card>
        )}
      </div>
    </StaffFrame>
  )
}

export function FeedScreen() {
  return <RoleScreen name="Feed" roles={studentRoles}>{(tier) => <Feed tier={tier} />}</RoleScreen>
}

export function ComposerScreen() {
  return (
    <RoleScreen
      name="Đăng bài và Bài của tôi"
      roles={[...studentRoles, { id: 'mentor', label: 'Mentor' }] as { id: ComposerRole; label: string }[]}
    >
      {(role) => <Composer role={role} />}
    </RoleScreen>
  )
}

export function ModerationScreen() {
  return (
    <RoleScreen
      name="Kiểm duyệt"
      roles={[
        { id: 'admin', label: 'Admin' },
        { id: 'content', label: 'Staff nội dung' },
      ]}
    >
      {(role) => <Moderation role={role} />}
    </RoleScreen>
  )
}
