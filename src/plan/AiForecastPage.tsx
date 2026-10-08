import { withBase } from '../basePath'

export function AiForecastPage() {
  return (
    <main className="page">
      <div className="doc article">
        <a className="back" href={withBase('/#dong-tien-ai')}>
          ← Về bảng dòng tiền
        </a>
        <h1>AI dự báo việc làm và định cư</h1>
        <p className="lead">
          AI đọc hồ sơ và mục tiêu apply của học sinh, dự đoán CV sau khi học xong, đối chiếu với JD thật đang tuyển,
          rồi tính mức khớp với JD, khả năng có việc và điều kiện ở lại.
        </p>

        <h2>Vì sao giữ 150 coin (150k)</h2>
        <h3>Chi phí của mình thấp</h3>
        <ul>
          <li>Dự đoán CV và chấm khớp với khoảng 20–50 JD tốn khoảng 5–20k token cho mỗi báo cáo.</li>
          <li>
            Phần tốn nhất là thu thập JD. Phần này nên làm định kỳ mỗi tháng theo cặp quốc gia và ngành, rồi dùng chung
            cho mọi học sinh, không tải lại cho từng báo cáo.
          </li>
          <li>Giá 150k vẫn còn lãi tốt.</li>
        </ul>
        <p>
          <strong>Giá trị với khách cao.</strong> Đây là câu hỏi phụ huynh lo nhất trước khi bỏ 50–300 triệu. Một bài
          test hướng nghiệp ở Việt Nam đã khoảng 300k–1tr, nên 150k là dễ mua.
        </p>
        <p>
          <strong>Khớp với gói coin.</strong> Gói coin rẻ nhất là 100 coin, không đủ cho một báo cáo. Khách sẽ mua gói
          300 coin (269k), sau đó còn dư 150 coin, vừa đủ cho báo cáo thứ hai. Dư coin là lý do để họ quay lại.
        </p>

        <h2>Thiết kế gói mua</h2>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Mức</th>
                <th>Giá</th>
                <th>Nhận được</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Xem trước</td>
                <td>Miễn phí</td>
                <td>Mức Cao / TB / Thấp cho 1 trường và 1 ngành, không có chi tiết</td>
              </tr>
              <tr>
                <td>Báo cáo</td>
                <td>150 coin</td>
                <td>1 trường, 1 ngành: CV dự kiến, top 5 JD khớp nhất, kỹ năng còn thiếu, khả năng có việc, điều kiện ở lại</td>
              </tr>
              <tr>
                <td>So sánh</td>
                <td>350 coin</td>
                <td>3 trường đặt cạnh nhau. Đây là lúc học sinh đang phân vân giữa các trường, nên dễ bán nhất</td>
              </tr>
              <tr>
                <td>Gói chọn trường</td>
                <td>600 coin</td>
                <td>5 báo cáo dùng trong 1 quốc gia, rẻ hơn khoảng 20% so với mua lẻ</td>
              </tr>
              <tr>
                <td>Cập nhật</td>
                <td>50 coin</td>
                <td>Chạy lại khi hồ sơ thay đổi, ví dụ có điểm IELTS mới. Miễn phí 1 lần trong 30 ngày đầu</td>
              </tr>
              <tr>
                <td>Pro</td>
                <td>Trả bằng 1.000 coin đi kèm</td>
                <td>Không tặng thêm báo cáo, để coin của Pro có chỗ tiêu</td>
              </tr>
              <tr>
                <td>Package</td>
                <td>Có sẵn</td>
                <td>1 báo cáo cho mỗi quốc gia trong package, mentor đọc cùng học sinh</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Phần xem trước miễn phí là chỗ câu khách. Trang xem trước nên có sẵn hai nút: “Mở báo cáo đầy đủ” và “Hẹn tư
          vấn 15 phút”.
        </p>

        <h2>Ba con số cần đổi cách gọi</h2>
        <ol>
          <li>
            <strong>“% apply thành công” nên gọi là “Mức khớp với JD”.</strong> Con số này chỉ cho biết CV dự kiến đáp
            ứng bao nhiêu phần yêu cầu của JD. Nó không phải xác suất được tuyển, vì tuyển dụng còn phụ thuộc phỏng
            vấn, visa và cạnh tranh. Nên hiện dạng “Khớp 7/10 yêu cầu của 34 JD đang tuyển”.
          </li>
          <li>
            <strong>“Khả năng có việc” luôn hiện dạng khoảng,</strong> ví dụ 60–75%, kèm độ tin cậy, nguồn dữ liệu và
            ngày cập nhật. Con số này nên tính từ mức khớp với JD cộng với thống kê việc làm sau tốt nghiệp của trường.
          </li>
          <li>
            <strong>“% định cư” không nên là một con số cá nhân.</strong> Ở lại được hay không chủ yếu do luật visa sau
            tốt nghiệp quyết định, cộng thêm việc ngành đó có nằm trong danh sách thiếu người hay không. Nên hiện dạng
            “Đủ điều kiện ở lại 2 năm sau tốt nghiệp · Ngành nằm trong danh sách thiếu người: Có” thay vì “72% định cư”.
            Phần này chạy bằng luật lấy từ module quốc gia do mentor cập nhật, không cần AI, nên vừa rẻ vừa ít sai.
          </li>
        </ol>

        <h2>Giữ chi phí AI thấp</h2>
        <ul>
          <li>JD được lấy và lưu theo cặp quốc gia và ngành, làm mới mỗi tháng. Báo cáo chỉ đọc từ kho này.</li>
          <li>
            Mỗi báo cáo chỉ tạo một lần rồi lưu lại. Mở xem lại không tốn token. Chỉ khi bấm “Cập nhật” mới chạy AI lại,
            và lần đó trừ coin.
          </li>
        </ul>
      </div>
    </main>
  )
}
