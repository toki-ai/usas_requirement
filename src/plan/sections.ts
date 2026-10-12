import type { PlanBlock } from '../types'
import { journeyRoadmap } from './journeySteps'

export const plan = {
  title: 'Kế hoạch toàn hệ thống: nền tảng du học online',
  lines: [
    { id: 'overview', sectionId: 'overview', kind: 'heading', text: '1. Overview' },
    {
      id: 'overview-web',
      sectionId: 'overview',
      kind: 'text',
      text: 'Đây là web du học online cho học sinh. Học sinh lập hồ sơ, chọn quốc gia và trường, rồi đi một journey từ chuẩn bị hồ sơ đến lúc lên đường. Có 3 gói: Free để xem đường đi, Pro để tự đi một journey, Premium là package trọn gói U3 đến U30 có người dẫn. Giờ học trên brochure không đặt lịch mentor cố định: đổi thành coin để học sinh tự book lớp.',
    },
    { id: 'goi', sectionId: 'goi', kind: 'heading', text: '2. Dòng tiền' },
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
            'Ngoại khoá — gói BASIC, ADVANCED, CORETEAM từ 2.000.000đ / suất, hoạt động lẻ 700 coin',
            'Mua gói bằng tiền, theo suất trong nhóm 3 hoặc nhóm 5. Hoạt động lẻ trừ coin. U9, U18 đã gồm 2 hoạt động. USAS quản lý và tổ chức. [[/ngoai-khoa|Chi tiết gói ngoại khóa]]',
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

    { id: 'journey-student', sectionId: 'journey-student', kind: 'heading', text: '3. Journey của student' },
    journeyRoadmap,

    { id: 'journey-mot-template', sectionId: 'journey-student', kind: 'heading', text: 'Một journey cho cả 3 gói' },
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
      id: 'journey-mot-template-ngoai-le',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Chỉ có 2 chỗ cần biến thể, và vẫn giữ đủ 9 bước. Một là lộ trình nén khi học sinh vào lúc còn dưới 9 tháng tới D: bước 3 và bước 4 chạy cùng lúc, buổi mentor gộp theo phương án nén 8 mốc của cẩm nang (B2 + B3, B5 + B6, B8 + B9, B10 + B11), và gia đình được báo trước là hoạt động ngoại khóa gần như không kịp bồi đắp. Khóa kế hoạch ở bước 3, mốc giấy tờ T3 và rà soát trước khi nộp không được nén. Hai là nội dung theo nước ở bước 4 và bước 7: giấy tờ, chuẩn CV, checklist visa, mốc chứng minh tài chính. Đây là dữ liệu theo nước gắn vào bước, không phải template riêng.',
    },

    { id: 'goi-ba-tier', sectionId: 'journey-student', kind: 'heading', text: '3 tier chính của student' },
    {
      id: 'goi-tier-preview',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Đánh giá lại benefit và xem mỗi gói thấy dashboard, trang journey ra sao: [[/tier-preview|Benefit 3 gói và UI preview]].',
    },
    {
      id: 'goi-mot-cau',
      sectionId: 'journey-student',
      kind: 'table',
      columns: ['Gói', 'Một câu cho người dùng', 'Dành cho ai', 'Giá'],
      rows: [
        { id: 'goi-free', cells: ['Free', 'Xem đường đi', 'Học sinh mới tìm hiểu, chưa chọn nước và trường', '0đ'] },
        { id: 'goi-pro', cells: ['Pro', 'Tự đi, có bản đồ và deadline từng trường', 'Đã chọn 1 nước, tự làm hồ sơ, không đủ tiền package', '4.900.000đ một lần cho 1 journey, kèm 1.000 coin'] },
        { id: 'goi-premium', cells: ['Premium', 'Có người dẫn đi', 'Nhiều nước, cần người duyệt hồ sơ, học bổng, visa', 'Premium Package U3 đến U30, 52.690.000 đến 297.800.000 VND'] },
      ],
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
    {
      id: 'goi-tru-tien',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Lên package trong 6 tháng sau khi mua Pro thì trừ toàn bộ 4.900.000đ vào giá package. Pro là bước đệm lên Premium, không phải đối thủ của nó.',
    },

    { id: 'goi-doi', sectionId: 'journey-student', kind: 'heading', text: 'Đổi trường và đổi nước' },
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

    { id: 'goi-nang-cap', sectionId: 'journey-student', kind: 'heading', text: 'Khi nào người dùng cần nâng cấp' },
    {
      id: 'ban-nguyen-tac',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Tỷ lệ trả tiền được tạo ra ở đây. Mỗi lúc gặp vấn đề là một màn hình riêng, dùng số liệu của chính học sinh đó. Với package, nút chính luôn là “Hẹn tư vấn 15 phút”, vì gói hàng chục đến hàng trăm triệu cần nói chuyện trước khi mua.',
    },
    {
      id: 'goi-nang-cap-bang',
      sectionId: 'journey-student',
      kind: 'table',
      columns: ['Từ', 'Lúc gặp vấn đề', 'Người dùng thấy gì', 'Mời'],
      rows: [
        { id: 'nang-cap-truong-3', cells: ['Free', 'Thêm trường thứ 3', 'Mỗi trường một deadline và bộ giấy tờ khác nhau, tự ghi chép là sót', 'Pro'] },
        { id: 'nang-cap-deadline', cells: ['Free', 'Chọn xong trường, mở journey', 'Journey chỉ có 9 bước chung, không biết hạn nào của trường nào', 'Pro'] },
        { id: 'nang-cap-match', cells: ['Free', 'Mở học bổng thứ 4 trong tháng', 'Match % bị làm mờ', 'Pro, hoặc 5 coin cho 1 học bổng'] },
        { id: 'ban-bao-cao', cells: ['Free, Pro', 'Xem xong bản xem trước dự báo việc làm', 'Muốn biết khoản đầu tư có đáng không', '150 coin, hoặc package có sẵn báo cáo'] },
        { id: 'nang-cap-nuoc-2', cells: ['Pro', 'Muốn thêm nước thứ 2', 'Pro chỉ mở 1 nước', 'Package U3'] },
        { id: 'ban-ho-so', cells: ['Pro', 'Tới bước 4: Hồ sơ', 'Thấy khối lượng giấy tờ', 'Hẹn tư vấn package'] },
        { id: 'nang-cap-essay', cells: ['Pro', 'Viết xong essay và hồ sơ', 'Không biết đủ tốt chưa, không có ai duyệt', 'Package có mentor'] },
        { id: 'nang-cap-hoc-bong', cells: ['Pro', 'Match thấy học bổng phù hợp', 'Biết học bổng nhưng không biết apply', 'Package U18 trở lên'] },
        { id: 'ban-buoi-2', cells: ['Pro', 'Học xong buổi thứ 2 với Tutor', 'Đã quen trả bằng coin, coin kèm Pro sắp hết', 'Package, coin có sẵn rẻ hơn'] },
        { id: 'nang-cap-gap', cells: ['Pro', 'Còn 45 ngày tới deadline mà hồ sơ chưa xong', 'Sợ trễ, tự làm không kịp', 'Hẹn tư vấn package'] },
        { id: 'nang-cap-visa', cells: ['Pro', 'Nhận offer', 'Visa và nhà ở chỉ có checklist chung', 'Package có mentor hỗ trợ visa'] },
      ],
    },

    { id: 'goi-ai-tieu-de', sectionId: 'journey-student', kind: 'heading', text: 'Chi phí AI của Pro' },
    {
      id: 'goi-ai-chi-phi',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Journey Pro chạy bằng dữ liệu trường và luật, không gọi AI mỗi lần mở trang. Dữ liệu deadline, giấy tờ và điểm yêu cầu do mentor cập nhật mỗi mùa. AI chỉ chạy khi có thay đổi như thêm trường, đổi điểm, có kết quả, tối đa 10 lần mỗi tháng. Hỏi AI tự do và báo cáo AI dự báo trả bằng coin.',
    },

    { id: 'journey', sectionId: 'journey-student', kind: 'heading', text: 'Luật chung của journey' },
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

    { id: 'cau-hoi-mo', sectionId: 'journey-student', kind: 'heading', text: 'Câu hỏi mở' },
    {
      id: 'cau-hoi-mo-kenh-thong-bao',
      sectionId: 'journey-student',
      kind: 'text',
      text: 'Thông báo gửi qua kênh nào: trong app, email, Zalo, hay push? Hiện chốt nhắc hạn của Pro là thông báo trong app.',
    },

    { id: 'vai-tro', sectionId: 'vai-tro', kind: 'heading', text: '4. Vai trò người dùng' },
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
      text: 'Mentor, staff và admin do nội bộ chỉ định, không có nút đăng ký công khai. Mọi role đăng nhập bằng OTP qua email hoặc số điện thoại.',
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
          id: 'staff',
          title: 'Staff',
          badge: 'Nhiều phòng ban',
          items: [
            'Một loại tài khoản nội bộ. Admin chỉ định và gán phòng ban.',
            'Sales, marketing, kế toán và các phòng khác không phải role riêng.',
          ],
          departments: [
            {
              name: 'Sales',
              items: [
                'Nhận lead từ form landing page, gọi, Zalo hoặc Messenger.',
                'Nhận lịch hẹn tư vấn online 15 phút.',
                'Gửi đề xuất gói lên web, hoặc tạo đơn kèm link thanh toán.',
                'Gửi lại mã kích hoạt. Không tự tạo mã, không tự xác nhận tiền.',
              ],
            },
            {
              name: 'Marketing',
              items: [
                'Làm landing page, nội dung và kênh đưa lead về cho Sales.',
                'Cùng tài khoản staff, chỉ khác phòng ban.',
              ],
            },
            {
              name: 'Kế toán',
              items: [
                'Xác nhận đơn đóng tiền offline, sau đó hệ thống gửi mã kích hoạt.',
                'Đối soát cổng thanh toán hằng ngày.',
                'Duyệt chi cho Tutor và mentor ngoài giờ.',
                'Chuyển các khoản hoàn tiền admin đã duyệt.',
              ],
            },
          ],
        },
        {
          id: 'admin',
          title: 'Admin',
          items: [
            'Vận hành. Nội bộ.',
            'Gán mentor cho học sinh. Gán phòng ban cho staff.',
            'Duyệt Tutor, kiểm duyệt Feed và chat.',
            'Quản lý gói, coin, nhân sự.',
            'Duyệt hoàn tiền, xử lý ticket.',
            'Báo cáo doanh thu.',
          ],
        },
      ],
    },
    { id: 'tutor', sectionId: 'tutor', kind: 'heading', text: '5. Tutor' },
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
      text: 'Quy trình vào nền tảng: nộp đơn bằng cấp, kinh nghiệm, video giới thiệu. Admin duyệt hồ sơ, dạy thử 1 buổi. Cấp độ Verified được mở lớp cho mọi học sinh. Cấp độ Premium được nhận học sinh dùng coin trong package, cần điểm từ 4,5/5 sau 10 buổi.',
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
      text: 'Tutor được mở ở giai đoạn đầu khi đủ 10–20 người. Phí nền tảng mỗi buổi là 25%. Điểm để dạy học sinh Premium là từ 4,5/5.',
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

    { id: 'chi-so', sectionId: 'chi-so', kind: 'heading', text: '6. Chỉ số cần đo' },
    {
      id: 'chi-so-kich-hoat',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Kích hoạt: phần trăm học sinh đặt mục tiêu và tick 1 task trong 7 ngày đầu.',
    },
    {
      id: 'chi-so-free-pro',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Trả tiền lần đầu: phần trăm học sinh Free mua coin hoặc Pro trong 30 ngày.',
    },
    {
      id: 'chi-so-pro-premium',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Pro lên package: phần trăm người mua Pro lên package trong 6 tháng, tức còn được trừ 4.900.000đ.',
    },
    {
      id: 'chi-so-hen',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Hẹn tư vấn: phần trăm học sinh đặt lịch 15 phút, và phần trăm chốt gói sau cuộc gọi.',
    },
    {
      id: 'chi-so-chuyen-day',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Dạy chuyển sang Tutor: phần trăm giờ dạy kỹ năng do mentor đảm nhận, phải giảm dần, khoảng 80% lúc ra mắt, dưới 30% sau 6 tháng.',
    },
    {
      id: 'chi-so-ai',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'AI dự báo việc làm: phần trăm xem trước mua báo cáo đầy đủ, và phần trăm người mua báo cáo hẹn tư vấn package trong 30 ngày.',
    },
    {
      id: 'chi-so-xung-dot',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Xung đột lợi ích: phần trăm học sinh của một mentor học lớp do chính mentor đó dạy.',
    },
    {
      id: 'chi-so-coin-ton',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Coin còn dư: phần trăm coin trong gói chưa dùng khi hết hạn. Cao quá thì khách thấy thiệt, thấp quá thì lãi mỏng.',
    },
    {
      id: 'chi-so-mentor',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Số học sinh trên mentor: phải tăng dần theo thời gian. Đây là chỉ số lợi nhuận quan trọng nhất.',
    },
    {
      id: 'chi-so-chat-luong',
      sectionId: 'chi-so',
      kind: 'text',
      text: 'Chất lượng: điểm đánh giá Tutor, mentor và tỷ lệ có offer.',
    },

    { id: 'rui-ro', sectionId: 'rui-ro', kind: 'heading', text: '7. Rủi ro cần chặn sớm' },
    {
      id: 'rui-ro-chat-luong',
      sectionId: 'rui-ro',
      kind: 'text',
      text: 'Chất lượng Tutor: khách mua package từ 52.690.000 VND sẽ không chấp nhận một buổi học dở. Chỉ Tutor cấp Premium được nhận coin trong package.',
    },
    {
      id: 'rui-ro-keo-sinh',
      sectionId: 'rui-ro',
      kind: 'text',
      text: 'Tutor kéo học sinh ra ngoài: chặn chia sẻ liên lạc, mọi thanh toán qua nền tảng, thưởng cho Tutor có học sinh quay lại.',
    },
    {
      id: 'rui-ro-pro',
      sectionId: 'rui-ro',
      kind: 'text',
      text: 'Pro ăn vào package: Pro chỉ mở 1 nước, không có mentor, không có visa. Đổi nước tối đa 2 lần và khóa sau khi nộp, để Pro không thành package giá rẻ.',
    },
    {
      id: 'rui-ro-ai',
      sectionId: 'rui-ro',
      kind: 'text',
      text: 'Dự báo AI bị hiểu là cam kết: con số sai hoặc bị sales dùng để hứa sẽ gây khiếu nại. Luôn hiện dạng khoảng và nguồn dữ liệu, làm mới JD hằng tháng, so dự báo với kết quả thật của học viên cũ để chỉnh mô hình.',
    },
    {
      id: 'rui-ro-agency',
      sectionId: 'rui-ro',
      kind: 'text',
      text: 'Agency du học miễn phí: package phải bán điều agency không có, người đã từng học ở đó, lời khuyên độc lập.',
    },
    {
      id: 'rui-ro-offline',
      sectionId: 'rui-ro',
      kind: 'text',
      text: 'Khách offline cũ: ảnh chụp bị cắt ở đây, phần còn lại của mục này chưa có trong plan.',
    },
  ] satisfies PlanBlock[],
}
