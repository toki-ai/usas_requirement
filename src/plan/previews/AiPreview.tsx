import { Banner, Btn, Card, Chips, MockTable, RoleScreen, StaffFrame, StudentFrame, Tag, studentRoles, type Tier } from './kit'

function Diff() {
  return (
    <ul className="pv-diff">
      <li className="add">+ Groningen · Nháp ML riêng · hạn 20/03</li>
      <li className="add">+ Groningen · Gửi brief người viết thư · hạn 01/03</li>
      <li className="del">− Maastricht · Nháp ML (đã bỏ trường)</li>
      <li className="chg">~ Thi thử IELTS lần 2 · 25/10 → 08/11</li>
    </ul>
  )
}

function Tuning({ tier }: { tier: Tier }) {
  return (
    <StudentFrame tier={tier} active="Journey">
      <p className="tp-hello">Journey Hà Lan · bạn vừa đổi Maastricht sang Groningen</p>
      {tier === 'free' && (
        <Card title="AI tinh chỉnh journey" tone="locked" wide>
          <p>Pro tự tính task và deadline theo từng trường mỗi khi bạn đổi hồ sơ hoặc danh sách trường.</p>
          <Btn kind="primary">Lên Pro</Btn>
        </Card>
      )}
      {tier === 'pro' && (
        <div className="tp-grid">
          <Card title="AI tinh chỉnh journey" note="Đã dùng 10 / 10 lượt tháng này" tone="alert" wide>
            <Banner tone="info">Đã lưu, sẽ chạy khi reset lượt ngày 01/11.</Banner>
            <p className="tp-muted">Thay đổi danh sách trường đã lưu. Hạn nộp từng trường vẫn tính lại ngay, chỉ phần AI đề xuất task chờ tới 01/11.</p>
          </Card>
          <Card title="Đề xuất lần trước" note="Lượt 10 · 09/10" wide>
            <Diff />
            <div className="pv-actions">
              <Btn kind="ghost">Bỏ qua</Btn>
              <Btn kind="primary">Áp dụng</Btn>
            </div>
          </Card>
        </div>
      )}
      {tier === 'premium' && (
        <div className="tp-grid">
          <Card title="AI tinh chỉnh journey" note={<Tag tone="warn">Chờ mentor duyệt</Tag>} tone="mentor" wide>
            <Diff />
            <p className="tp-muted">Chỉ xem. Mentor Thảo duyệt, sửa hoặc từ chối trong 24h.</p>
          </Card>
          <Card title="Lần trước" note="05/10">
            <p>Mentor đã sửa rồi áp dụng: dời hạn ML TU Delft sớm 1 tuần.</p>
          </Card>
          <Card title="Lần trước nữa" note="28/09">
            <p>Mentor từ chối · lý do: “Leiden vẫn giữ, chưa bỏ”.</p>
          </Card>
        </div>
      )}
    </StudentFrame>
  )
}

function MentorQueue({ role }: { role: 'mentor' | 'admin' }) {
  if (role === 'admin') {
    return (
      <StaffFrame role="Admin" avatar="AD" active="Mentor" nav={['Tổng quan', 'Học sinh', 'Mentor', 'Lead', 'Lớp Tutor', 'Kiểm duyệt']}>
        <p className="tp-hello">AI đề xuất chờ mentor · 3 quá 24h</p>
        <MockTable
          head={['Mentor', 'Đang chờ', 'Quá 24h', 'Lâu nhất', '']}
          rows={[
            ['Chị Thảo', '3', <Tag tone="bad">1</Tag>, '27 giờ', <span className="tp-link">Nhắc</span>],
            ['Chị Vy', '5', <Tag tone="bad">2</Tag>, '40 giờ', <span className="tp-link">Nhắc</span>],
            ['Anh Nam', '1', '0', '3 giờ', ''],
          ]}
        />
      </StaffFrame>
    )
  }

  return (
    <StaffFrame role="Mentor" avatar="TH" active="AI đề xuất" nav={['Học sinh', 'Hàng chờ chấm', 'AI đề xuất', 'Lịch họp', 'Studio lớp']}>
      <div className="pv-feed">
        <div>
          <Card title="Minh Anh · Hà Lan" note="Đổi Maastricht → Groningen · chờ 27 giờ" tone="alert">
            <Diff />
            <div className="pv-row">
              <span className="tp-muted">Sửa hạn trực tiếp:</span>
              <span className="pv-select">Thi thử lần 2: 08/11 ▾</span>
            </div>
            <div className="pv-actions">
              <Btn kind="primary">Duyệt</Btn>
              <Btn>Sửa rồi duyệt</Btn>
              <Btn kind="danger">Từ chối · ghi lý do</Btn>
            </div>
          </Card>
        </div>
        <aside className="tp-side">
          <Card title="Đang chờ" note="3">
            <ul className="tp-list">
              <li className="pv-warn-text">Minh Anh · 27 giờ</li>
              <li>Quốc Bảo · 6 giờ</li>
              <li>Gia Huy · 1 giờ</li>
            </ul>
          </Card>
        </aside>
      </div>
    </StaffFrame>
  )
}

function Forecast({ tier }: { tier: Tier }) {
  const full = tier === 'premium'
  return (
    <StudentFrame tier={tier} active="Journey">
      <div className="pv-tags">
        <span className="pv-select">Trường: Erasmus Rotterdam ▾</span>
        <span className="pv-select">Ngành: International Business ▾</span>
        <Tag tone="warn">Xem trước: khả năng có việc Trung bình</Tag>
      </div>
      {!full && (
        <div className="tp-grid pv-gap">
          <Card title="Báo cáo đầy đủ" note={tier === 'free' ? 'Ví: 135 coin' : 'Ví: 1.120 coin'} tone="locked" wide>
            <p className="tp-blur">CV dự kiến · khớp 7/10 yêu cầu của 34 JD · kỹ năng còn thiếu · điều kiện ở lại</p>
            <div className="pv-actions">
              <Btn kind="primary">Mở báo cáo đầy đủ · 150 coin</Btn>
              <Btn>Hẹn tư vấn 15 phút</Btn>
              <span className="tp-link">So sánh 3 trường · 350 coin</span>
            </div>
            {tier === 'free' && (
              <small className="tp-muted">Free mua được báo cáo đầy đủ bằng coin. Còn thiếu 15 coin · <span className="tp-link">Nạp coin</span></small>
            )}
          </Card>
        </div>
      )}
      {full && (
        <>
          <Banner tone="ok">Suất package 2 / 4: Hà Lan ✓, Bỉ ✓ đã dùng · Đức, Phần Lan còn suất. Báo cáo này không trừ coin.</Banner>
          <div className="tp-grid">
            <Card title="Khớp 7 / 10 yêu cầu của 34 JD">
              <ul className="tp-list">
                <li>Business Analyst Intern · Rotterdam</li>
                <li>Junior Supply Chain · Den Haag</li>
                <li>Marketing Trainee · Amsterdam</li>
              </ul>
            </Card>
            <Card title="Kỹ năng còn thiếu">
              <ul className="tp-list">
                <li>SQL cơ bản · tiếng Hà Lan A2</li>
              </ul>
              <span className="tp-link">Thêm vào journey</span>
            </Card>
            <Card title="Khả năng có việc" note="Nguồn: UWV, cập nhật 09/2026">
              <p>
                <b>55–70%</b> trong 12 tháng · độ tin cậy trung bình
              </p>
            </Card>
            <Card title="Điều kiện ở lại">
              <p>Orientation year 12 tháng sau tốt nghiệp, rồi highly skilled migrant theo mức lương tối thiểu.</p>
            </Card>
            <Card title="Ghi chú của mentor" tone="mentor" wide>
              <p>“Thêm 1 dự án dữ liệu vào bước 3 để bù SQL.” · Chị Thảo</p>
            </Card>
          </div>
          <div className="pv-actions pv-gap">
            <Btn>Cập nhật · 50 coin</Btn>
          </div>
        </>
      )}
    </StudentFrame>
  )
}

const scholarships = [
  ['Holland Scholarship', '01/02', 72, 'IELTS 6.5 → 7.0'],
  ['Orange Tulip', '01/03', 64, 'Thư giới thiệu'],
  ['Erasmus Excellence', '15/01', 58, 'GPA 8.0 → 8.5'],
  ['Leiden Excellence', '01/02', 41, 'Bài luận, IELTS 7.0'],
] as const

function Scholarship({ tier }: { tier: Tier }) {
  return (
    <StudentFrame tier={tier} active="Học bổng">
      <div className="tp-journey-head">
        <Chips items={['Hà Lan', 'Bỉ', 'Đức', 'Cử nhân', 'Thạc sĩ']} />
        {tier === 'free' && <Tag>Đã dùng 3 / 3 lượt tháng này</Tag>}
      </div>
      <div className="tp-grid">
        {scholarships.map(([name, deadline, match, missing], index) => {
          const hidden = tier === 'free' && index > 0
          return (
            <Card key={name} title={name} note={`Hạn ${deadline}`}>
              <p>
                Match: {hidden ? <span className="tp-blur">••%</span> : <b>{match}%</b>}
              </p>
              {tier !== 'free' && <small className="tp-muted">Còn thiếu: {missing}</small>}
              <div className="pv-actions">
                {hidden ? <Btn>Mở · 5 coin</Btn> : <Btn kind="ghost">Theo dõi</Btn>}
                {tier === 'premium' && index === 0 && <Tag tone="premium">Mentor đã chọn apply</Tag>}
                {tier === 'premium' && index > 0 && <Btn>Đề xuất mentor</Btn>}
              </div>
            </Card>
          )
        })}
      </div>
    </StudentFrame>
  )
}

export function TuningScreen() {
  return <RoleScreen name="AI tinh chỉnh journey" roles={studentRoles}>{(tier) => <Tuning tier={tier} />}</RoleScreen>
}

export function MentorQueueScreen() {
  return (
    <RoleScreen
      name="Hàng chờ AI đề xuất"
      roles={[
        { id: 'mentor', label: 'Mentor' },
        { id: 'admin', label: 'Admin' },
      ]}
    >
      {(role) => <MentorQueue role={role} />}
    </RoleScreen>
  )
}

export function ForecastScreen() {
  return <RoleScreen name="AI dự báo việc làm" roles={studentRoles}>{(tier) => <Forecast tier={tier} />}</RoleScreen>
}

export function ScholarshipScreen() {
  return <RoleScreen name="Học bổng match %" roles={studentRoles}>{(tier) => <Scholarship tier={tier} />}</RoleScreen>
}
