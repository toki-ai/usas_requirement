import { Banner, Bar, Btn, Card, Chips, MockTable, RoleScreen, StudentFrame, Tag, studentRoles, type Tier } from './kit'

type Source = { name: string; amount: number; expires: string; note?: string; soon?: boolean }

const sources: Record<Tier, Source[]> = {
  free: [
    { name: 'Nhiệm vụ', amount: 35, expires: '28/10', note: 'Hạn 60 ngày từ lúc nhận', soon: true },
    { name: 'Mua lẻ', amount: 100, expires: '02/09/2027', note: 'Hạn 12 tháng' },
  ],
  pro: [
    { name: 'Pro', amount: 820, expires: '15/03/2027', note: 'Hết hạn cùng Pro' },
    { name: 'Mua lẻ', amount: 300, expires: '02/09/2027', note: 'Hạn 12 tháng' },
  ],
  premium: [
    { name: 'Package U18', amount: 5400, expires: '30/06/2027', note: 'Hết hạn cùng gói' },
    { name: 'Mua lẻ', amount: 100, expires: '02/09/2027', note: 'Hạn 12 tháng' },
  ],
}

const fmt = (value: number) => value.toLocaleString('vi-VN')

function Wallet({ tier }: { tier: Tier }) {
  const list = sources[tier]
  const total = list.reduce((sum, source) => sum + source.amount, 0)
  const first = list[0]

  return (
    <StudentFrame tier={tier} active="Ví coin">
      <div className="tp-journey-head">
        <div>
          <span className="tp-muted">Số dư</span>
          <h4 className="pv-big">{fmt(total)} coin</h4>
        </div>
        <Btn kind="primary">Nạp coin</Btn>
      </div>
      {first.soon && <Banner tone="warn">35 coin nhiệm vụ hết hạn ngày 28/10. Dùng trước khi mất.</Banner>}
      <div className="pv-grid3">
        {list.map((source) => (
          <Card key={source.name} title={source.name} note={`Hạn ${source.expires}`} tone={source.soon ? 'alert' : undefined}>
            <p>
              <b>{fmt(source.amount)} coin</b>
            </p>
            <small className="tp-muted">{source.note}</small>
            {source.name === 'Nhiệm vụ' && (
              <>
                <Bar value={70} />
                <small className="tp-muted">35 / 50 coin tháng này</small>
              </>
            )}
          </Card>
        ))}
        {tier === 'premium' && (
          <Card title="Coin package dùng cho" tone="mentor">
            <p>Mọi lớp Tutor và lớp kỹ năng, kể cả lớp do mentor mở. Báo cáo AI ngoài suất package.</p>
          </Card>
        )}
      </div>
      <Banner tone="info">
        <b>Dùng trước:</b> nguồn sắp hết hạn trừ trước. Đơn tiếp theo trừ từ <b>{first.name}</b> (hạn {first.expires}), thiếu mới sang{' '}
        {list[1].name}.
      </Banner>
      <Chips items={['Tất cả', 'Nạp', 'Tiêu', 'Hoàn', 'Hết hạn']} />
      <MockTable
        head={['Ngày', 'Nội dung', 'Nguồn', 'Coin']}
        rows={
          tier === 'free'
            ? [
                ['10/10', 'Nhiệm vụ: đăng 1 bài chia sẻ', 'Nhiệm vụ', <span className="pv-plus">+5</span>],
                ['02/09', 'Mua gói 100 coin · PayOS', 'Mua lẻ', <span className="pv-plus">+100</span>],
                ['28/08', 'Mở match % Orange Tulip', 'Nhiệm vụ', <span className="pv-minus">−5</span>],
              ]
            : tier === 'pro'
              ? [
                  ['09/10', 'Lớp sửa ML · Tutor Vân · 90 phút', 'Pro', <span className="pv-minus">−450</span>],
                  ['05/10', 'Hoàn lớp IELTS · huỷ trước 24h', 'Pro', <span className="pv-plus">+270</span>],
                  ['02/09', 'Mua gói 300 coin · PayOS', 'Mua lẻ', <span className="pv-plus">+300</span>],
                ]
              : [
                  ['11/10', 'Lớp Documents · mentor Nam mở lớp', 'Package U18', <span className="pv-minus">−300</span>],
                  ['04/10', 'Lớp phỏng vấn visa · Tutor Hòa', 'Package U18', <span className="pv-minus">−450</span>],
                  ['01/07', 'Kích hoạt U18 · 33 giờ = 9.900 coin', 'Package U18', <span className="pv-plus">+9.900</span>],
                ]
        }
      />
    </StudentFrame>
  )
}

const packs = [
  { coin: 100, price: '99.000đ', per: '990đ / coin' },
  { coin: 300, price: '269.000đ', per: '897đ / coin' },
  { coin: 1000, price: '799.000đ', per: '799đ / coin' },
]

const pickedPack = 300

function TopUp({ tier }: { tier: Tier }) {
  const short = tier === 'free' ? 165 : tier === 'pro' ? 120 : 60
  return (
    <StudentFrame tier={tier} active="Ví coin">
      <Banner tone="warn">
        Đang đặt lớp IELTS Speaking 60 phút · còn thiếu <b>{short} coin</b>. Giữ slot thêm 08:42.
      </Banner>
      {tier !== 'free' && (
        <p className="tp-muted">
          Bạn còn {tier === 'pro' ? '180 coin Pro' : '240 coin package'}, đã tính vào đơn này.
        </p>
      )}
      <p className="tp-muted">Chọn gói bạn muốn. Chỉ học sinh tự nạp, không cần ai duyệt.</p>
      <div className="pv-grid3 pv-gap">
        {packs.map((pack) => (
          <Card key={pack.coin} title={`${fmt(pack.coin)} coin`} note={pack.coin === pickedPack ? <Tag>Bạn đã chọn</Tag> : undefined}>
            <p>
              <b>{pack.price}</b>
            </p>
            <small className="tp-muted">{pack.per} · hạn 12 tháng</small>
          </Card>
        ))}
      </div>
      <div className="tp-grid pv-gap">
        <Card title="Đơn nạp">
          <ul className="tp-list">
            <li>Gói {pickedPack} coin · 269.000đ</li>
            <li>Số dư sau nạp: thêm {pickedPack} coin</li>
          </ul>
          <Btn kind="primary">Thanh toán PayOS</Btn>
          <small className="tp-muted">Chuyển sang PayOS, quét QR chuyển khoản.</small>
        </Card>
        <Card title="Kết quả" note="Sau khi PayOS trả về">
          <div className="pv-result ok">
            <b>Nạp thành công · +300 coin</b>
            <span className="tp-link">Quay lại đặt lớp (tự chuyển sau 3 giây)</span>
          </div>
          <div className="pv-result bad">
            <b>Thanh toán bị huỷ hoặc hết hạn</b>
            <span className="pv-actions">
              <Btn>Thử lại</Btn>
              <Btn kind="ghost">Về ví</Btn>
            </span>
          </div>
        </Card>
      </div>
    </StudentFrame>
  )
}

const missions = [
  ['Hoàn thiện hồ sơ', '+10', 'Đã nhận'],
  ['Đặt mục tiêu nước và ngành', '+5', 'Đã nhận'],
  ['Xong 1 bước journey', '+10', 'Đã nhận'],
  ['Đăng 1 bài chia sẻ trên Feed', '+5', 'Làm ngay'],
  ['Mời 1 bạn', '· thưởng khi bạn mua gói, ngoài trần 50', 'Làm ngay'],
]

function Missions({ tier }: { tier: Tier }) {
  if (tier !== 'free') {
    return (
      <StudentFrame tier={tier} active="Ví coin">
        <div className="pv-empty">
          <h4>Gói của bạn đã kèm coin</h4>
          <p className="tp-muted">
            Nhiệm vụ nhận coin chỉ dành cho Free.
          </p>
          <span className="tp-link">Về ví coin</span>
        </div>
      </StudentFrame>
    )
  }

  return (
    <StudentFrame tier={tier} active="Ví coin">
      <div className="tp-journey-head">
        <div>
          <h4>Nhiệm vụ tháng 10</h4>
          <span className="tp-muted">Reset ngày 01/11 · coin nhiệm vụ hết hạn sau 60 ngày</span>
        </div>
        <b>35 / 50 coin</b>
      </div>
      <Bar value={70} />
      <ul className="tp-assign pv-gap">
        {missions.map(([name, reward, state]) => (
          <li key={name}>
            <span>
              {name} <b className="pv-plus">{reward}</b>
            </span>
            {state === 'Đã nhận' ? <span className="tp-status ok">Đã nhận</span> : <Btn kind="primary">Làm ngay</Btn>}
          </li>
        ))}
      </ul>
      <Card title="Khi đủ 50 coin tháng này" tone="locked">
        <p>Nhiệm vụ còn lại khóa tới 01/11.</p>
      </Card>
    </StudentFrame>
  )
}

export function WalletScreen() {
  return <RoleScreen name="Ví coin" roles={studentRoles}>{(tier) => <Wallet tier={tier} />}</RoleScreen>
}

export function TopUpScreen() {
  return <RoleScreen name="Nạp coin" roles={studentRoles}>{(tier) => <TopUp tier={tier} />}</RoleScreen>
}

export function MissionsScreen() {
  return <RoleScreen name="Nhiệm vụ" roles={studentRoles}>{(tier) => <Missions tier={tier} />}</RoleScreen>
}
