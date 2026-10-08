export function ExtracurricularPage() {
  return (
    <main className="page">
      <div className="doc article">
        <a className="back" href="/#dong-tien-ngoai-khoa">
          ← Về bảng dòng tiền
        </a>
        <h1>Ngoại khoá: mô hình và giá</h1>
        <p className="lead">
          USAS quản lý và tổ chức hoạt động. Học viên mua một suất trong thời gian cố định, được gắn vào một số hoạt
          động với vai đã chốt trong gói, và nhận chứng nhận ngoại khoá cho hồ sơ du học. Học viên không nhận contact
          CLB rồi tự xin vào.
        </p>

        <h2>Đề xuất: giữ nguyên giá 3 gói, đổi cách bán trên web</h2>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Gói</th>
                <th>Hoạt động</th>
                <th>Thời gian</th>
                <th>Vai</th>
                <th>Nhóm 3</th>
                <th>Nhóm 5</th>
                <th>Mỗi suất (nhóm 3 / nhóm 5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BASIC</td>
                <td>3–5</td>
                <td>6–12 tháng</td>
                <td>Tình nguyện viên</td>
                <td>6.000.000</td>
                <td>10.000.000</td>
                <td>2.000.000 / 2.000.000</td>
              </tr>
              <tr>
                <td>ADVANCED</td>
                <td>5–10</td>
                <td>12–18 tháng</td>
                <td>Tình nguyện viên</td>
                <td>15.000.000</td>
                <td>20.000.000</td>
                <td>5.000.000 / 4.000.000</td>
              </tr>
              <tr>
                <td>CORETEAM</td>
                <td>5–10</td>
                <td>12–18 tháng</td>
                <td>Tình nguyện viên, và ban Truyền thông, Nhân sự, Đối ngoại, Hậu cần</td>
                <td>33.000.000</td>
                <td>45.000.000</td>
                <td>11.000.000 / 9.000.000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Giá theo Portfolio 2026, áp dụng từ 01/2024, chưa VAT. Cột “mỗi suất” giả định giá trên portfolio là giá cả
          nhóm, vì nhóm 5 đắt hơn nhóm 3. Cần xác nhận lại với trung tâm.
        </p>

        <h3>Vì sao giữ giá</h3>
        <ul>
          <li>Giá đã có trên portfolio và đang bán offline. Web bán giá khác thì sales và web sẽ lệch nhau.</li>
          <li>
            Ba gói đã tăng dần hợp lý. BASIC rẻ để thử. ADVANCED nhiều hoạt động và thời gian hơn. CORETEAM cho vào ban
            vận hành, đúng thứ hồ sơ trường top cần.
          </li>
        </ul>

        <h3>Chỉ đổi cách bán, không đổi giá</h3>
        <p>
          Giá vẫn là giá của cả nhóm như bảng trên. Web chỉ chia ra cho từng người để mỗi học sinh tự thanh toán phần
          của mình. Ví dụ BASIC nhóm 3 là 6.000.000đ, nên mỗi người trả 2.000.000đ. Trung tâm vẫn thu đủ 6.000.000đ.
        </p>
        <ul>
          <li>
            <strong>Học sinh không cần tự gom nhóm.</strong> Chọn “Đi cùng bạn, nhóm 3” hoặc “Ghép nhóm 5”. Hệ thống
            ghép, đủ người mới chốt lịch. Không ghép đủ thì hoàn tiền hoặc chuyển sang nhóm 3.
          </li>
          <li>
            <strong>Trả bằng tiền, không bằng coin.</strong> Số tiền 2–11tr lớn hơn gói coin lớn nhất là 1.000 coin.
            BASIC, ADVANCED thanh toán thẳng trên web. CORETEAM có nút chính “Hẹn tư vấn 15 phút”.
          </li>
        </ul>

        <h2>Sản phẩm mới: thử 1 hoạt động bằng coin</h2>
        <p>
          Phần này không thay giá gói. Đây là món nhỏ thêm vào cho người chưa muốn mua cả gói, hoặc đã dùng hết suất
          trong package.
        </p>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Mục</th>
                <th>Đề xuất</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Giá</td>
                <td>700 coin cho 1 hoạt động, vai tình nguyện viên</td>
              </tr>
              <tr>
                <td>Ai mua</td>
                <td>Học sinh package đã dùng hết suất. Free hoặc Pro muốn thử 1 hoạt động trước khi mua gói</td>
              </tr>
              <tr>
                <td>Vì sao 700</td>
                <td>
                  Mua BASIC thì mỗi hoạt động chỉ khoảng 400–670k. Mua lẻ đắt hơn một chút, nên ai cần nhiều hoạt động sẽ
                  thấy mua gói lợi hơn
                </td>
              </tr>
              <tr>
                <td>Không bán lẻ</td>
                <td>Vai trong ban của CORETEAM, vì vai ban cần 12–18 tháng mới có kết quả</td>
              </tr>
              <tr>
                <td>Thử xong mua gói</td>
                <td>
                  Thử 1 hoạt động rồi mua BASIC trong 60 ngày thì được giảm 700.000đ, tức coi như hoạt động thử miễn phí
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Ngoại khoá trong package</h2>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Suất ngoại khoá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>U3 Online</td>
                <td>Không có</td>
              </tr>
              <tr>
                <td>U9 Express</td>
                <td>2 hoạt động</td>
              </tr>
              <tr>
                <td>U18 Fundamental</td>
                <td>2 hoạt động</td>
              </tr>
              <tr>
                <td>U27 Mastery</td>
                <td>Brochure ghi có hỗ trợ ngoại khoá, chưa ghi số suất</td>
              </tr>
              <tr>
                <td>U30 Comprehensive</td>
                <td>Brochure ghi không giới hạn</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Portfolio ghi U27 và U30 không có suất ngoại khoá, còn brochure ghi có. Cần chốt một nguồn. Hết suất trong
          package thì mua thêm hoạt động lẻ bằng coin, hoặc mua gói BASIC trở lên.
        </p>

        <h2>Bán đúng lúc, theo thời gian còn lại</h2>
        <p>
          Web chỉ gợi ý gói còn kịp xong trước deadline nộp sớm nhất. Bán gói không kịp giao là tạo khiếu nại.
        </p>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Còn lại tới deadline</th>
                <th>Web gợi ý</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Trên 18 tháng</td>
                <td>CORETEAM hoặc ADVANCED</td>
              </tr>
              <tr>
                <td>12–18 tháng</td>
                <td>ADVANCED, hoặc CORETEAM nếu bắt đầu ngay</td>
              </tr>
              <tr>
                <td>9–12 tháng</td>
                <td>BASIC</td>
              </tr>
              <tr>
                <td>Dưới 9 tháng</td>
                <td>
                  Không bán gói. Hiện cảnh báo: ngoại khoá gần như không kịp bồi đắp, hồ sơ dựa vào điểm và luận. Chỉ
                  gợi ý tối đa 1–2 hoạt động lẻ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Chỗ bán trên journey: bước 3 “Bù khoảng thiếu”, khớp với B5 của cẩm nang mentor, tức khoảng 9 tháng trước
          deadline. Thêm lối vào từ phần kỹ năng còn thiếu trong báo cáo AI dự báo việc làm.
        </p>

        <h2>Khác với nghiên cứu khoa học và kiến tập</h2>
        <ul>
          <li>
            <strong>Ngoại khoá:</strong> suất hoạt động cộng vai tình nguyện hoặc ban, đầu ra là chứng nhận cho hồ sơ.
          </li>
          <li>
            <strong>Nghiên cứu khoa học:</strong> 3 giai đoạn 7 / 12 / 24 tuần, giá theo nhóm từ 15 đến 80 triệu. Sản
            phẩm riêng, không gộp vào gói ngoại khoá.
          </li>
          <li>
            <strong>Kiến tập:</strong> chưa có bảng giá, số buổi hay vai trò. Chưa bán trên web.
          </li>
        </ul>
        <p>
          Mạng 50+ CLB tại TP.HCM và 100+ CLB toàn quốc là đối tác truyền thông của trung tâm. Web không hứa học viên
          được cử vào một CLB cụ thể.
        </p>

        <h2>Chưa có trong nguồn, cần chốt trước khi build</h2>
        <ul>
          <li>Ai phân hoạt động, học viên có được chọn sự kiện không.</li>
          <li>Một “hoạt động” tính là gì, điểm danh thế nào.</li>
          <li>Chứng nhận do USAS hay do CLB cấp.</li>
          <li>Bốn ban của CORETEAM làm việc gì từng ban.</li>
          <li>Giá portfolio là giá cả nhóm hay mỗi người, và giá trên web hiện đã gồm VAT chưa.</li>
          <li>Thời hạn ghép nhóm 5 và cách hoàn tiền khi không đủ người.</li>
        </ul>
      </div>
    </main>
  )
}
