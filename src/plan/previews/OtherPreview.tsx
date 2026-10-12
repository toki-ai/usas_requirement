import { Banner, Bar, Btn, Card, Chips, Future, MockTable, PublicFrame, RoleScreen, StaffFrame, StudentFrame, Tag, studentRoles, type Tier } from './kit'

type Visitor = 'guest' | Tier

function Landing({ visitor }: { visitor: Visitor }) {
  const loggedIn = visitor !== 'guest'
  return (
    <PublicFrame right={loggedIn ? <span className="tp-avatar">MA</span> : <span className="tp-link">Đăng nhập</span>}>
      <section className="pv-hero">
        <div>
          <h4>Du học châu Âu có người dẫn từng bước</h4>
          <p className="tp-muted">Journey 9 bước, mentor làm hồ sơ, học bổng và ngoại khoá trong một nơi.</p>
          <div className="pv-actions">
            {visitor === 'premium' ? <Btn kind="primary">Nhắn mentor</Btn> : <Btn kind="primary">Hẹn tư vấn 15 phút</Btn>}
          </div>
        </div>
        <div className="pv-stats">
          <span>
            <b>800+</b> học sinh
          </span>
          <span>
            <b>300+</b> trường
          </span>
          <span>
            <b>55+</b> học bổng
          </span>
        </div>
      </section>
      <div className="pv-grid4 pv-gap">
        <Card title="Free" note={visitor === 'free' ? <Tag>Gói hiện tại</Tag> : undefined}>
          <p>Xem đường đi 9 bước, 2 trường.</p>
        </Card>
        <Card title="Pro" note={visitor === 'pro' ? <Tag>Gói hiện tại</Tag> : '4.900.000đ'}>
          <p>Tự làm có hạn từng trường, 8 trường, kèm 1.000 coin.</p>
        </Card>
        <Card title="Premium U3–U30" tone="mentor" note={visitor === 'premium' ? <Tag>Gói hiện tại</Tag> : undefined}>
          <p>Mentor làm hồ sơ, theo brochure.</p>
        </Card>
        <Card title="Ngoại khoá">
          <p>Gói nhóm, đi kèm package Premium.</p>
        </Card>
      </div>
      <div className="tp-grid pv-gap">
        {visitor === 'guest' && (
          <Card title="Hẹn tư vấn 15 phút" wide>
            <div className="pv-form">
              <span className="pv-input">Họ tên</span>
              <span className="pv-input">Số điện thoại</span>
              <span className="pv-input">Email</span>
              <span className="pv-select">Nước muốn đi ▾</span>
              <span className="pv-select">Năm nhập học ▾</span>
              <span className="pv-select">Giờ gọi tiện ▾</span>
            </div>
            <div className="pv-row">
              <Chips items={['Gọi điện', 'Zalo', 'Messenger']} />
              <Btn kind="primary">Gửi</Btn>
            </div>
          </Card>
        )}
        {(visitor === 'free' || visitor === 'pro') && (
          <Card title="Hẹn tư vấn 15 phút" note="Đã điền sẵn từ tài khoản" wide>
            <p>Minh Anh · 09•• ••• 321 · Hà Lan · nhập học 2027</p>
            <div className="pv-row">
              <Chips items={['Gọi điện', 'Zalo', 'Messenger']} on={1} />
              <Btn kind="primary">Đặt lịch 1 chạm</Btn>
            </div>
          </Card>
        )}
        {visitor === 'premium' && (
          <Card title="Bạn đã có mentor" tone="mentor" wide>
            <p>Yêu cầu của bạn gửi thẳng tới chị Thảo, không vào hàng chờ Sales.</p>
            <span className="tp-link">Nhắn mentor</span>
          </Card>
        )}
        {visitor !== 'premium' && (
          <Card title="Sau khi gửi" wide>
            <Banner tone="ok">Đã nhận. Sales sẽ liên hệ trong 24h.</Banner>
          </Card>
        )}
      </div>
    </PublicFrame>
  )
}

const leads = [
  ['Lan Chi', 'Landing', 'Chờ thanh toán', '2 / 3', '13/10', 'Sales Hằng'],
  ['Đức Minh', 'Facebook', 'Đã tư vấn', '1 / 3', '14/10', 'Sales Hằng'],
  ['Phương Anh', 'Giới thiệu', 'Hẹn lại', '2 / 3', '15/10', 'Sales Hằng'],
  ['Tuấn Kiệt', 'Landing', 'Mới', '0 / 3', 'Hôm nay', 'Sales Long'],
]

function LeadConsole({ role }: { role: 'sales' | 'admin' }) {
  const isAdmin = role === 'admin'
  const rows = isAdmin ? leads : leads.filter((lead) => lead[5] === 'Sales Hằng')
  return (
    <StaffFrame
      role={isAdmin ? 'Admin' : 'Sales'}
      avatar={isAdmin ? 'AD' : 'HA'}
      active="Lead"
      nav={isAdmin ? ['Tổng quan', 'Học sinh', 'Mentor', 'Lead', 'Lớp Tutor', 'Kiểm duyệt'] : ['Lead của tôi', 'Lịch gọi', 'Báo cáo']}
    >
      <Chips items={['Mới', 'Đang gọi', 'Hẹn lại', 'Đã tư vấn', 'Chờ thanh toán', 'Đã thanh toán', 'Đóng']} on={4} />
      <div className="pv-feed">
        <div>
          <MockTable
            head={isAdmin ? ['Lead', 'Nguồn', 'Trạng thái', 'Lần gọi', 'Gọi lại', 'Sales'] : ['Lead', 'Nguồn', 'Trạng thái', 'Lần gọi', 'Gọi lại']}
            rows={rows.map((lead) => {
              const cells = [<b>{lead[0]}</b>, lead[1], <Tag tone={lead[2] === 'Chờ thanh toán' ? 'warn' : 'info'}>{lead[2]}</Tag>, lead[3], lead[4]]
              return isAdmin ? [...cells, <span className="pv-select">{lead[5]} ▾</span>] : cells
            })}
          />
          {isAdmin && (
            <div className="tp-grid pv-gap">
              <Card title="Chờ gán mentor" note="Đã thanh toán PayOS" tone="alert">
                <ul className="tp-assign">
                  <li>
                    <span>Bảo Ngọc · U9 · Hà Lan</span>
                    <Btn kind="primary">Gán mentor</Btn>
                  </li>
                </ul>
                <small className="tp-muted">Gán xong: kích hoạt package, tạo việc “Buổi họp đầu tiên” cho mentor.</small>
              </Card>
              <Card title="Chuyển đổi theo nguồn" note="Tháng 10">
                <ul className="tp-list">
                  <li>Landing · 42 lead · 6 mua</li>
                  <li>Facebook · 30 lead · 3 mua</li>
                  <li>Giới thiệu · 9 lead · 4 mua</li>
                </ul>
              </Card>
            </div>
          )}
        </div>
        <aside className="tp-side">
          <Card title="Lan Chi" note="Chờ thanh toán">
            <ul className="tp-list">
              <li>11/10 · gọi lần 1 · không nghe</li>
              <li>12/10 · gọi lần 2 · tư vấn 15 phút xong</li>
              <li>Ghi chú: Hà Lan, Business, ngân sách 600tr</li>
              <li>
                Gói đề xuất: <b>U9</b>
              </li>
            </ul>
          </Card>
          <Card title="Thanh toán" note="QR chuyển khoản PayOS">
            <ul className="tp-list">
              <li>Đã gửi QR PayOS cho khách · 12/10</li>
              <li>Khớp tài khoản theo SĐT / email: 09•• ••• 112</li>
              <li>
                Trạng thái: <Tag tone="warn">Chờ PayOS báo nhận tiền</Tag>
              </li>
            </ul>
            <small className="tp-muted">PayOS báo đã nhận thì lead tự sang “Đã thanh toán” và vào hàng chờ gán mentor của Admin.</small>
          </Card>
          {!isAdmin && (
            <div className="pv-actions">
              <Btn>Ghi cuộc gọi</Btn>
              <Btn>Hẹn gọi lại</Btn>
              <Btn kind="ghost">Đóng · chọn lý do</Btn>
            </div>
          )}
        </aside>
      </div>
    </StaffFrame>
  )
}

const groupPackages = [
  ['BASIC', '3–5 hoạt động · 6–12 tháng', 'Tình nguyện viên'],
  ['ADVANCED', '5–10 hoạt động · 12–18 tháng', 'Tình nguyện viên'],
  ['CORETEAM', '5–10 hoạt động · 12–18 tháng', 'Vào ban vận hành'],
] as const

function Extracurricular({ tier }: { tier: Tier }) {
  const premium = tier === 'premium'
  return (
    <StudentFrame tier={tier} active="Ngoại khoá">
      <Banner tone="warn">Còn 8 tháng tới hạn nộp sớm nhất (TU Delft 15/01). Dưới 9 tháng nên bắt đầu ngay.</Banner>
      {premium && (
        <div className="tp-journey-head">
          <h4>Ngoại khoá · 1 / 2 suất trong package U18</h4>
          <Tag tone="premium">Gói nhóm, đi kèm package</Tag>
        </div>
      )}
      <div className="pv-grid3 pv-gap">
        {groupPackages.map(([name, scope, role]) => (
          <Card key={name} title={name} note="Gói nhóm">
            <p>{scope}</p>
            <small className="tp-muted">{role}</small>
            {name === 'CORETEAM' ? (
              <Btn>Hẹn tư vấn 15 phút</Btn>
            ) : premium ? (
              <Btn kind="primary">Dùng suất</Btn>
            ) : (
              <Btn disabled>Đi kèm package Premium</Btn>
            )}
          </Card>
        ))}
      </div>
      <div className="tp-grid pv-gap">
        {premium ? (
          <Card title="Chọn nhóm">
            <div className="pv-tags">
              <span className="pv-choice on">Đi cùng bạn · nhóm 3</span>
              <span className="pv-choice">Ghép nhóm 5</span>
            </div>
            <p className="tp-muted">Link mời bạn: usas.vn/n/8KQ2 · đã có 2 / 3 người</p>
            <Bar value={66} />
          </Card>
        ) : (
          <Card title="Muốn có ngoại khoá?" tone="locked">
            <p>Ngoại khoá chỉ bán theo gói nhóm, đi kèm package Premium. Không mua riêng bằng tiền hay coin.</p>
            <Btn kind="primary">Hẹn tư vấn 15 phút</Btn>
          </Card>
        )}
        <Card title={<>Gói cá nhân <Future /></>} tone="locked">
          <p>Đi một mình, không cần nhóm. Chưa mở.</p>
        </Card>
        {premium && (
          <Card title="Hoạt động của tôi" wide>
            <ul className="tp-assign">
              <li>
                <span>BASIC · Dạy tiếng Anh vùng cao · 3 / 5 buổi</span>
                <span className="tp-status ok">Đang tham gia</span>
              </li>
              <li>
                <span>BASIC · Gây quỹ thư viện · chứng nhận đã cấp</span>
                <span className="tp-status ok">Hoàn tất</span>
              </li>
            </ul>
          </Card>
        )}
        {tier === 'pro' && (
          <Card title="Khoảng thiếu từ AI dự báo" wide>
            <p>Hồ sơ Business thiếu hoạt động lãnh đạo. Ngoại khoá vai ban giúp bù phần này.</p>
          </Card>
        )}
      </div>
    </StudentFrame>
  )
}

export function LandingScreen() {
  return (
    <RoleScreen
      name="Landing và form tư vấn"
      roles={[{ id: 'guest', label: 'Khách' }, ...studentRoles] as { id: Visitor; label: string }[]}
    >
      {(visitor) => <Landing visitor={visitor} />}
    </RoleScreen>
  )
}

export function LeadConsoleScreen() {
  return (
    <RoleScreen
      name="Lead và bàn giao"
      roles={[
        { id: 'sales', label: 'Sales' },
        { id: 'admin', label: 'Admin' },
      ]}
    >
      {(role) => <LeadConsole role={role} />}
    </RoleScreen>
  )
}

export function ExtracurricularScreen() {
  return <RoleScreen name="Ngoại khoá" roles={studentRoles}>{(tier) => <Extracurricular tier={tier} />}</RoleScreen>
}
