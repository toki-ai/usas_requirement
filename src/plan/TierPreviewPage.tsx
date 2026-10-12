import { useState } from 'react'
import { withBase } from '../basePath'
import { journeyRoadmap } from './journeySteps'
import { TableOfContents } from './TableOfContents'

type Tier = 'free' | 'pro' | 'premium'
type Screen = 'dashboard' | 'journey'

const toc = [
  { id: 'tier-preview', label: 'Benefit 3 gói và UI preview' },
  { id: 'giu-nguyen', label: 'Những gì đã hợp lý' },
  { id: 'can-chinh', label: '5 đề xuất và quyết định' },
  { id: 'bang-de-xuat', label: 'Bảng benefit đề xuất' },
  { id: 'ui-preview', label: 'UI preview' },
  { id: 'khac-nhau', label: 'Khác nhau giữa 3 màn hình' },
] as const

const tierLabel: Record<Tier, string> = { free: 'Free', pro: 'Pro', premium: 'Premium · U18' }

const steps = journeyRoadmap.stages
  .flatMap((stage) => stage.steps)
  .filter((step) => /^\d+$/.test(step.number))

const stepTwo = steps.find((step) => step.number === '2')
const stepFour = steps.find((step) => step.number === '4')

function StepBar({ current, lockedFrom }: { current: number; lockedFrom: number }) {
  return (
    <ol className="tp-stepbar">
      {steps.map((step) => {
        const n = Number(step.number)
        const state = n < current ? 'done' : n === current ? 'now' : n >= lockedFrom ? 'locked' : 'todo'
        return (
          <li key={step.id} className={state}>
            <span>{n < current ? '✓' : step.number}</span>
            <small>{step.name}</small>
          </li>
        )
      })}
    </ol>
  )
}

function Frame({ tier, screen, children }: { tier: Tier; screen: Screen; children: React.ReactNode }) {
  return (
    <div className="tp-frame">
      <div className="tp-topbar">
        <strong>USAS</strong>
        <span className={`tp-badge ${tier}`}>{tierLabel[tier]}</span>
        <span className="tp-spacer" />
        <span className="tp-coin">
          {tier === 'free' ? '35 / 50 coin tháng này' : tier === 'pro' ? '820 coin · hết hạn cùng Pro' : '5.400 / 9.900 coin trong gói'}
        </span>
        <span className="tp-avatar">MA</span>
      </div>
      <div className="tp-body">
        <nav className="tp-nav">
          {['Dashboard', 'Journey', 'Trường', 'Học bổng', 'Lớp Tutor', 'Feed'].map((item) => (
            <span
              key={item}
              className={(screen === 'dashboard' && item === 'Dashboard') || (screen === 'journey' && item === 'Journey') ? 'on' : undefined}
            >
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

function Card({ title, note, children, wide, tone }: { title: string; note?: string; children: React.ReactNode; wide?: boolean; tone?: 'locked' | 'alert' | 'mentor' }) {
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

function FreeDashboard() {
  return (
    <>
      <p className="tp-hello">Chào Minh Anh. Bạn đang xem đường đi du học Hà Lan.</p>
      <div className="tp-grid">
        <Card title="Journey Hà Lan" note="9 bước chung" wide>
          <StepBar current={2} lockedFrom={7} />
          <p className="tp-muted">Mốc gợi ý theo D, chưa có hạn riêng từng trường. Bước 7–9 mở khi có offer.</p>
        </Card>
        <Card title="Trường đang xem" note="2 / 2">
          <ul className="tp-list">
            <li>TU Delft · Reach</li>
            <li>Erasmus Rotterdam · Match</li>
            <li className="tp-lock">Thêm trường thứ 3 · cần Pro</li>
          </ul>
        </Card>
        <Card title="Match % học bổng" note="Đã dùng 3 / 3 lượt">
          <ul className="tp-list">
            <li>Holland Scholarship · 72%</li>
            <li className="tp-blur">Orange Tulip · ••%</li>
            <li className="tp-blur">Erasmus Excellence · ••%</li>
          </ul>
          <span className="tp-link">Mở 1 học bổng · 5 coin</span>
        </Card>
        <Card title="AI dự báo việc làm" note="Xem trước">
          <p>Business tại Rotterdam: khả năng có việc <b>Trung bình</b>.</p>
          <span className="tp-link">Mở báo cáo đầy đủ · 150 coin</span>
        </Card>
        <Card title="Nhiệm vụ nhận coin" note="Còn 15 coin tháng này">
          <ul className="tp-list">
            <li>Hoàn thiện hồ sơ · +10</li>
            <li>Đăng 1 bài chia sẻ · +5</li>
            <li>Mời 1 bạn · thưởng khi bạn mua gói</li>
          </ul>
        </Card>
        <Card title="Tự làm có hạn từng trường" wide tone="locked">
          <p>Lên Pro 4.900.000đ: tối đa 8 trường, hạn tính riêng từng trường, thông báo trước hạn, kèm 1.000 coin.</p>
        </Card>
      </div>
    </>
  )
}

function ProDashboard() {
  return (
    <>
      <p className="tp-hello">Tuần này có 3 việc, 1 việc sắp tới hạn.</p>
      <div className="tp-grid">
        <Card title="Việc tuần này" note="Theo hạn từng trường" wide tone="alert">
          <ul className="tp-tasks">
            <li className="late">
              <b>Erasmus Rotterdam</b> · Nháp ML · còn 3 ngày
            </li>
            <li>
              <b>TU Delft</b> · Gửi brief cho người viết thư · còn 12 ngày
            </li>
            <li>
              <b>Chung</b> · Thi thử IELTS lần 2 · còn 9 ngày
            </li>
          </ul>
        </Card>
        <Card title="Journey Hà Lan" note="Bước 4 / 9" wide>
          <StepBar current={4} lockedFrom={7} />
        </Card>
        <Card title="Trường" note="5 / 8">
          <ul className="tp-list">
            <li>TU Delft · hạn 15/01</li>
            <li>Erasmus Rotterdam · hạn 15/01</li>
            <li>Leiden · hạn 01/04</li>
            <li>Maastricht · hạn 01/05</li>
            <li>Groningen · hạn 01/05</li>
          </ul>
        </Card>
        <Card title="Học bổng phù hợp" note="Không giới hạn">
          <ul className="tp-list">
            <li>Holland Scholarship · 72% · thiếu IELTS 6.5</li>
            <li>Orange Tulip · 64% · thiếu thư giới thiệu</li>
          </ul>
        </Card>
        <Card title="AI tinh chỉnh journey" note="4 / 10 lượt tháng này">
          <p>Lần gần nhất: thêm Groningen, journey thêm 6 task.</p>
        </Card>
        <Card title="Sửa essay" note="Mới">
          <p>Buổi Tutor 90 phút · 250–600 coin. Ví còn 820 coin.</p>
          <span className="tp-link">Đặt lớp sửa ML</span>
        </Card>
        <Card title="Thông báo" note="Trong app">
          <ul className="tp-list">
            <li>Erasmus · hạn nháp ML còn 2 ngày</li>
            <li>TU Delft · còn 14 ngày tới hạn nộp</li>
          </ul>
        </Card>
        <Card title="Còn 45 ngày tới hạn đầu tiên" wide tone="locked">
          <p>Muốn có mentor duyệt ML và rà soát trước khi nộp? Lên package trong 6 tháng được trừ 4.900.000đ.</p>
          <span className="tp-link">Hẹn tư vấn 15 phút</span>
        </Card>
      </div>
    </>
  )
}

function PremiumDashboard() {
  return (
    <>
      <p className="tp-hello">Mentor Thảo đã chấm 1 bài. 1 bài đang chờ chấm.</p>
      <div className="tp-tabs">
        {['Hà Lan · bước 4', 'Bỉ · bước 3', 'Đức · bước 2', 'Phần Lan · chưa mở'].map((tab, index) => (
          <span key={tab} className={index === 0 ? 'on' : undefined}>
            {tab}
          </span>
        ))}
      </div>
      <div className="tp-grid">
        <Card title="Mentor của tôi" note="Buổi tới: thứ 5, 19:30" tone="mentor">
          <p>
            <b>Chị Thảo</b> · mentor hồ sơ, phụ trách 4 trường
          </p>
          <span className="tp-link">Nhắn mentor</span>
        </Card>
        <Card title="Chờ xử lý" note="3 việc" tone="alert">
          <ul className="tp-tasks">
            <li className="late">ML Erasmus · mentor trả lại · chưa đạt tiêu chí 2</li>
            <li>CV · đã nộp · chờ mentor chấm</li>
            <li>Bước 3 Bỉ · buổi chốt timeline với mentor thứ 5</li>
          </ul>
        </Card>
        <Card title="Journey Hà Lan" note="Bước 4 / 9" wide>
          <StepBar current={4} lockedFrom={7} />
        </Card>
        <Card title="Quyền lợi gói U18">
          <ul className="tp-list">
            <li>4 nước · 4 trường mentor làm hồ sơ</li>
            <li>Apply học bổng · 1 / 2</li>
            <li>Ngoại khóa · 1 / 2 hoạt động</li>
            <li>AI dự báo · 2 / 4 báo cáo</li>
          </ul>
        </Card>
        <Card title="Coin trong gói" note="U18 · 9.900 coin, đổi từ 33 giờ">
          <p>
            Còn <b>5.400 coin</b>. Đã dùng 4.500 coin cho 12 lớp Tutor. Hết hạn cùng gói.
          </p>
          <span className="tp-link">Đặt lớp Documents</span>
        </Card>
        <Card title="Thông báo" note="Bạn và mentor cùng nhận">
          <p>ML Erasmus còn 3 ngày tới hạn, đang bị mentor trả lại.</p>
        </Card>
      </div>
    </>
  )
}

const assignmentsFor = (tier: Tier) =>
  (tier === 'free' ? stepTwo : stepFour)?.assignments.map((assignment, index) => {
    if (tier === 'free') return { ...assignment, status: index < 1 ? 'Đã đánh dấu xong' : 'Chưa làm', school: null }
    if (tier === 'pro') {
      const school = index === 2 ? 'Erasmus · còn 3 ngày' : index === 3 ? 'TU Delft · còn 12 ngày' : null
      return { ...assignment, status: index < 2 ? 'Xong' : index === 2 ? 'Sắp tới hạn' : 'Chưa làm', school }
    }
    const status = ['Mentor chấm: Đạt sâu', 'Chờ mentor chấm', 'Mentor trả lại: Chưa đạt', 'Chưa làm', 'Chưa làm'][index] ?? 'Chưa làm'
    const school = index === 2 ? 'Erasmus · còn 3 ngày' : index === 3 ? 'TU Delft · còn 12 ngày' : null
    return { ...assignment, status, school }
  })

function JourneyScreen({ tier }: { tier: Tier }) {
  const current = tier === 'free' ? 2 : 4
  const step = steps.find((item) => Number(item.number) === current)
  const rows = assignmentsFor(tier) ?? []

  return (
    <>
      <div className="tp-journey-head">
        <div>
          <h4>Journey Hà Lan</h4>
          <span className="tp-muted">
            {tier === 'free'
              ? '2 trường đang xem · mốc gợi ý theo D'
              : tier === 'pro'
                ? '5 trường · D = 15/01 · thông báo trước hạn trong app'
                : '4 trường mentor làm hồ sơ · timeline đã khóa ở bước 3'}
          </span>
        </div>
        {tier === 'premium' && <span className="tp-badge premium">Mentor Thảo theo dõi</span>}
      </div>
      <StepBar current={current} lockedFrom={7} />

      <div className="tp-journey">
        <div className="tp-step">
          <h4>
            Bước {step?.number}: {step?.name}
          </h4>
          <p className="tp-muted">{step?.goal}</p>
          <ul className="tp-assign">
            {rows.map((row) => (
              <li key={row.text}>
                <div>
                  <span>{row.text}</span>
                  {row.school && <small className="tp-school">{row.school}</small>}
                </div>
                <span className={`tp-status ${/Chưa đạt|Sắp tới/.test(row.status) ? 'warn' : /Đạt|Xong|xong/.test(row.status) ? 'ok' : ''}`}>
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="tp-side">
          {tier === 'free' && (
            <>
              <Card title="Hạn từng trường" tone="locked">
                <p className="tp-blur">TU Delft · 15/01 · 4 giấy tờ</p>
                <p className="tp-blur">Erasmus · 15/01 · 5 giấy tờ</p>
                <span className="tp-link">Pro tính hạn riêng từng trường</span>
              </Card>
              <Card title="Kiểm tra">
                <p>Bạn tự đánh dấu xong. Không ai chấm.</p>
              </Card>
              <Card title="Mua lượt chấm" note="Tương lai" tone="locked">
                <p>Người chấm là AI hay mentor chưa chốt.</p>
              </Card>
              <Card title="Cần người tư vấn?">
                <span className="tp-link">Hẹn tư vấn 15 phút</span>
              </Card>
            </>
          )}
          {tier === 'pro' && (
            <>
              <Card title="Cảnh báo" tone="alert">
                <p>Nháp ML Erasmus còn 3 ngày. Thi thử lần 2 chưa có điểm.</p>
              </Card>
              <Card title="AI góp ý" note="4 / 10 lượt">
                <p>Gửi nháp ML để AI so với learning outcome của chương trình.</p>
                <span className="tp-link">Góp ý bản nháp</span>
              </Card>
              <Card title="Lượt chấm giới hạn" note="Tương lai" tone="locked">
                <p>Người chấm là AI hay mentor chưa chốt.</p>
              </Card>
              <Card title="Sửa với người thật">
                <p>Tutor sửa essay · 250–600 coin / 90 phút.</p>
              </Card>
            </>
          )}
          {tier === 'premium' && (
            <>
              <Card title="Mentor nhận xét" tone="mentor">
                <p>“ML Erasmus chưa nêu learning outcome nào của chương trình. Thêm 2 cái, nối với dự án CLB.”</p>
                <small className="tp-muted">Chị Thảo · hôm qua</small>
              </Card>
              <Card title="Điểm chốt">
                <p>Bước 5 cần mentor chính và mentor phụ cùng xem trước khi nộp.</p>
                <p className="tp-muted">“Chưa đạt” chặn bước sau ở bước 2, 3, 5, 6. Bước 4 chỉ cảnh báo.</p>
              </Card>
              <Card title="Lớp gợi ý">
                <p>Documents thực hành · dùng coin trong gói.</p>
              </Card>
            </>
          )}
        </aside>
      </div>
    </>
  )
}

const roleToggle = [
  { id: 'free', label: 'Free' },
  { id: 'pro', label: 'Pro' },
  { id: 'premium', label: 'Premium' },
] as const

function ScreenMock({ tier, screen }: { tier: Tier; screen: Screen }) {
  return (
    <Frame tier={tier} screen={screen}>
      {screen === 'journey' ? (
        <JourneyScreen tier={tier} />
      ) : tier === 'free' ? (
        <FreeDashboard />
      ) : tier === 'pro' ? (
        <ProDashboard />
      ) : (
        <PremiumDashboard />
      )}
    </Frame>
  )
}

export function TierScreen({ screen }: { screen: Screen }) {
  const [tier, setTier] = useState<Tier>('free')
  const title = screen === 'dashboard' ? 'Dashboard' : 'Journey'

  return (
    <div className="tier-screen" data-screen={screen} data-tier={tier}>
      <div className="tp-controls">
        <div role="tablist" aria-label={`${title} role`}>
          {roleToggle.map((role) => (
            <button
              key={role.id}
              type="button"
              role="tab"
              aria-selected={tier === role.id}
              className={tier === role.id ? 'on' : undefined}
              onClick={() => setTier(role.id)}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>
      <ScreenMock tier={tier} screen={screen} />
    </div>
  )
}

export function TierUiPreview() {
  const [tier, setTier] = useState<Tier>('free')
  const [screen, setScreen] = useState<Screen>('dashboard')

  return (
    <>
      <div className="tp-controls">
        <div role="tablist" aria-label="Chọn gói">
          {(['free', 'pro', 'premium'] as const).map((value) => (
            <button key={value} type="button" role="tab" aria-selected={tier === value} className={tier === value ? 'on' : undefined} onClick={() => setTier(value)}>
              {tierLabel[value]}
            </button>
          ))}
        </div>
        <div role="tablist" aria-label="Chọn màn hình">
          {(
            [
              ['dashboard', 'Dashboard'],
              ['journey', 'Trang journey'],
            ] as const
          ).map(([value, label]) => (
            <button key={value} type="button" role="tab" aria-selected={screen === value} className={screen === value ? 'on' : undefined} onClick={() => setScreen(value)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <ScreenMock tier={tier} screen={screen} />
    </>
  )
}

export function TierPreviewPage() {
  return (
    <main className="page has-toc">
      <TableOfContents items={toc} />
      <div className="doc article tp-doc">
        <a className="back" href={withBase('/#goi-ba-tier')}>
          ← Về Student journey
        </a>
        <h1 id="tier-preview">Benefit 3 gói và UI preview</h1>
        <p className="lead">
          Rà lại bảng benefit Free, Pro, Premium xem đã hợp lý chưa, rồi xem mỗi gói nhìn thấy dashboard và trang journey
          ra sao. Dữ liệu trong preview là minh họa: học sinh Minh Anh, mục tiêu Hà Lan, ngành Business.
        </p>

        <h2 id="giu-nguyen">Những gì đã hợp lý</h2>
        <ul>
          <li>
            <strong>Ba nấc theo mức tự làm:</strong> xem đường đi, tự đi có bản đồ, có người dẫn. Học sinh hiểu ngay khác
            nhau ở đâu.
          </li>
          <li>
            <strong>Free khóa phần cá nhân hóa, không khóa đường đi.</strong> Học sinh thấy đủ 9 bước và assignment, chỉ
            thiếu hạn từng trường, trường thứ 3 và match % sau lượt thứ 3.
          </li>
          <li>
            <strong>Pro mua một lần theo journey, trừ vào package trong 6 tháng.</strong> Rủi ro mua thấp, và Pro thành
            bước đệm lên package.
          </li>
          <li>
            <strong>Pro chỉ 1 nước, đổi nước tối đa 2 lần, khóa sau khi nộp.</strong> Chặn Pro thành package giá rẻ.
          </li>
        </ul>

        <h2 id="can-chinh">5 đề xuất và quyết định</h2>
        <ol>
          <li>
            <strong>Quyền lợi Premium giữ nguyên.</strong> Package U3 đến U30 đã bán offline theo brochure, đổi quyền lợi lúc
            này sẽ không khớp với khách đã mua. Không tách mức mentor theo U3, U9, U27. Quyền lợi package giữ như brochure,
            chỉ đổi giờ học sang coin như plan đã chốt.
          </li>
          <li>
            <strong>Pro gặp ngõ cụt ở essay. Đã thêm.</strong> Plan đã có buổi Tutor 90 phút sửa essay giá 250–600 coin, và
            Pro có sẵn 1.000 coin. Thêm dòng “Sửa essay”: Free và Pro đặt lớp Tutor 90 phút bằng coin, Premium do mentor duyệt
            như dòng “Mentor duyệt hồ sơ, essay”.
          </li>
          <li>
            <strong>Bỏ vai trò phụ huynh khỏi plan lúc này.</strong> Không có tài khoản hay màn hình riêng cho phụ huynh ở gói
            nào.
          </li>
          <li>
            <strong>Pro có nhắc hạn. Đã thêm.</strong> Lý do lớn nhất để trả tiền cho việc tự làm là không trễ hạn. Pro nhận
            thông báo trong app trước mỗi hạn 14, 7 và 2 ngày, cảnh báo khi trễ mốc. Free không có nhắc theo trường. Kênh gửi
            email, Zalo hay push còn là câu hỏi mở trong plan.
          </li>
          <li>
            <strong>Coin trong package đã có tỷ lệ.</strong> 1 giờ trên brochure = 300 coin, theo nửa trên khung giá buổi 60 phút
            của Tutor. U3 3.600, U9 6.300, U18 9.900, U27 12.900 coin, U30 cấp 25.000 coin.
            Chi tiết ở <a href={withBase('/he-thong-coin')}>Hệ thống coin</a>.
          </li>
        </ol>

        <h2 id="bang-de-xuat">Bảng benefit đề xuất</h2>
        <p>Chỉ liệt kê các dòng đổi hoặc thêm so với bảng hiện tại. Các dòng khác giữ nguyên.</p>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Tính năng</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mentor</td>
                <td>Không</td>
                <td>Không</td>
                <td>Giữ như brochure từng package, đã bán offline</td>
              </tr>
              <tr>
                <td>Sửa essay</td>
                <td>Đặt lớp Tutor 90 phút bằng coin</td>
                <td>Đặt lớp Tutor 90 phút, dùng 1.000 coin kèm Pro</td>
                <td>Mentor duyệt như dòng “Mentor duyệt hồ sơ, essay”, Tutor thêm nếu muốn</td>
              </tr>
              <tr>
                <td>Nhắc hạn</td>
                <td>Không</td>
                <td>Thông báo trong app trước mỗi hạn 14, 7 và 2 ngày, cảnh báo khi trễ mốc</td>
                <td>Như Pro, mentor cũng nhận cảnh báo</td>
              </tr>
              <tr>
                <td>Coin trong gói</td>
                <td>Nhiệm vụ, tối đa 50 / tháng</td>
                <td>1.000 coin kèm theo</td>
                <td>U3 3.600 đến U27 12.900 coin, U30 25.000 coin, đổi từ giờ học</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="ui-preview">UI preview</h2>
        <TierUiPreview />

        <h2 id="khac-nhau">Khác nhau giữa 3 màn hình</h2>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Chỗ trên màn hình</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Đầu dashboard</td>
                <td>Đang xem đường đi, tiến độ chung</td>
                <td>Việc tuần này, sắp xếp theo hạn từng trường</td>
                <td>Mentor đã chấm gì, bài nào chờ chấm</td>
              </tr>
              <tr>
                <td>Thanh 9 bước</td>
                <td>Giống nhau</td>
                <td>Giống nhau</td>
                <td>Giống nhau, mỗi nước một tab</td>
              </tr>
              <tr>
                <td>Assignment</td>
                <td>Tự đánh dấu xong</td>
                <td>Gắn trường và hạn, AI góp ý</td>
                <td>Trạng thái chấm của mentor, bị trả lại thì làm lại</td>
              </tr>
              <tr>
                <td>Cột phải trang journey</td>
                <td>Hạn từng trường bị làm mờ, nút tư vấn</td>
                <td>Cảnh báo trễ hạn, AI góp ý, lớp Tutor</td>
                <td>Nhận xét của mentor, điểm chốt, lớp trong gói</td>
              </tr>
              <tr>
                <td>Lời mời nâng cấp</td>
                <td>Lên Pro khi thêm trường thứ 3 hoặc hết lượt match</td>
                <td>Hẹn tư vấn package khi còn 45 ngày tới hạn</td>
                <td>Không có, chỉ khi muốn thêm nước</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
