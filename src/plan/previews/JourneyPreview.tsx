import { Banner, Btn, Card, Chips, Future, MockTable, RoleScreen, StaffFrame, StudentFrame, Tag, studentRoles, type Tier } from './kit'

const stepFourRows = [
  'Spine 1 câu và narrative',
  'Nháp CV theo chuẩn nước đến',
  'Nháp ML Erasmus, trích 2 learning outcome',
  'Danh sách người viết thư',
  'Biên lai dịch thuật, công chứng',
]

function DrawerBackdrop({ tier }: { tier: Tier }) {
  return (
    <div className="pv-backdrop">
      <h4>Bước 4: Chuẩn bị hồ sơ</h4>
      <ul className="tp-assign">
        {stepFourRows.map((row, index) => (
          <li key={row} className={index === 2 ? 'pv-picked' : undefined}>
            <span>{row}</span>
            <span className={`tp-status${index < 2 ? ' ok' : index === 2 ? ' warn' : ''}`}>
              {index < 2 ? (tier === 'premium' ? 'Đạt' : 'Đã đánh dấu') : index === 2 ? (tier === 'premium' ? 'Chưa đạt' : 'Đang làm') : 'Chưa làm'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AssignmentDrawer({ tier }: { tier: Tier }) {
  return (
    <StudentFrame tier={tier} active="Journey">
      <div className="pv-drawer-layout">
        <DrawerBackdrop tier={tier} />
        <aside className="pv-drawer">
          <header className="pv-row">
            <div>
              <small className="tp-muted">Bước 4 · Bản nháp</small>
              <h4>Nháp ML Erasmus Rotterdam</h4>
            </div>
            <span className="pv-close">×</span>
          </header>
          {tier !== 'free' && <Tag tone="info">Erasmus · hạn nháp còn 3 ngày</Tag>}
          <p>Viết 1 trang, trích ít nhất 2 learning outcome của chương trình (từ BT7), nối với 1 câu chuyện trong narrative.</p>

          {tier === 'premium' && (
            <Card title="Rubric mentor chấm" note="4 tiêu chí">
              <ul className="tp-list">
                <li>1. Đúng câu hỏi của trường · Đạt</li>
                <li className="pv-warn-text">2. Có learning outcome của chương trình · Chưa đạt</li>
                <li>3. Câu chuyện có bằng chứng</li>
                <li>4. Đúng độ dài, không lỗi ngữ pháp</li>
              </ul>
            </Card>
          )}

          <div className="pv-textarea">
            {tier === 'premium'
              ? 'v2 · Em chọn Erasmus vì môn “Strategy in Practice” giúp em…'
              : 'Em chọn Erasmus vì muốn học quản trị trong môi trường quốc tế…'}
          </div>
          <div className="pv-row">
            <span className="tp-muted">{tier === 'premium' ? 'Phiên bản: v1 (trả lại) · v2 (đang sửa)' : 'Lưu tự động · 2 phút trước'}</span>
            <span className="tp-link">Tải file</span>
          </div>

          {tier === 'free' && (
            <>
              <Card title="Kiểm tra">
                <p>Bạn tự đánh dấu xong, không ai chấm.</p>
              </Card>
              <Card title={<>Mua lượt chấm <Future /></>} tone="locked">
                <p>Free mua lượt chấm bài. Người chấm là AI hay mentor chưa chốt.</p>
              </Card>
              <Btn kind="primary">Đánh dấu xong</Btn>
            </>
          )}

          {tier === 'pro' && (
            <>
              <Card title="AI góp ý" note="4 / 10 lượt tháng này">
                <ul className="tp-list">
                  <li>Chưa nêu learning outcome nào của chương trình.</li>
                  <li>Đoạn 2 kể hoạt động CLB nhưng thiếu kết quả bằng số.</li>
                </ul>
                <span className="tp-link">Góp ý lại bản nháp</span>
              </Card>
              <Card title={<>Lượt chấm giới hạn <Future /></>} tone="locked">
                <p>Pro có số lượt chấm giới hạn. Người chấm là AI hay mentor chưa chốt.</p>
              </Card>
              <Btn kind="primary">Đánh dấu xong</Btn>
            </>
          )}

          {tier === 'premium' && (
            <>
              <Card title="Nhận xét" note="v1 · trả lại" tone="mentor">
                <p>“Chưa đạt tiêu chí 2. Thêm 2 learning outcome, nối với dự án CLB.”</p>
                <small className="tp-muted">Chị Thảo · hôm qua</small>
              </Card>
              <Banner tone="info">Bước 4 không phải điểm chặn: “Chưa đạt” chỉ cảnh báo, bạn vẫn làm tiếp bước sau.</Banner>
              <Btn kind="primary">Gửi mentor chấm v2</Btn>
            </>
          )}
        </aside>
      </div>
    </StudentFrame>
  )
}

const mentorStudents = [
  ['Minh Anh', 'Hà Lan · Bỉ · Đức', 'Bước 4', '2', '1'],
  ['Quốc Bảo', 'Phần Lan', 'Bước 3', '1', '0'],
  ['Thu Hà', 'Hà Lan', 'Bước 5', '0', '2'],
  ['Gia Huy', 'Đức · Pháp', 'Bước 2', '1', '0'],
]

function MentorBoard({ role }: { role: 'mentor' | 'admin' }) {
  if (role === 'admin') {
    return (
      <StaffFrame role="Admin" avatar="AD" active="Mentor" nav={['Tổng quan', 'Học sinh', 'Mentor', 'Lead', 'Lớp Tutor', 'Kiểm duyệt']}>
        <p className="tp-hello">2 học sinh Premium đã thanh toán, chưa có mentor.</p>
        <div className="tp-grid">
          <Card title="Chờ gán mentor" note="2 học sinh" tone="alert" wide>
            <MockTable
              head={['Học sinh', 'Gói', 'Nước', 'Thanh toán', '']}
              rows={[
                ['Lan Chi', 'U9', 'Hà Lan', 'PayOS · 10/10', <Btn kind="primary">Gán mentor</Btn>],
                ['Đức Minh', 'U18', 'Đức · Pháp', 'PayOS · 11/10', <Btn kind="primary">Gán mentor</Btn>],
              ]}
            />
          </Card>
          <Card title="Tải của mentor" note="Học sinh đang phụ trách" wide>
            <MockTable
              head={['Mentor', 'Học sinh', 'Chờ chấm', 'Trễ mốc', 'Chờ quá 48h']}
              rows={[
                ['Chị Thảo', '12', '4', '3', <Tag tone="warn">1 bài</Tag>],
                ['Anh Nam', '9', '1', '0', '0'],
                ['Chị Vy', '14', '6', '2', <Tag tone="warn">2 bài</Tag>],
              ]}
            />
          </Card>
        </div>
      </StaffFrame>
    )
  }

  return (
    <StaffFrame role="Mentor" avatar="TH" active="Học sinh" nav={['Học sinh', 'Hàng chờ chấm', 'AI đề xuất', 'Lịch họp', 'Studio lớp']}>
      <p className="tp-hello">4 bài chờ chấm, 3 việc trễ mốc. Chỉ học sinh Premium bạn phụ trách.</p>
      <Chips items={['Tất cả · 4', 'Có bài chờ chấm', 'Có trễ mốc']} />
      <MockTable
        head={['Học sinh', 'Nước', 'Bước hiện tại', 'Chờ chấm', 'Trễ mốc', '']}
        rows={mentorStudents.map(([name, country, step, waiting, late]) => [
          <b>{name}</b>,
          country,
          step,
          waiting === '0' ? '0' : <Tag tone="info">{waiting}</Tag>,
          late === '0' ? '0' : <Tag tone="warn">{late}</Tag>,
          <span className="tp-link">Mở</span>,
        ])}
      />
      <div className="tp-grid pv-gap">
        <Card title="Hàng chờ chấm" note="Cũ nhất trước">
          <ul className="tp-tasks">
            <li className="late">Minh Anh · ML Erasmus v2 · chờ 2 ngày</li>
            <li>Quốc Bảo · Bảng khoảng thiếu · chờ 5 giờ</li>
            <li>Gia Huy · Phân tích 6 trường · bước 2 điểm chặn</li>
          </ul>
        </Card>
        <Card title="Trễ mốc" note="Dời mốc báo cho học sinh">
          <ul className="tp-tasks">
            <li className="late">Thu Hà · Ảnh confirmation TU Delft · trễ 2 ngày</li>
            <li className="late">Minh Anh · Danh sách người viết thư · trễ 1 ngày</li>
          </ul>
          <div className="pv-actions">
            <Btn>Nhắc học sinh</Btn>
            <Btn kind="primary">Dời mốc</Btn>
          </div>
        </Card>
      </div>
      <p className="tp-muted pv-gap">“Chưa đạt” chặn bước sau ở bước 2, 3, 5, 6. Các bước khác chỉ cảnh báo.</p>
    </StaffFrame>
  )
}

export function AssignmentDrawerScreen() {
  return (
    <RoleScreen name="Assignment drawer" roles={studentRoles}>
      {(tier) => <AssignmentDrawer tier={tier} />}
    </RoleScreen>
  )
}

export function MentorBoardScreen() {
  return (
    <RoleScreen
      name="Mentor tracking board"
      roles={[
        { id: 'mentor', label: 'Mentor' },
        { id: 'admin', label: 'Admin' },
      ]}
    >
      {(role) => <MentorBoard role={role} />}
    </RoleScreen>
  )
}
