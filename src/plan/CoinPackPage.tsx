import { withBase } from '../basePath'
import { TableOfContents } from './TableOfContents'

const toc = [
  { id: 'goi-coin', label: 'Gói coin lẻ' },
  { id: 'ba-goi', label: 'Ba gói bán lẻ' },
  { id: 'vi-sao', label: 'Vì sao đúng ba gói này' },
  { id: 'khong-ban-le', label: 'Không phải gói bán lẻ' },
] as const

export function CoinPackPage() {
  return (
    <main className="page has-toc">
      <TableOfContents items={toc} />
      <div className="doc article">
        <a className="back" href={withBase('/#dong-tien-coin')}>
          ← Về bảng dòng tiền
        </a>
        <h1 id="goi-coin">Gói coin lẻ</h1>
        <p className="lead">
          Học sinh tự mua trên web. Coin này là ví để trả các khoản dùng lẻ. 1 coin = 1.000đ. Mua gói thì trả bằng tiền,
          dùng lẻ thì trả bằng coin. Coin không dùng để trả gói.
        </p>

        <h2 id="ba-goi">Ba gói bán lẻ</h2>
        <p>Chỉ có ba gói. Hạn dùng 12 tháng. Khoảng 99k đến 799k trên dòng tiền là đúng hai đầu bảng này.</p>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Gói</th>
                <th>Giá</th>
                <th>Mỗi coin</th>
                <th>Hạn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100 coin</td>
                <td>99.000đ</td>
                <td>990đ</td>
                <td>12 tháng</td>
              </tr>
              <tr>
                <td>300 coin</td>
                <td>269.000đ</td>
                <td>269.000đ / 300</td>
                <td>12 tháng</td>
              </tr>
              <tr>
                <td>1.000 coin</td>
                <td>799.000đ</td>
                <td>799đ</td>
                <td>12 tháng</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Gói 1.000 coin là 799đ mỗi coin, rẻ nhất. Gói 100 coin là 990đ mỗi coin. Gói 300 coin là 269.000đ cho 300 coin, cao hơn 799đ mỗi coin.</p>

        <h2 id="vi-sao">Vì sao đúng ba gói này</h2>
        <p>Giá các khoản coin đã chốt trong plan. Ba gói bán lẻ được cắt theo đúng các mức này.</p>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Khoản</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mở match % 1 học bổng (Free)</td>
                <td>5 coin</td>
              </tr>
              <tr>
                <td>Cập nhật báo cáo khi hồ sơ thay đổi</td>
                <td>50 coin</td>
              </tr>
              <tr>
                <td>Báo cáo AI dự báo việc làm (1 trường · 1 ngành)</td>
                <td>150 coin</td>
              </tr>
              <tr>
                <td>Buổi học Tutor 60 phút</td>
                <td>150 – 400 coin</td>
              </tr>
              <tr>
                <td>Buổi học 90 phút (essay, chọn trường)</td>
                <td>250 – 600 coin</td>
              </tr>
              <tr>
                <td>So sánh dự báo 3 trường</td>
                <td>350 coin</td>
              </tr>
              <tr>
                <td>Gói chọn trường, 5 báo cáo trong 1 quốc gia</td>
                <td>600 coin</td>
              </tr>
              <tr>
                <td>Gói ngoại khóa cá nhân, vai tình nguyện viên</td>
                <td>700 coin</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Combo 4–6 buổi chỉ giảm 15% so với đặt lẻ, không có một giá coin cố định, nên không thành một gói bán thêm.</p>

        <h3>100 coin — 99.000đ</h3>
        <p>
          Đủ thử một lần cập nhật báo cáo (50 coin) hoặc một khoản nhỏ như mở match % học bổng (5 coin). Hai lần cập
          nhật cũng vừa khít (50 + 50). Không đủ một báo cáo AI 150 coin, và cũng chưa tới mức thấp của buổi Tutor 60
          phút (150 coin).
        </p>

        <h3>300 coin — 269.000đ</h3>
        <p>
          Đủ một báo cáo AI 150 coin và còn dư 150 coin. 150 coin dư vừa đúng một báo cáo thứ hai, hoặc đúng mức thấp
          của buổi Tutor 60 phút. Đó là lý do khách mua gói 300 rồi quay lại: ví còn coin. 300 coin chưa đủ một so sánh
          3 trường (350 coin), chưa đủ gói chọn trường (600 coin), và chưa đủ gói ngoại khóa cá nhân (700 coin).
        </p>

        <h3>1.000 coin — 799.000đ</h3>
        <p>
          Đủ một gói ngoại khóa cá nhân 700 coin, còn 300 coin. Hoặc một so sánh 350 coin cộng một báo cáo 150 coin
          (cộng 500 coin), còn 500 coin. Cũng đủ gói chọn trường 600 coin, còn 400 coin. Đây là gói rẻ nhất theo coin,
          799đ mỗi coin.
        </p>

        <h2 id="khong-ban-le">Không phải gói bán lẻ</h2>
        <p>
          Pro gồm 1.000 coin, hết hạn cùng Pro. Giờ học trong package đổi thành coin, hết hạn cùng gói. Free làm nhiệm
          vụ tối đa 50 coin mỗi tháng, hạn 60 ngày. Ba nguồn này không bán trên web như gói coin lẻ, và không thêm gói
          thứ tư vào khoảng 99k–799k.
        </p>
      </div>
    </main>
  )
}
