import type { PlanBlock } from '../types'
import { journeyRoadmap } from './journeySteps'

export const plan = {
  title: 'Kế hoạch toàn hệ thống: nền tảng du học online',
  lines: [
    { id: 'overview', sectionId: 'overview', kind: 'heading', text: '1. Overview' },
    { id: 'overview-tong-quan', sectionId: 'overview', kind: 'heading', text: 'a. Tổng quan về web' },
    {
      id: 'overview-web',
      sectionId: 'overview',
      kind: 'text',
      text: 'Đây là web du học online cho học sinh. Học sinh lập hồ sơ, chọn quốc gia và trường, rồi đi một journey từ chuẩn bị hồ sơ đến lúc lên đường.',
    },
    { id: 'vai-tro', sectionId: 'vai-tro', kind: 'heading', text: 'b. Các role của website' },
    {
      id: 'vai-tro-nguyen-tac',
      sectionId: 'vai-tro',
      kind: 'text',
      text: 'Một hệ thống tài khoản, nhiều quyền. Học sinh không thấy app khác đi. Tutor được duyệt sẽ có thêm Studio dạy học và nút chuyển chế độ học / dạy.',
    },
    {
      id: 'vai-tro-dang-nhap',
      sectionId: 'vai-tro',
      kind: 'text',
      text: 'Mentor, Staff nội dung, Kế toán và admin do nội bộ chỉ định, không có nút đăng ký công khai. Mọi role đăng nhập bằng OTP qua email hoặc số điện thoại.',
    },
    {
      id: 'vai-tro-notes',
      sectionId: 'vai-tro',
      kind: 'notes',
      notes: [
        {
          id: 'hoc-sinh',
          title: 'Học sinh',
          items: [
            'Người dùng chính. Tự đăng ký.',
            'Feed, chat cộng đồng.',
            'Đặt mục tiêu, đi journey.',
            'Theo dõi hồ sơ.',
            'Dùng coin đặt lớp Tutor.',
            'Mua Pro hoặc package.',
          ],
        },
        {
          id: 'tutor-role',
          title: 'Tutor',
          badge: 'Mới',
          warning: 'Sẽ implement sau, các phase đầu để mentor mở lớp dạy.',
          items: [
            'Người ngoài: học viên cũ đã đi du học, giáo viên. Nộp đơn, được duyệt.',
            'Mở lớp kỹ năng, ngôn ngữ.',
            'Tự đặt giá trong khung cho phép.',
            'Nhận 75% doanh thu mỗi buổi.',
            'Chat với học sinh chỉ quanh buổi học.',
          ],
        },
        {
          id: 'mentor',
          title: 'Mentor',
          badge: 'Có thể mở lớp',
          items: [
            'Nhân viên nội bộ, số lượng ít. Admin chỉ định.',
            'Chỉnh journey cho học sinh Premium.',
            'Tư vấn lộ trình, chọn trường.',
            'Review hồ sơ, cập nhật trạng thái.',
            'Chat trực tiếp với học sinh mình phụ trách.',
            'Cập nhật dữ liệu trường mỗi mùa: deadline, giấy tờ, điểm yêu cầu.',
            'Có thể bật thêm quyền mở lớp, dùng Studio như Tutor, trên cùng tài khoản.',
          ],
        },
        {
          id: 'admin',
          title: 'Admin',
          items: [
            'Vận hành. Nội bộ.',
            'Gán mentor cho học sinh. Chỉ định Staff nội dung và Kế toán.',
            'Duyệt Tutor, kiểm duyệt Feed và chat.',
            'Quản lý gói, coin, nhân sự.',
            'Duyệt hoàn tiền, xử lý ticket.',
            'Báo cáo doanh thu.',
          ],
        },
        {
          id: 'staff',
          title: 'Staff',
          items: [],
          departments: [
            {
              name: 'Sales',
              items: [
                'Nhân sự nội bộ. Gọi điện cho học sinh, bán gói họ cần.',
                'Lọc lead từ form landing page, gọi, Zalo hoặc Messenger.',
                'Đặt và chạy buổi “Hẹn tư vấn 15 phút”. Với khách mới đây là cuộc gọi bán gói, không phải bước trong journey.',
                'Đề xuất gói. Sau khi mua package, buổi làm quen với mentor là task đầu tiên trong journey Premium.',
              ],
            },
            {
              name: 'Staff nội dung',
              items: [
                'Nhân sự nội bộ. Cập nhật nội dung trên web, không dạy học. Admin chỉ định.',
                'Giữ danh sách học bổng và yêu cầu trường cho đúng mùa: deadline, giấy tờ, điểm yêu cầu.',
                'Đăng nhiệm vụ để học sinh kiếm coin. Free tối đa 50 coin / tháng, hết hạn 60 ngày.',
              ],
            },
            {
              name: 'Kế toán',
              items: [
                'Nhân sự nội bộ. Kiểm tiền vào và tiền chi, không dạy học. Admin chỉ định.',
                'Đối soát tiền mua gói, Pro và coin bán lẻ.',
                'Đối soát chi trả Tutor: Tutor nhận 75%, nền tảng giữ 25%.',
                'Chuyển các khoản hoàn tiền admin đã duyệt.',
                'Không duyệt hồ sơ, không sửa essay.',
              ],
            },
          ],
        },
      ],
    },

    { id: 'journey-student', sectionId: 'journey-student', kind: 'heading', text: '2. Journey template' },
    journeyRoadmap,

    { id: 'journey-mot-template', sectionId: 'journey-student', kind: 'heading', text: 'a. Một journey cho cả 3 gói' },
    {
      id: 'journey-mot-template-chot',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Không làm template riêng cho từng gói. Free, Pro và Premium đi cùng 9 bước, cùng tên bước, cùng assignment. Gói chỉ quyết định lớp phủ lên từng bước: có deadline theo trường không, ai kiểm tra đầu ra, có thêm điểm chốt không.',
    },
    {
      id: 'journey-mot-template-vi-sao',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Lý do: chỉ có một bản đồ để giải thích cho học sinh. Nâng cấp giữa chừng giữ nguyên tiến độ và bài đã nộp, không phải chuyển sang journey khác. Mentor, Tutor và học sinh nhìn cùng số bước, cùng assignment. Nội dung bước chỉ viết và cập nhật một lần mỗi mùa.',
    },
    {
      id: 'journey-mot-template-bang',
      sectionId: 'journey-student',
      kind: 'table',
      columns: ['Lớp phủ trên mỗi bước', 'Free', 'Pro', 'Premium'],
      rows: [
        { id: 'mot-template-checklist', cells: ['Checklist', 'Chung, không theo trường', 'Riêng từng trường, tự cập nhật khi đổi trường hoặc điểm', 'Như Pro, mentor chỉnh'] },
        { id: 'mot-template-deadline', cells: ['Deadline', 'Chỉ mốc gợi ý theo D, không có hạn từng trường', 'Tính lùi từ deadline của từng trường đã chọn', 'Như Pro, mentor khóa timeline ở bước 3'] },
        { id: 'mot-template-assignment', cells: ['Assignment', 'Thấy hết, tự làm, tự đánh dấu xong', 'Tự làm, AI góp ý trong 10 lượt tinh chỉnh / tháng, hệ thống báo trượt mốc', 'Mentor chấm theo rubric, chưa đạt thì trả lại'] },
        { id: 'mot-template-diem-chot', cells: ['Điểm chốt thêm', 'Không', 'Không', 'Bước 2, 3, 6 mentor chốt với gia đình trong buổi tư vấn rồi mới mở bước sau. Bước 5, 7 có người thứ hai xem'] },
        { id: 'mot-template-pham-vi', cells: ['Số trường, số nước', '2 trường, 1 nước để xem', 'Tối đa 8 trường, 1 nước', 'Theo package, mỗi nước một journey'] },
        { id: 'mot-template-len-duong', cells: ['Bước 7–9', 'Checklist chung', 'Checklist chung. Phần riêng của Pro kết thúc khi có kết quả', 'Mentor và người phụ trách visa cùng kiểm'] },
      ],
    },
    {
      id: 'overview-ba-goi',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Có 3 gói: Free để xem đường đi, Pro để tự đi một journey, Premium là package trọn gói U3 đến U30 có người dẫn.',
    },
    {
      id: 'goi-bang',
      sectionId: 'journey-student',
      kind: 'table',
      columns: ['Tính năng', 'Free', 'Pro', 'Premium package'],
      rows: [
        { id: 'goi-muc-tieu', cells: ['Số quốc gia', '1, chỉ để xem', '1', 'Theo package: 2 đến không giới hạn'] },
        { id: 'goi-theo-doi', cells: ['Số trường theo dõi', '2', 'Tối đa 8 trường trong nước đó', 'Tự theo dõi như Pro, cộng số trường mentor làm hồ sơ cùng theo package'] },
        { id: 'goi-journey', cells: ['Journey', '9 bước chung, không có deadline theo trường', 'Task, giấy tờ và deadline riêng từng trường, tự cập nhật khi đổi trường hoặc điểm', 'Như Pro, mentor chỉnh và duyệt'] },
        { id: 'goi-nhac-han', cells: ['Nhắc hạn', 'Không', 'Thông báo trước mỗi hạn 14, 7 và 2 ngày, cảnh báo khi trễ mốc', 'Như Pro, mentor cũng nhận cảnh báo'] },
        { id: 'goi-match', cells: ['Match % học bổng', '3 lần / tháng, còn lại hiện mờ', 'Không giới hạn, kèm còn thiếu gì', 'Như Pro, mentor chọn và apply theo package'] },
        { id: 'goi-ai-tinh-chinh', cells: ['AI tinh chỉnh journey', 'Không', '10 lần / tháng, chạy khi có thay đổi', 'Như Pro, mentor duyệt kết quả'] },
        { id: 'goi-ai', cells: ['AI dự báo việc làm và định cư', 'Xem trước mức Cao / TB / Thấp', 'Báo cáo đầy đủ trả bằng coin', '1 báo cáo mỗi quốc gia trong package'] },
        { id: 'goi-coin', cells: ['Coin', 'Nhiệm vụ, tối đa 50 coin / tháng', '1.000 coin kèm theo, hết hạn cùng Pro', 'U3 3.600 đến U27 12.900 coin, U30 25.000 coin, đổi từ giờ học. [[/he-thong-coin|Cách đổi]]'] },
        { id: 'goi-lop', cells: ['Lớp Tutor', 'Giá gốc', 'Giá gốc', 'Dùng coin trong package'] },
        { id: 'goi-chat-mentor', cells: ['Mentor duyệt hồ sơ, essay', 'Không', 'Không', 'Có'] },
        { id: 'goi-sua-essay', cells: ['Sửa essay', 'Đặt lớp Tutor 90 phút bằng coin, 250–600 coin / buổi', 'Đặt lớp Tutor 90 phút, dùng 1.000 coin kèm Pro', 'Mentor duyệt như dòng trên, đặt thêm Tutor bằng coin trong gói nếu muốn'] },
        { id: 'goi-sau-offer', cells: ['Visa, nhà ở', 'Checklist chung', 'Checklist chung', 'Mentor hỗ trợ'] },
        { id: 'goi-feed', cells: ['Feed, chat cộng đồng', 'Có', 'Có', 'Có'] },
      ],
    },

    { id: 'journey-bien-the', sectionId: 'journey-student', kind: 'heading', text: 'b. Lộ trình nén và nội dung theo nước' },
    {
      id: 'journey-mot-template-ngoai-le',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Chỉ có 2 chỗ cần biến thể, và vẫn giữ đủ 9 bước. Một là lộ trình nén khi học sinh vào lúc còn dưới 9 tháng tới D: bước 3 và bước 4 chạy cùng lúc, buổi mentor gộp theo phương án nén 8 mốc của cẩm nang (B2 + B3, B5 + B6, B8 + B9, B10 + B11), và gia đình được báo trước là hoạt động ngoại khóa gần như không kịp bồi đắp. Khóa kế hoạch ở bước 3, mốc giấy tờ T3 và rà soát trước khi nộp không được nén. Hai là nội dung theo nước ở bước 4 và bước 7: giấy tờ, chuẩn CV, checklist visa, mốc chứng minh tài chính. Đây là dữ liệu theo nước gắn vào bước, không phải template riêng.',
    },

    { id: 'journey', sectionId: 'journey-student', kind: 'heading', text: 'c. Luật chung của journey' },
    {
      id: 'journey-nguyen-tac',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Hồ sơ trước, mục tiêu sau: học sinh nhập điều kiện hiện tại rồi mới được gợi ý mục tiêu vừa sức.',
    },
    {
      id: 'journey-mo-buoc',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Lúc đầu học sinh chỉ thấy 6 bước nộp hồ sơ. Bước 7–9 tự mở khi nhận offer. Free được đi đủ các bước nhưng tự làm. Mỗi mục tiêu, tức mỗi quốc gia, là một journey riêng, có thanh tiến độ ở đầu màn hình.',
    },
    {
      id: 'journey-dung-chung',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Việc dùng chung như IELTS hay hộ chiếu chỉ làm một lần và hiện ở mọi journey. Assignment của từng bước nằm ở lộ trình 9 bước đầu mục.',
    },
    {
      id: 'journey-tu-van-15',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Buổi tư vấn 15 phút nằm ngoài journey. Không đặt làm bước 0 bắt buộc. Nút “Hẹn tư vấn 15 phút” luôn có sẵn và xuất hiện mạnh ở bước 2 và bước 4.',
    },
    {
      id: 'journey-ban-goi',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Với khách mới, đây là cuộc gọi bán gói do sales phụ trách. Sau khi mua package, buổi làm quen với mentor là task đầu tiên trong journey Premium.',
    },

    { id: 'goi-doi', sectionId: 'journey-student', kind: 'heading', text: 'd. Đổi trường và đổi nước' },
    {
      id: 'goi-doi-bang',
      sectionId: 'journey-student',
      kind: 'table',
      columns: ['Gói', 'Đổi trường', 'Đổi nước', 'Khi không còn được đổi'],
      rows: [
        {
          id: 'doi-free',
          cells: [
            'Free',
            'Tự do, luôn tối đa 2 trường',
            'Tự do. Đổi là thay nước đang xem, không thêm nước thứ 2',
            'Không giới hạn số lần. Muốn nhiều trường hơn thì lên Pro',
          ],
        },
        {
          id: 'doi-pro',
          cells: [
            'Pro',
            'Trong tối đa 8 trường. Mỗi lần lưu tính 1 lần AI tinh chỉnh',
            'Tối đa 2 lần trong hạn Pro, chỉ khi chưa nộp hồ sơ cho trường nào',
            'Đã nộp thì khóa nước đó. Lần đổi thứ 3, hoặc muốn nước khác sau khi nộp, thì mua journey mới hoặc lên package',
          ],
        },
        {
          id: 'doi-premium',
          cells: [
            'Premium',
            'Trong số trường của package, mentor duyệt',
            'Trong danh sách nước của package, khi chưa nộp hồ sơ ở nước đó',
            'Đã nộp thì suất nước đó đã dùng. Muốn thêm nước ngoài số suất thì lên package cao hơn',
          ],
        },
      ],
    },
    {
      id: 'goi-doi-giu',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Khi đổi nước: coin không hoàn lại, giấy tờ dùng chung như IELTS và hộ chiếu giữ nguyên, trường đã bỏ rời khỏi danh sách theo dõi.',
    },

    { id: 'cac-feature', sectionId: 'cac-feature', kind: 'heading', text: '3. Các feature' },
    { id: 'goi-ba-tier', sectionId: 'journey-student', kind: 'heading', text: 'a. Student journey + mentor tracking' },
    {
      id: 'goi-tier-preview',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Đánh giá lại benefit và xem mỗi gói thấy dashboard, trang journey ra sao: [[/tier-preview|Benefit 3 gói và UI preview]].',
    },

    { id: 'application-management', sectionId: 'cac-feature', kind: 'heading', text: 'b. Application management' },
    {
      id: 'application-management-placeholder',
      sectionId: 'cac-feature',
      kind: 'text',
      text: 'Chưa có, bổ sung sau.',
    },

    { id: 'coin-system-mission', sectionId: 'cac-feature', kind: 'heading', text: 'c. Coin system and mission' },
    {
      id: 'coin-system-mission-note',
      sectionId: 'cac-feature',
      kind: 'text',
      text: 'Học sinh dùng coin như ví để trả lớp Tutor, báo cáo AI. Cách kiếm, hạn dùng và quy đổi nằm ở [[/he-thong-coin|Hệ thống và cách tìm coin]]. Gói coin mua thêm nằm ở [[/goi-coin|Các gói coin lẻ]], cũng được dẫn từ mục 4. Free kiếm coin qua nhiệm vụ, tối đa 50 coin / tháng.',
    },

    { id: 'tutor', sectionId: 'tutor', kind: 'heading', text: 'd. Book class tutor' },
    {
      id: 'tutor-ai-lam',
      sectionId: 'tutor',
      kind: 'text',
      text: 'Ai làm Tutor: học viên cũ đã đi du học, dạy kinh nghiệm thật ở từng nước. Giáo viên IELTS, HSK, tiếng Pháp, tiếng Hà Lan. Người sửa essay, luyện phỏng vấn visa. Ngoại khoá do USAS tổ chức, không phải lớp của Tutor.',
    },
    {
      id: 'tutor-quy-trinh',
      sectionId: 'tutor',
      kind: 'text',
      text: 'Quy trình vào nền tảng: nộp đơn bằng cấp, kinh nghiệm, video giới thiệu. Admin duyệt hồ sơ, dạy thử 1 buổi. Tutor đã duyệt được mở lớp cho mọi học sinh, mọi Tutor ngang nhau, không chia cấp độ. Mọi lớp của Tutor đều trả bằng coin, coin trong package cũng dùng được.',
    },
    {
      id: 'tutor-luat',
      sectionId: 'tutor',
      kind: 'text',
      text: 'Luật chơi: Tutor nhận 75%, nền tảng giữ 25%. Tutor tự đặt giá trong khung 150–600 coin mỗi buổi. Chặn chia sẻ số điện thoại, Zalo, email trong chat. Điểm dưới 4,0 thì tạm dừng nhận học sinh. Học sinh huỷ trước 24h được hoàn coin.',
    },
    {
      id: 'tutor-chi-so',
      sectionId: 'tutor',
      kind: 'text',
      text: 'Tutor được mở ở giai đoạn đầu khi đủ 10–20 người. Phí nền tảng mỗi buổi là 25%.',
    },
    {
      id: 'tutor-mentor-mo-lop',
      sectionId: 'tutor',
      kind: 'text',
      text: 'Mentor mở lớp dạy cho phép lúc mở ra mắt khi còn thiếu Tutor. Không tạo tài khoản thứ hai. Bật thêm quyền Tutor trên chính tài khoản mentor. Hồ sơ hiện nhãn “Mentor · Có mở lớp”, lớp dùng chung Studio, khung giá và hệ thống đánh giá với Tutor, và không được ưu tiên thu tiền trên Study Hub.',
    },
    {
      id: 'tutor-khong-tach',
      sectionId: 'tutor',
      kind: 'text',
      text: 'Vì sao không tách tài khoản: học sinh không bị rối giữa hai hồ sơ, hai khung chat của cùng một người. Điểm đánh giá không bị chia đôi. Khiếu nại và đối soát tiền chỉ nhìn một nơi. Mentor nghỉ việc chỉ gỡ quyền Mentor, quyền Tutor giữ hay bỏ tuỳ thoả thuận.',
    },
    {
      id: 'tutor-bon-luat',
      sectionId: 'tutor',
      kind: 'text',
      text: '4 luật bắt buộc: trả tiền dạy trong giờ làm thì tính vào lương hoặc KPI, doanh thu về công ty, dạy ngoài giờ thì chia 50–60%, thấp hơn mức 75% của Tutor vì đã có lương nền. Giờ hạn giờ dạy tối đa 30–40% thời gian làm việc để không bỏ bê tư vấn hồ sơ. Chồng xung đột lợi ích: journey luôn gợi ý ít nhất 2–3 lớp, mentor không tự gán lớp của mình vào journey học sinh mình phụ trách. Là giải pháp tạm: giờ dạy của mentor giảm dần khi Tutor tăng.',
    },

    { id: 'newsfeed', sectionId: 'cac-feature', kind: 'heading', text: 'e. Newsfeed sharing' },
    {
      id: 'newsfeed-placeholder',
      sectionId: 'cac-feature',
      kind: 'text',
      text: 'Chưa có, bổ sung sau.',
    },

    { id: 'ai-application', sectionId: 'cac-feature', kind: 'heading', text: 'f. AI application' },
    {
      id: 'ai-application-note',
      sectionId: 'cac-feature',
      kind: 'text',
      text: 'AI dự báo việc làm và định cư trừ coin trong ví: 150 coin cho một báo cáo, 350 coin để so sánh 3 trường. [[/ai-du-bao|Chi tiết AI dự báo]]',
    },

    {
      id: 'feature-other',
      sectionId: 'cac-feature',
      kind: 'heading',
      text: 'g. Other — telesale pre-step, test entry IELTS / SAT / GMAT, extracurricular',
    },
    {
      id: 'feature-other-telesale',
      sectionId: 'cac-feature',
      kind: 'text',
      text: 'Telesale pre-step: Buổi “Hẹn tư vấn 15 phút” đã mô tả ở role [[/#staff|Staff / Sales]] — cuộc gọi bán gói cho khách mới, không phải bước trong journey.',
    },
    {
      id: 'feature-other-test-entry',
      sectionId: 'cac-feature',
      kind: 'text',
      text: 'Test entry IELTS / SAT / GMAT: Chưa có, bổ sung sau.',
    },
    {
      id: 'feature-other-extracurricular',
      sectionId: 'cac-feature',
      kind: 'text',
      text: 'Extracurricular: [[/ngoai-khoa|Chi tiết gói ngoại khóa]]',
    },

    { id: 'goi', sectionId: 'goi', kind: 'heading', text: '4. Dòng tiền của web' },
    {
      id: 'dong-tien-bang',
      sectionId: 'goi',
      kind: 'table',
      columns: ['Dòng tiền', 'Cách thu'],
      rows: [
        {
          id: 'dong-tien-premium',
          cells: [
            'Package trọn gói U3, U9, U18, U27, U30 — 52.690.000 đến 297.800.000 VND',
            'Mua package trọn gói. [[/package-tron-goi|Bảng Premium Package]]',
          ],
        },
        {
          id: 'dong-tien-pro',
          cells: [
            'Pro — 4.900.000đ cho một journey, kèm 1.000 coin',
            'Mua một lần trên web, dùng đến khi có kết quả nộp và tối đa 24 tháng. Lên package trong 6 tháng thì trừ 4.900.000đ vào giá package.',
          ],
        },
        {
          id: 'dong-tien-coin',
          cells: [
            'Coin lẻ — 99k đến 799k / gói',
            'Học sinh tự mua trên web. Coin này là ví để trả các khoản bên dưới. [[/goi-coin|Các gói coin lẻ]] · [[/he-thong-coin|Hệ thống và cách tìm coin]]',
          ],
        },
        {
          id: 'dong-tien-tutor',
          cells: [
            'Phí nền tảng trên buổi học Tutor — 25% mỗi buổi',
            'Không thu riêng. Khi buổi học được trả bằng coin, nền tảng giữ 25%, Tutor nhận 75%.',
          ],
        },
        {
          id: 'dong-tien-ai',
          cells: [
            'AI dự báo việc làm và định cư — 150 coin / báo cáo, 350 coin / so sánh 3 trường',
            'Trừ coin trong ví. Coin đã thu lúc mua coin lẻ, hoặc đã nằm sẵn trong Pro hay package. [[/ai-du-bao|Chi tiết AI dự báo]]',
          ],
        },
        {
          id: 'dong-tien-ngoai-khoa',
          cells: [
            'Ngoại khoá — gói BASIC, ADVANCED, CORETEAM từ 2.000.000đ / suất',
            'U9, U18 đã gồm 2 hoạt động. USAS quản lý và tổ chức. [[/ngoai-khoa|Chi tiết gói ngoại khóa]]',
          ],
        },
      ],
    },
    {
      id: 'tien-va-coin',
      sectionId: 'goi',
      kind: 'text',
      text: 'Luật thanh toán: mua gói thì trả bằng tiền, dùng lẻ thì trả bằng coin. Coin không dùng để trả gói.',
    },
    {
      id: 'tien-va-coin-bang',
      sectionId: 'goi',
      kind: 'table',
      columns: ['Trả bằng tiền, mua gói', 'Trả bằng coin, dùng lẻ'],
      rows: [
        { id: 'tien-coin-1', cells: ['Pro — 4.900.000đ', 'Buổi học Tutor'] },
        { id: 'tien-coin-2', cells: ['Premium Package U3 đến U30', 'Báo cáo AI dự báo việc làm'] },
        { id: 'tien-coin-3', cells: ['Gói ngoại khóa theo nhóm 3-5 người', 'Mở match % học bổng'] },
        { id: 'tien-coin-4', cells: ['', 'Gói ngoại khóa cá nhân'] },
      ],
    },
    { id: 'implement-finance', sectionId: 'implement-finance', kind: 'heading', text: '5. Kế hoạch làm và kinh phí' },

    { id: 'phase2-ke-hoach', sectionId: 'implement-finance', kind: 'heading', text: 'a. Kế hoạch chính' },
    {
      id: 'phase2-tom-tat',
      sectionId: 'implement-finance',
      kind: 'text',
      text: 'Phase 2 làm xong các phần sau của web du học, rồi mở cho học sinh dùng: trang giới thiệu và form tư vấn; đăng nhập và trang tổng quan theo đúng quyền, có hiện số coin; thanh toán PayOS và sổ giao dịch coin; đặt lịch lớp học, trừ coin, đổi hoặc hủy theo quy định; xem hành trình, nộp hồ sơ và theo dõi trạng thái; bảng tin cơ bản; trang quản trị để nhận thông tin khách, sửa nội dung và duyệt bài. Không làm trong Phase 2: Zalo Mini App, gợi ý nâng cao, AI chấm bài, và các nâng cấp sau khi mở web.',
    },
    {
      id: 'phase2-moc-chinh',
      sectionId: 'implement-finance',
      kind: 'text',
      text: '3 người. Phần làm và phần kiểm tra chạy song song. Học sinh bắt đầu dùng ngày 30/11/2026. Sau đó chỉ sửa lỗi đến hết 02/12/2026.',
    },
    {
      id: 'phase2-lich-chi-tiet',
      sectionId: 'implement-finance',
      kind: 'text',
      text: 'Lịch từng chặng nằm ở sheet làm việc.',
    },
    {
      id: 'phase2-timeline-tom-tat',
      sectionId: 'implement-finance',
      kind: 'text',
      text: 'Tóm tắt để duyệt:',
    },
    {
      id: 'phase2-timeline',
      sectionId: 'implement-finance',
      kind: 'table',
      columns: ['Chặng', 'Thời gian', 'Kết quả cuối chặng'],
      rows: [
        {
          id: 'phase2-tl-p01',
          cells: ['P01 Chốt thiết kế và đầu vào', '12/10/2026 – 23/10/2026', 'Bản thiết kế và đầu vào đã chốt, đủ để làm các phần sau'],
          details: [
            { id: 'phase2-tl-p01-t01', cells: ['T01 · Chốt dữ liệu phía hệ thống', '10/10/2026 – 11/10/2026', 'Có danh sách người phụ trách, hạn bàn giao và nguồn dữ liệu; đã rà thiếu đầu vào.'] },
            { id: 'phase2-tl-p01-t02', cells: ['T02 · Chốt nhận diện và nội dung trang giới thiệu', '10/10/2026 – 11/10/2026', 'Chốt có đổi nhận diện hay không; logo, quy chuẩn nhận diện và nội dung trang giới thiệu được duyệt.'] },
            { id: 'phase2-tl-p01-t03', cells: ['T03 · Chốt phạm vi, vai trò và ngân sách', '12/10/2026 – 13/10/2026', 'Phạm vi kỹ thuật chốt 12/10; vai trò và ngân sách hoàn tất 13/10. Chốt đặc tả, phần mentor, quyền truy cập, đơn giá và phần code dùng lại.'] },
            { id: 'phase2-tl-p01-t04', cells: ['T04 · Chốt bản Figma các luồng chính', '13/10/2026 – 16/10/2026', 'USAS duyệt bản máy tính và điện thoại, luồng đặt lịch, màn hình khi lỗi hoặc chưa có dữ liệu, và quyền theo từng vai trò.'] },
            { id: 'phase2-tl-p01-t05', cells: ['T05 · Nền tảng phía hệ thống và bản thử nội bộ', '13/10/2026 – 16/10/2026', 'Có sơ đồ dữ liệu, cách các phần gửi dữ liệu cho nhau, đăng nhập và phân quyền, cấu hình môi trường; bản thử nội bộ chạy được.'] },
            { id: 'phase2-tl-p01-t06', cells: ['T06 · Thành phần giao diện và bố cục', '13/10/2026 – 16/10/2026', 'Thành phần giao diện, bố cục máy tính và điện thoại, và đường dẫn trang đã sẵn; áp bản Figma sau T04.'] },
            { id: 'phase2-tl-p01-t07', cells: ['T07 · Bàn giao nội dung trang giới thiệu', '13/10/2026 – 16/10/2026', 'Nội dung, hình ảnh, nút liên hệ và tài liệu công khai đã duyệt; có quyền sử dụng.'] },
            { id: 'phase2-tl-p01-t08', cells: ['T08 · Chốt bảng giá, coin và lớp học', '13/10/2026 – 16/10/2026', 'Duyệt giá, quy đổi coin, hoàn và hủy, lịch và suất, và quy định thanh toán; chốt PayOS.'] },
          ],
        },
        {
          id: 'phase2-tl-p02',
          cells: ['P02 Làm web cho học sinh', '19/10/2026 – 13/11/2026', 'Web du học cho học sinh chạy được các phần đã nêu ở trên'],
          details: [
            { id: 'phase2-tl-p02-t09', cells: ['T09 · Trang giới thiệu và form tư vấn · giao diện', '19/10/2026 – 23/10/2026', 'Trang giới thiệu xem được trên điện thoại, nút kêu gọi và form chạy, tìm thấy trên Google ở mức cơ bản, nội dung đã duyệt.'] },
            { id: 'phase2-tl-p02-t10', cells: ['T10 · Sửa nội dung và nhận thông tin khách · phần hệ thống', '19/10/2026 – 23/10/2026', 'Thông tin khách được lưu và có báo; quản trị sửa được nội dung cơ bản; đã kiểm tra quyền.'] },
            { id: 'phase2-tl-p02-t11', cells: ['T11 · Tài khoản và trang tổng quan · giao diện', '19/10/2026 – 30/10/2026', 'Đăng nhập được, vào đúng trang tổng quan theo quyền và thấy số coin; không lộ dữ liệu của vai trò khác.'] },
            { id: 'phase2-tl-p02-t12', cells: ['T12 · PayOS và sổ giao dịch coin · phần hệ thống', '19/10/2026 – 30/10/2026', 'Tin báo thanh toán không bị ghi trùng; đối soát được giao dịch và số dư; đã thử lỗi, hoàn tiền và gửi lại.'] },
            { id: 'phase2-tl-p02-t15', cells: ['T15 · Bàn giao hành trình và học bổng', '19/10/2026 – 23/10/2026', 'Nguồn và tài liệu chuẩn, các bước hành trình và tiêu chí ứng tuyển được duyệt.'] },
            { id: 'phase2-tl-p02-t13', cells: ['T13 · Đặt lịch và quản lý lịch · giao diện', '02/11/2026 – 13/11/2026', 'Chọn được suất, dùng coin, đổi hoặc hủy đúng quy định; cách nối với phần hệ thống được chốt trước khi làm.'] },
            { id: 'phase2-tl-p02-t14', cells: ['T14 · Đặt lịch, suất và trừ coin · phần hệ thống', '02/11/2026 – 13/11/2026', 'Không trùng suất hoặc trừ coin hai lần; có xác nhận lịch; hoàn và hủy đúng quy định.'] },
            { id: 'phase2-tl-p02-t16', cells: ['T16 · Hành trình và nộp hồ sơ · phần hệ thống', '02/11/2026 – 13/11/2026', 'Theo dõi được từng bước, tải hồ sơ lên và đúng quyền truy cập; giả định dùng lại code có sẵn.'] },
            { id: 'phase2-tl-p02-t17', cells: ['T17 · Hành trình và nộp hồ sơ · giao diện', '02/11/2026 – 13/11/2026', 'Học sinh xem được hành trình, nộp hồ sơ và theo dõi trạng thái; có xử lý khi tải file bị lỗi.'] },
          ],
        },
        {
          id: 'phase2-tl-p03',
          cells: ['P03 Trang quản trị để vận hành', '02/11/2026 – 20/11/2026', 'Trang quản trị để vận hành nội dung và công việc hằng ngày'],
          details: [
            { id: 'phase2-tl-p03-t18', cells: ['T18 · Bàn giao nội dung bảng tin và cộng đồng', '19/10/2026 – 23/10/2026', 'Có nội dung mẫu và quy tắc duyệt bài đủ cho bảng tin cơ bản; chưa có gợi ý tự động.'] },
            { id: 'phase2-tl-p03-t20', cells: ['T20 · Bảo mật, email và sao lưu · phần hệ thống', '05/11/2026 – 18/11/2026', 'Đã kiểm tra phân quyền, cảnh báo, email, sao lưu và khôi phục; đã đo tải theo kịch bản USAS duyệt.'] },
            { id: 'phase2-tl-p03-t19', cells: ['T19 · Trang quản trị và bảng tin cơ bản · giao diện', '16/11/2026 – 18/11/2026', 'Thêm, sửa, xóa và duyệt nội dung được; bảng tin theo quy tắc đơn giản; chưa có gợi ý nâng cao.'] },
          ],
        },
        {
          id: 'phase2-tl-p04',
          cells: ['P04 Ghép các phần và cho client xem bản thử', '26/10/2026 – 25/11/2026', 'Các phần đã ghép xong và client đã xem bản thử'],
          details: [
            { id: 'phase2-tl-p04-t21', cells: ['T21 · Kiểm tra khi ghép, client xem thử, và sửa lỗi', '26/10/2026 – 25/11/2026', 'Kiểm tra từng phần ngay khi nhận bàn giao; kiểm tra lại sau mỗi lần sửa. Trước 25/11 không còn lỗi chặn hoặc lỗi nặng. Luồng thanh toán, quyền, sao lưu và khôi phục phải đạt.'] },
          ],
        },
        {
          id: 'phase2-tl-p05',
          cells: ['P05 Bản sắp lên và dữ liệu sẵn sàng', '23/11/2026 – 26/11/2026', 'Bản sắp lên và dữ liệu đã sẵn sàng'],
          details: [
            { id: 'phase2-tl-p05-t22', cells: ['T22 · Đưa dữ liệu vào và hướng dẫn', '23/11/2026 – 25/11/2026', 'Dữ liệu chính thức được duyệt và đưa vào; đã dọn dữ liệu thử; đội vận hành được hướng dẫn.'] },
            { id: 'phase2-tl-p05-t23', cells: ['T23 · Kiểm tra lại lần cuối và chốt bản sắp lên', '26/11/2026', 'Bản sắp lên đã khóa phạm vi. Lần kiểm tra cuối đạt. Không còn lỗi chặn hoặc lỗi nặng trước khi sang bước quyết định lên thật.'] },
          ],
        },
        {
          id: 'phase2-tl-p06',
          cells: ['P06 Quyết định có lên thật hay chưa', '26/11/2026', 'Đã có quyết định có lên web thật hay chưa'],
          details: [
            { id: 'phase2-tl-p06-t24', cells: ['T24 · Kiểm tra sẵn sàng lên web thật', '26/11/2026', 'Bản sắp lên chốt buổi sáng 26/11; USAS ký có lên hay chưa ngay sau đó. Có cấu hình web thật, cách quay về bản cũ, người trực và điều kiện dừng triển khai.'] },
          ],
        },
        {
          id: 'phase2-tl-p07',
          cells: ['P07 Học sinh bắt đầu dùng, sửa lỗi đến 02/12/2026', '30/11/2026 – 02/12/2026', 'Học sinh bắt đầu dùng từ 30/11/2026; chỉ sửa lỗi đến hết 02/12/2026'],
          details: [
            { id: 'phase2-tl-p07-t25', cells: ['T25 · Đưa lên web thật và kiểm tra nhanh', '30/11/2026', 'Đưa lên web thật, kiểm tra nhanh các luồng quan trọng và đối soát; quay về bản cũ nếu có lỗi nghiêm trọng.'] },
            { id: 'phase2-tl-p07-t26', cells: ['T26 · Theo dõi và sửa lỗi sau khi mở', '01/12/2026 – 02/12/2026', 'Theo dõi web đang chạy, sửa lỗi phát sinh, kiểm tra lại và chốt ổn định. Trong thời gian này chỉ sửa lỗi, không thêm tính năng mới.'] },
          ],
        },
      ],
    },

    { id: 'phase2-chi', sectionId: 'implement-finance', kind: 'heading', text: 'b. Các khoản cần duyệt' },
    {
      id: 'phase2-chi-luu-y',
      sectionId: 'implement-finance',
      kind: 'text',
      text: 'Số dưới đây là các khoản cần duyệt. Tỷ giá tính 26.000 VNĐ/USD. Chưa gồm thuế VAT, phí thanh toán hoặc tên miền mới.',
    },
    {
      id: 'phase2-chi-bang',
      sectionId: 'implement-finance',
      kind: 'table',
      columns: ['Khoản chi', 'Thành tiền (VNĐ)', 'Ghi chú'],
      rows: [
        {
          id: 'phase2-chi-nhan-su',
          cells: ['Nhân sự', '11.250.000', '75 người-ngày × 150.000 VNĐ. Làm web, kiểm tra, đưa lên web thật và sửa lỗi sau khi mở.'],
        },
        {
          id: 'phase2-chi-figma',
          cells: ['Figma', '936.000', '3 ghế cho người làm × 12 USD × 1 tháng. Đơn giá ghế cần xác nhận trước khi mua.'],
        },
        {
          id: 'phase2-chi-ai',
          cells: ['AI coding', '13.000.000', 'Trần 500 USD cho cả đợt này. Không gia hạn ngoài phạm vi này.'],
        },
        {
          id: 'phase2-chi-ha-tang',
          cells: ['Hạ tầng', '1.300.000', '650.000 VNĐ/tháng × 2 tháng, tới hết 02/12/2026.'],
        },
        { id: 'phase2-chi-tam-tinh', cells: ['Tạm tính', '26.486.000', ''] },
        { id: 'phase2-chi-du-phong', cells: ['Dự phòng', '2.648.600', '10% trên tạm tính.'] },
        { id: 'phase2-chi-tong', cells: ['Tổng', '29.134.600', ''] },
      ],
    },

  ] satisfies PlanBlock[],
}
