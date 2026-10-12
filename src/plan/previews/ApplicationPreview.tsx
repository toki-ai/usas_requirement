import { Banner, Bar, Btn, Card, Chips, MockTable, RoleScreen, StudentFrame, Tag, studentRoles, type Tier } from './kit'

const statusTone = (status: string) =>
  status === 'Offer' ? 'ok' : status === 'Từ chối' ? 'bad' : status === 'Chưa nộp' ? undefined : 'info'

function SchoolList({ tier }: { tier: Tier }) {
  const limit = tier === 'free' ? 2 : tier === 'pro' ? 8 : 4
  const rows =
    tier === 'free'
      ? [
          ['TU Delft', 'Reach', <span className="tp-blur">15/01</span>, 40, 'Chưa nộp'],
          ['Erasmus Rotterdam', 'Match', <span className="tp-blur">15/01</span>, 25, 'Chưa nộp'],
        ]
      : tier === 'pro'
        ? [
            ['TU Delft', 'Reach', '15/01 · còn 94 ngày', 60, 'Đã nộp'],
            ['Erasmus Rotterdam', 'Match', '15/01 · còn 94 ngày', 80, 'Phỏng vấn'],
            ['Leiden', 'Match', '01/04 · còn 170 ngày', 30, 'Chưa nộp'],
            ['Maastricht', 'Safe', '01/05 · còn 200 ngày', 20, 'Chưa nộp'],
            ['Groningen', 'Safe', '01/05 · còn 200 ngày', 10, 'Chưa nộp'],
          ]
        : [
            ['TU Delft', 'Reach', '15/01 · còn 94 ngày', 70, 'Đã nộp'],
            ['Erasmus Rotterdam', 'Match', '15/01 · còn 94 ngày', 85, 'Phỏng vấn'],
            ['Leiden', 'Match', '01/04 · còn 170 ngày', 40, 'Chưa nộp'],
            ['Tilburg', 'Safe', '01/05 · chờ mentor duyệt', 0, 'Chưa nộp'],
          ]

  return (
    <StudentFrame tier={tier} active="Trường">
      <div className="tp-journey-head">
        <div>
          <h4>Trường của tôi</h4>
          <span className="tp-muted">
            {rows.length} / {limit} suất trường{tier === 'premium' ? ' Hà Lan trong package' : ''}
          </span>
        </div>
        <div className="pv-actions">
          {tier === 'pro' && <Tag tone="warn">Đã khóa đổi nước · đã nộp trường đầu</Tag>}
          <Btn kind="primary" disabled={tier === 'free'}>
            + Thêm trường
          </Btn>
        </div>
      </div>
      {tier === 'premium' && <Chips items={['Hà Lan · 4', 'Bỉ · 2', 'Đức · 1', 'Phần Lan · chưa mở']} />}
      <MockTable
        head={['Trường', 'Mức', 'Hạn nộp', 'Giấy tờ', 'Trạng thái']}
        rows={rows.map(([name, level, deadline, done, status]) => [
          <div className="pv-cell">
            <b>{name}</b>
            {tier === 'premium' && (name === 'Tilburg' ? <Tag tone="warn">Chờ mentor duyệt</Tag> : <Tag tone="premium">Mentor làm hồ sơ</Tag>)}
          </div>,
          level,
          deadline,
          <div className="pv-cell">
            <Bar value={done as number} />
            <small className="tp-muted">{done as number}%</small>
          </div>,
          <Tag tone={statusTone(status as string)}>{status}</Tag>,
        ])}
      />
      {tier === 'free' && (
        <div className="tp-grid pv-gap">
          <Card title="Hết suất trường" note="2 / 2" tone="locked" wide>
            <p>Muốn thêm trường thứ 3: bỏ 1 trường đang xem, hoặc lên Pro để có 8 trường và hạn tính riêng từng trường.</p>
            <div className="pv-actions">
              <Btn>Bỏ 1 trường</Btn>
              <Btn kind="primary">Lên Pro · 4.900.000đ</Btn>
            </div>
          </Card>
        </div>
      )}
      {tier === 'premium' && <p className="tp-muted pv-gap">Thêm hoặc đổi trường trong package gửi mentor duyệt trước khi tạo checklist.</p>}
    </StudentFrame>
  )
}

const checklist = [
  ['Bảng điểm 3 năm, bản dịch công chứng', 'Đã có', true],
  ['IELTS 6.5 trở lên', 'Đã có · dùng chung', true],
  ['Motivation Letter riêng cho Erasmus', 'Đang sửa', false],
  ['CV theo mẫu Europass', 'Đã có', true],
  ['1 thư giới thiệu', 'Chưa có', false],
] as const

function SchoolApplication({ tier }: { tier: Tier }) {
  return (
    <StudentFrame tier={tier} active="Trường">
      <div className="tp-journey-head">
        <div>
          <h4>Erasmus Rotterdam · BSc International Business</h4>
          <span className="tp-muted">
            {tier === 'free' ? 'Hạn nộp: lên Pro để xem hạn riêng' : 'Hạn nộp 15/01 · phí 100€ · cổng Studielink'}
          </span>
        </div>
        <span className="tp-link">Mở cổng nộp của trường ↗</span>
      </div>
      {tier === 'pro' && <Banner tone="warn">Còn 3 ngày tới hạn nháp ML · thư giới thiệu chưa có.</Banner>}

      <div className="tp-journey">
        <div className="tp-step">
          <h4>{tier === 'free' ? 'Checklist chung Hà Lan' : 'Checklist của Erasmus'}</h4>
          <p className="tp-muted">
            {tier === 'free' ? 'Hệ thống chỉ kiểm tra đã có file, không kiểm tra theo trường.' : 'Giấy dùng chung (IELTS, bảng điểm) lấy lại từ trường khác.'}
          </p>
          <ul className="tp-assign">
            {checklist.map(([label, status, ok]) => (
              <li key={label}>
                <span>{label}</span>
                <span className={`tp-status${ok ? ' ok' : status === 'Đang sửa' ? ' warn' : ''}`}>{status}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="tp-side">
          {tier === 'premium' ? (
            <Card title="Rà soát trước khi nộp" note="2 lớp" tone="mentor">
              <ul className="tp-list">
                <li>Mentor chính · Chị Thảo · Đã duyệt</li>
                <li>Mentor phụ · Anh Nam · Đang xem</li>
              </ul>
            </Card>
          ) : (
            <Card title="Kiểm tra trước khi nộp">
              <p>3 / 5 giấy tờ đủ. Bạn tự kiểm tra và nộp.</p>
            </Card>
          )}
          {tier === 'pro' && (
            <Card title="Mốc theo hạn trường">
              <ul className="tp-list">
                <li>Nháp ML · 16/10</li>
                <li>Thư giới thiệu · 01/11</li>
                <li>Nộp · 15/01</li>
              </ul>
            </Card>
          )}
          <Card title="Đã nộp ở cổng trường?">
            <p>Tải ảnh xác nhận hoặc email của trường để chuyển trạng thái.</p>
            <Btn kind="primary" disabled={tier === 'premium'}>
              Tôi đã nộp
            </Btn>
            {tier === 'premium' && <small className="tp-muted">Mở khi cả 2 mentor duyệt.</small>}
          </Card>
        </aside>
      </div>
    </StudentFrame>
  )
}

function Results({ tier }: { tier: Tier }) {
  return (
    <StudentFrame tier={tier} active="Trường">
      <p className="tp-hello">Kết quả từng trường</p>
      <div className="pv-timeline">
        {[
          ['TU Delft', ['Đã nộp', 'Đang xét', 'Từ chối'], 'bad'],
          ['Erasmus Rotterdam', ['Đã nộp', 'Phỏng vấn', 'Offer'], 'ok'],
          ['Leiden', ['Đã nộp', 'Waitlist'], 'info'],
        ].map(([school, steps, tone]) => (
          <div key={school as string} className="pv-timeline-row">
            <b>{school as string}</b>
            <div>
              {(steps as string[]).map((step, index, all) => (
                <Tag key={step} tone={index === all.length - 1 ? (tone as 'ok' | 'bad' | 'info') : undefined}>
                  {step}
                </Tag>
              ))}
            </div>
            <span className="tp-link">{tier === 'premium' ? 'Mentor đã cập nhật' : 'Cập nhật + ảnh email'}</span>
          </div>
        ))}
      </div>
      <Card title="So sánh offer" note="1 offer · Leiden còn waitlist" wide>
        <MockTable
          head={['', 'Erasmus Rotterdam', 'Leiden (nếu có)']}
          rows={[
            ['Học phí sau học bổng', '€ 9.100 / năm', '€ 11.500 / năm'],
            ['Sinh hoạt phí', '€ 1.100 / tháng', '€ 1.050 / tháng'],
            ['Hạn xác nhận', '01/05', '—'],
            ['Tiền cọc', '€ 500', '—'],
          ]}
        />
      </Card>
      <div className="tp-grid pv-gap">
        {tier === 'premium' ? (
          <Card title="Chốt offer cùng mentor" tone="mentor">
            <p>Buổi chốt với chị Thảo · thứ 5, 19:30. Nút chấp nhận mở sau buổi họp.</p>
            <Btn kind="primary" disabled>
              Chấp nhận offer
            </Btn>
          </Card>
        ) : (
          <Card title="Chấp nhận 1 offer">
            <p>Tải biên lai cọc. Các trường còn lại sẽ đóng, bước 7–9 mở.</p>
            <Btn kind="primary">Chấp nhận Erasmus</Btn>
          </Card>
        )}
        <Card title="Phỏng vấn sắp tới">
          <p>Leiden có thể mời phỏng vấn khi rời waitlist.</p>
          <span className="tp-link">{tier === 'premium' ? 'Hẹn mentor luyện phỏng vấn' : 'Đặt lớp Tutor luyện phỏng vấn · coin'}</span>
        </Card>
        <Card title="Nếu không có offer" tone="locked" wide>
          <p>Còn kịp thì thêm trường hạn muộn, không thì về bước 2 cho kỳ sau, giữ lại bài đã làm.</p>
        </Card>
      </div>
    </StudentFrame>
  )
}

export function SchoolListScreen() {
  return <RoleScreen name="Danh sách trường" roles={studentRoles}>{(tier) => <SchoolList tier={tier} />}</RoleScreen>
}

export function SchoolApplicationScreen() {
  return <RoleScreen name="Hồ sơ một trường" roles={studentRoles}>{(tier) => <SchoolApplication tier={tier} />}</RoleScreen>
}

export function ResultsScreen() {
  return <RoleScreen name="Kết quả và offer" roles={studentRoles}>{(tier) => <Results tier={tier} />}</RoleScreen>
}
