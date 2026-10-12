import { Banner, Bar, Btn, Card, Chips, MockTable, RoleScreen, StaffFrame, StudentFrame, Tag, studentRoles, type Tier } from './kit'

const policy = 'Huỷ từ 24h trở lên: hoàn 100% coin. Huỷ dưới 24h hoặc vắng mặt: không hoàn.'

const classes = [
  { teacher: 'Vân · cựu du học sinh Hà Lan', label: 'Tutor', topic: 'Sửa ML / essay · 90 phút', rating: '4,8', price: 450, slots: ['T4 19:30', 'T6 20:00', 'CN 09:00'] },
  { teacher: 'Anh Nam', label: 'Mentor · Có mở lớp', topic: 'IELTS Speaking · 60 phút', rating: '4,6', price: 300, slots: ['T3 18:00', 'T5 18:00', 'T7 10:00'] },
  { teacher: 'Hòa', label: 'Tutor', topic: 'Phỏng vấn visa Hà Lan · 60 phút', rating: '4,9', price: 350, slots: ['T5 20:00', 'T7 15:00', 'CN 15:00'] },
]

const balance: Record<Tier, string> = {
  free: '135 coin · nhiệm vụ 35 + mua lẻ 100',
  pro: '1.120 coin · Pro 820 + mua lẻ 300',
  premium: '5.500 coin · package 5.400 + mua lẻ 100',
}

function ClassList({ tier }: { tier: Tier }) {
  return (
    <StudentFrame tier={tier} active="Lớp Tutor">
      <div className="tp-journey-head">
        <div className="pv-input">🔍 Tìm lớp: IELTS, essay, phỏng vấn visa…</div>
        <Tag>{balance[tier]}</Tag>
      </div>
      <Chips items={['Tất cả chủ đề', 'IELTS', 'HSK', 'Essay', 'Phỏng vấn visa', 'Kinh nghiệm theo nước', '60 / 90 phút', '150–600 coin']} />
      <Card title="Gợi ý từ journey" note="Bước 4 · Chuẩn bị hồ sơ" wide>
        <p className="tp-muted">
          Luôn 2–3 lớp để chọn{tier === 'premium' ? ', không gợi ý lớp của mentor đang phụ trách bạn' : ''}.
        </p>
        <div className="pv-tags">
          <Tag tone="info">Sửa ML · Vân · 450 coin</Tag>
          <Tag tone="info">Narrative 1 spine · Linh · 300 coin</Tag>
          <Tag tone="info">CV Europass · Hòa · 250 coin</Tag>
        </div>
      </Card>
      <div className="pv-grid3 pv-gap">
        {classes.map((item) => (
          <Card key={item.teacher} title={item.teacher} note={`★ ${item.rating}`}>
            <Tag tone={item.label.startsWith('Mentor') ? 'premium' : undefined}>{item.label}</Tag>
            <p>{item.topic}</p>
            <p>
              <b>{item.price} coin</b>
              {tier === 'premium' && <small className="tp-muted"> · trừ coin package</small>}
            </p>
            <div className="pv-tags">
              {item.slots.map((slot) => (
                <span key={slot} className="pv-slot">
                  {slot}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <p className="tp-muted pv-gap">Không có lớp phù hợp: “Chưa có lớp phù hợp” · Báo khi có lớp · Xem chủ đề khác.</p>
    </StudentFrame>
  )
}

const days = ['T2 13/10', 'T3 14/10', 'T4 15/10', 'T5 16/10', 'T6 17/10']
const hours = ['18:00', '19:30', '21:00']

function Booking({ tier }: { tier: Tier }) {
  const price = 450
  const have = tier === 'free' ? 135 : tier === 'pro' ? 1120 : 5500
  const enough = have >= price
  const from = tier === 'free' ? 'Nhiệm vụ 35 (hạn 28/10) → Mua lẻ 100' : tier === 'pro' ? 'Pro 820 (hạn 15/03/2027)' : 'Package U18 (hạn 30/06/2027)'

  return (
    <StudentFrame tier={tier} active="Lớp Tutor">
      <div className="tp-journey">
        <div className="tp-step">
          <div className="pv-row">
            <div>
              <h4>Sửa ML / essay với Vân</h4>
              <span className="tp-muted">Cựu du học sinh Erasmus · ★ 4,8 · 63 buổi · video giới thiệu 1:20</span>
            </div>
            <Chips items={['60 phút', '90 phút']} on={1} />
          </div>
          <div className="pv-calendar">
            <span />
            {days.map((day) => (
              <b key={day}>{day}</b>
            ))}
            {hours.map((hour, row) => (
              <div key={hour} className="pv-calendar-row">
                <small>{hour}</small>
                {days.map((day, col) => {
                  const state = (row + col) % 4 === 0 ? 'taken' : row === 1 && col === 2 ? 'picked' : 'free'
                  return <span key={day} className={`pv-cell-slot ${state}`}>{state === 'taken' ? 'Đã đặt' : state === 'picked' ? 'Đang giữ' : 'Trống'}</span>
                })}
              </div>
            ))}
          </div>
          <small className="tp-muted">Giờ Việt Nam (UTC+7). Slot vừa có người đặt sẽ báo và tô lại slot trống.</small>
        </div>
        <aside className="tp-side">
          <Card title="Đơn đặt" note="Giữ slot 09:12">
            <ul className="tp-list">
              <li>T4 15/10 · 19:30 · 90 phút</li>
              <li>Giá: {price} coin</li>
              <li>Số dư: {have.toLocaleString('vi-VN')} coin</li>
              <li>Sau khi đặt: {enough ? (have - price).toLocaleString('vi-VN') : 'thiếu ' + (price - have)} coin</li>
              <li>Trừ từ: {from}</li>
            </ul>
            {enough ? <Btn kind="primary">Đặt lớp · {price} coin</Btn> : <Btn kind="primary">Nạp coin</Btn>}
            {!enough && <small className="tp-muted">Còn thiếu {price - have} coin. Slot vẫn được giữ trong lúc nạp.</small>}
          </Card>
          <Card title="Chính sách huỷ">
            <p>{policy}</p>
            <p className="tp-muted">Đổi lịch 1 lần, trước buổi học từ 24h.</p>
          </Card>
        </aside>
      </div>
    </StudentFrame>
  )
}

function Schedule({ tier }: { tier: Tier }) {
  return (
    <StudentFrame tier={tier} active="Lớp Tutor">
      <Chips items={['Sắp tới · 2', 'Đã học · 5', 'Đã huỷ · 1']} />
      {tier === 'premium' && <Banner tone="info">Mentor phụ trách (chị Thảo) thấy lịch này · <span className="tp-link">Nhắn mentor</span></Banner>}
      <div className="tp-grid">
        <Card title="IELTS Speaking · Anh Nam" note="Hôm nay 19:30 · còn 8 phút">
          <p className="tp-muted">Dưới 24h: huỷ sẽ không hoàn coin.</p>
          <div className="pv-actions">
            <Btn kind="primary">Vào lớp</Btn>
            <Btn disabled>Đổi lịch</Btn>
            <Btn kind="danger">Huỷ</Btn>
          </div>
        </Card>
        <Card title="Sửa ML · Vân" note="T4 15/10 · 19:30">
          <p className="tp-muted">Còn 2 ngày. Vào lớp mở trước 10 phút.</p>
          <div className="pv-actions">
            <Btn disabled>Vào lớp</Btn>
            <Btn>Đổi lịch</Btn>
            <Btn kind="danger">Huỷ</Btn>
          </div>
        </Card>
        <Card title="Huỷ lớp Sửa ML?" tone="alert">
          <p>
            Còn hơn 24h: <b>hoàn 450 coin</b> vào {tier === 'free' ? 'nguồn đã trừ' : tier === 'pro' ? 'coin Pro' : 'coin package'}.
          </p>
          <p className="tp-muted">Dưới 24h hoặc không vào lớp: không hoàn.</p>
          <div className="pv-actions">
            <Btn kind="ghost">Giữ lớp</Btn>
            <Btn kind="danger">Xác nhận huỷ</Btn>
          </div>
        </Card>
        <Card title="Đã học" note="Đánh giá, khiếu nại trong 48h">
          <ul className="tp-list">
            <li>CV Europass · Hòa · ★★★★★ · <Tag tone="ok">Hoàn tất</Tag></li>
            <li>Narrative · Linh · <span className="tp-link">Đánh giá · Khiếu nại</span></li>
            <li>HSK 3 · Mai · <Tag tone="info">Khiếu nại đang xử lý</Tag></li>
            <li>IELTS · Quân · <Tag tone="ok">Đã hoàn coin, Tutor vắng</Tag></li>
          </ul>
        </Card>
      </div>
    </StudentFrame>
  )
}

function Studio({ role }: { role: 'mentor' | 'admin' }) {
  if (role === 'admin') {
    return (
      <StaffFrame role="Admin" avatar="AD" active="Lớp Tutor" nav={['Tổng quan', 'Học sinh', 'Mentor', 'Lead', 'Lớp Tutor', 'Kiểm duyệt']}>
        <p className="tp-hello">2 khiếu nại chờ xử lý · 1 Tutor dưới 4,0.</p>
        <div className="tp-grid">
          <Card title="Khiếu nại" note="Trong 48h sau buổi" tone="alert" wide>
            <MockTable
              head={['Buổi', 'Học sinh', 'Lý do', '']}
              rows={[
                ['HSK 3 · Mai · 11/10', 'Gia Huy', 'Tutor vào trễ 20 phút', <span className="pv-actions"><Btn kind="primary">Hợp lệ · hoàn 100%</Btn><Btn>Không hợp lệ</Btn></span>],
                ['Narrative · Linh · 10/10', 'Thu Hà', 'Nội dung không như mô tả', <span className="pv-actions"><Btn kind="primary">Hợp lệ · hoàn 100%</Btn><Btn>Không hợp lệ</Btn></span>],
              ]}
            />
          </Card>
          <Card title="Đối soát tháng 10" note="Chia 75% / 25%">
            <ul className="tp-list">
              <li>Tutor: 38 buổi · 11.400 coin chờ đối soát</li>
              <li>Mentor trong giờ: 12 buổi · tính KPI</li>
              <li>Mentor ngoài giờ: 6 buổi · chia 50–60%</li>
            </ul>
          </Card>
          <Card title="Điểm thấp" tone="alert">
            <p>Mai · ★ 3,9 · tạm dừng nhận học sinh mới.</p>
          </Card>
        </div>
      </StaffFrame>
    )
  }

  return (
    <StaffFrame role="Mentor · Có mở lớp" avatar="NA" active="Studio lớp" nav={['Học sinh', 'Hàng chờ chấm', 'AI đề xuất', 'Lịch họp', 'Studio lớp']}>
      <p className="tp-hello">Studio lớp · dùng chung với Tutor</p>
      <div className="tp-grid">
        <Card title="Mở slot mới">
          <ul className="tp-list">
            <li>IELTS Speaking · 60 phút</li>
            <li>Giá: 300 coin (khung 60 phút 150–400)</li>
            <li>
              <span className="pv-check on" /> Ngoài giờ làm
            </li>
          </ul>
          <Btn kind="primary">Mở slot</Btn>
        </Card>
        <Card title="Giờ dạy tháng này" note="Giới hạn 30–40% giờ làm">
          <p>
            <b>22 giờ</b> / 176 giờ làm · 12% trên mức tối đa 40%
          </p>
          <Bar value={30} />
        </Card>
        <Card title="Sắp tới" wide>
          <ul className="tp-tasks">
            <li>Hôm nay 19:30 · Minh Anh · IELTS Speaking</li>
            <li>T5 18:00 · Quốc Bảo · IELTS Speaking</li>
          </ul>
          <small className="tp-muted">Mentor huỷ buổi: học sinh được hoàn 100% coin.</small>
        </Card>
        <Card title="Coin" note="Tháng 10">
          <ul className="tp-list">
            <li>Đã dạy: 18 buổi</li>
            <li>Chờ đối soát: 1.800 coin</li>
            <li>Đã đối soát: 3.300 coin</li>
          </ul>
        </Card>
        <Card title="Đánh giá" note="★ 4,6">
          <p className="tp-muted">Dưới 4,0 sẽ tạm dừng nhận học sinh.</p>
        </Card>
      </div>
    </StaffFrame>
  )
}

export function ClassListScreen() {
  return <RoleScreen name="Danh sách lớp" roles={studentRoles}>{(tier) => <ClassList tier={tier} />}</RoleScreen>
}

export function BookingScreen() {
  return <RoleScreen name="Chi tiết lớp và đặt chỗ" roles={studentRoles}>{(tier) => <Booking tier={tier} />}</RoleScreen>
}

export function ScheduleScreen() {
  return <RoleScreen name="Lịch học của tôi" roles={studentRoles}>{(tier) => <Schedule tier={tier} />}</RoleScreen>
}

export function StudioScreen() {
  return (
    <RoleScreen
      name="Studio mở lớp"
      roles={[
        { id: 'mentor', label: 'Mentor' },
        { id: 'admin', label: 'Admin' },
      ]}
    >
      {(role) => <Studio role={role} />}
    </RoleScreen>
  )
}
