import { withBase } from '../basePath'
import { TableOfContents } from './TableOfContents'

const toc = [{ id: 'package-tron-goi', label: '3. Package trọn gói' }] as const

export function PackagePage() {
  return (
    <main className="page has-toc">
      <TableOfContents items={toc} />
      <div className="doc article">
        <a className="back" href={withBase('/#dong-tien-premium')}>
          ← Về bảng dòng tiền
        </a>
        <h1 id="package-tron-goi">3. Package trọn gói</h1>
        <p>
          Giá, số quốc gia, số trường, lớp được học và hỗ trợ lấy theo brochure USAS Globally. Khác một chỗ: cột giờ học
          với mentor đổi thành coin để học sinh tự book lớp.
        </p>
        <p>Cam kết dựa trên năng lực của học viên. U3, U9, U18, U27 học online 1:1. U30 học online hoặc offline 1:1.</p>
        <div className="article-table">
          <table>
            <thead>
              <tr>
                <th>Chương trình</th>
                <th>Quốc gia</th>
                <th>Số trường</th>
                <th>Lớp trong gói, đổi thành coin</th>
                <th>Hỗ trợ hoạt động khác</th>
                <th>Chi phí</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>U3 Online</td>
                <td>2 quốc gia: Bỉ, Hà Lan, Phần Lan, Đài Loan, Trung Quốc</td>
                <td>2</td>
                <td>
                  12 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết), EU Advisors, IELTS / SAT
                  Mock-test
                </td>
                <td>Không có</td>
                <td>52.690.000 VND</td>
              </tr>
              <tr>
                <td>U9 Express</td>
                <td>3 quốc gia: Bỉ, Hà Lan, Phần Lan, Hungary, Pháp, Đài Loan, Trung Quốc</td>
                <td>3</td>
                <td>
                  21 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết), EU Advisors, Thesis, IELTS /
                  SAT Mock-test
                </td>
                <td>Hỗ trợ 2 hoạt động ngoại khoá</td>
                <td>69.800.000 VND</td>
              </tr>
              <tr>
                <td>U18 Fundamental</td>
                <td>4 quốc gia: Bỉ, Hà Lan, Phần Lan, Hungary, Pháp, Đức, Ý, Đài Loan, Trung Quốc</td>
                <td>4</td>
                <td>
                  33 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết + thực hành), EU Advisors,
                  Thesis, IELTS / SAT Mock-test
                </td>
                <td>Hỗ trợ 2: hoạt động ngoại khoá và Apply 2 học bổng</td>
                <td>97.800.000 VND</td>
              </tr>
              <tr>
                <td>U27 Mastery</td>
                <td>
                  5 quốc gia: Bỉ, Hà Lan, Phần Lan, Hungary, Pháp, Đức, Ý, Đài Loan, Trung Quốc hoặc Anh, Úc, Mỹ, Canada,
                  Singapore
                </td>
                <td>10</td>
                <td>
                  43 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết + thực hành), EU Advisors, Q&A
                  1:1 với Mentor, Financial Aid, Thesis, IELTS / SAT / GMAT Mock-test
                </td>
                <td>Hỗ trợ 3: hoạt động ngoại khoá, Apply 10 học bổng, Mentor Premium</td>
                <td>150.800.000 VND</td>
              </tr>
              <tr>
                <td>U30 Comprehensive</td>
                <td>Không giới hạn: Châu Âu, Châu Mỹ, Châu Á, Châu Úc</td>
                <td>Không giới hạn. Cam kết đầu trường TOP 100</td>
                <td>
                  Không giới hạn giờ, đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết + thực hành), EU
                  Advisors, Q&A 1:1 với EU Advisors, Financial Aid, Thesis, IELTS / SAT / GMAT / GRE / IMAC Mock-test
                </td>
                <td>
                  Không giới hạn: hoạt động ngoại khoá, Apply học bổng, Financial Aid, Mentor Premium, và một bài nghiên
                  cứu khoa học
                </td>
                <td>297.800.000 VND</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Giờ học với mentor trên brochure không giữ thành buổi cố định. Phần đó đổi thành coin trong package để học
          sinh tự book lớp.
        </p>
        <p>Cách thu: mua package trọn gói.</p>
      </div>
    </main>
  )
}
