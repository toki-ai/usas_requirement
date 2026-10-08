import type { PlanBlock } from '../types'

export const plan = {
  title: 'Kế hoạch toàn hệ thống: nền tảng du học online',
  lines: [
    { id: 'overview', sectionId: 'overview', kind: 'heading', text: '1. Overview' },
    {
      id: 'overview-web',
      sectionId: 'overview',
      kind: 'text',
      text: 'Đây là web du học online cho học sinh và phụ huynh. Học sinh lập hồ sơ, chọn quốc gia và trường, rồi đi một journey từ chuẩn bị hồ sơ đến lúc lên đường. Có 3 gói: Free để xem đường đi, Pro để tự đi một journey, Premium là package trọn gói U3 đến U30 có người dẫn. Giờ học trên brochure không đặt lịch mentor cố định: đổi thành coin để học sinh tự book lớp.',
    },
    { id: 'goi', sectionId: 'goi', kind: 'heading', text: '2. Gói và dòng tiền' },
    { id: 'dong-tien', sectionId: 'goi', kind: 'heading', text: 'Dòng tiền' },
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
            'Mua package trọn gói.',
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
            'Học sinh tự mua trên web. Coin này là ví để trả các khoản bên dưới.',
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
            'Trừ coin trong ví. Coin đã thu lúc mua coin lẻ, hoặc đã nằm sẵn trong Pro hay package. [[/ai-du-bao|Xem chi tiết]]',
          ],
        },
        {
          id: 'dong-tien-ngoai-khoa',
          cells: [
            'Ngoại khoá — gói BASIC, ADVANCED, CORETEAM từ 2.000.000đ / suất, hoạt động lẻ 700 coin',
            'Mua gói bằng tiền, theo suất trong nhóm 3 hoặc nhóm 5. Hoạt động lẻ trừ coin. U9, U18 đã gồm 2 hoạt động. USAS quản lý và tổ chức. [[/ngoai-khoa|Xem chi tiết]]',
          ],
        },
      ],
    },
    {
      id: 'tien-va-coin',
      sectionId: 'goi',
      kind: 'text',
      text: 'Luật thanh toán: mua gói thì trả bằng tiền, dùng lẻ thì trả bằng coin. Coin không dùng để trả gói. Giá coin luôn hiện kèm tiền, ví dụ 700 coin (≈ 700.000đ).',
    },
    {
      id: 'tien-va-coin-bang',
      sectionId: 'goi',
      kind: 'table',
      columns: ['Trả bằng tiền, mua gói', 'Trả bằng coin, dùng lẻ'],
      rows: [
        { id: 'tien-coin-1', cells: ['Pro — 4.900.000đ', 'Buổi học Tutor'] },
        { id: 'tien-coin-2', cells: ['Package U3 đến U30', 'Báo cáo AI dự báo việc làm'] },
        { id: 'tien-coin-3', cells: ['Gói ngoại khoá BASIC, ADVANCED, CORETEAM', 'Mở match % học bổng'] },
        { id: 'tien-coin-4', cells: ['', '1 hoạt động ngoại khoá lẻ'] },
      ],
    },

    { id: 'goi-ba-tier', sectionId: 'goi', kind: 'heading', text: '3 tier chính của student' },
    {
      id: 'goi-mot-cau',
      sectionId: 'goi',
      kind: 'table',
      columns: ['Gói', 'Một câu cho người dùng', 'Dành cho ai', 'Giá'],
      rows: [
        { id: 'goi-free', cells: ['Free', 'Xem đường đi', 'Học sinh mới tìm hiểu, chưa chọn nước và trường', '0đ'] },
        { id: 'goi-pro', cells: ['Pro', 'Tự đi, có bản đồ và deadline từng trường', 'Đã chọn 1 nước, tự làm hồ sơ, không đủ tiền package', '4.900.000đ một lần cho 1 journey, kèm 1.000 coin'] },
        { id: 'goi-premium', cells: ['Premium', 'Có người dẫn đi', 'Nhiều nước, cần người duyệt hồ sơ, học bổng, visa', 'Package U3 đến U30, 52.690.000 đến 297.800.000 VND'] },
      ],
    },
    {
      id: 'goi-bang',
      sectionId: 'goi',
      kind: 'table',
      columns: ['Tính năng', 'Free', 'Pro', 'Premium package'],
      rows: [
        { id: 'goi-muc-tieu', cells: ['Số quốc gia', '1, chỉ để xem', '1', 'Theo package: 2 đến không giới hạn'] },
        { id: 'goi-theo-doi', cells: ['Số trường theo dõi', '2', 'Tối đa 8 trường trong nước đó', 'Tự theo dõi như Pro, cộng số trường mentor làm hồ sơ cùng theo package'] },
        { id: 'goi-journey', cells: ['Journey', '9 bước chung, không có deadline theo trường', 'Task, giấy tờ và deadline riêng từng trường, tự cập nhật khi đổi trường hoặc điểm', 'Như Pro, mentor chỉnh và duyệt'] },
        { id: 'goi-match', cells: ['Match % học bổng', '3 lần / tháng, còn lại hiện mờ', 'Không giới hạn, kèm còn thiếu gì', 'Như Pro, mentor chọn và apply theo package'] },
        { id: 'goi-ai-tinh-chinh', cells: ['AI tinh chỉnh journey', 'Không', '10 lần / tháng, chạy khi có thay đổi', 'Như Pro, mentor duyệt kết quả'] },
        { id: 'goi-ai', cells: ['AI dự báo việc làm và định cư', 'Xem trước mức Cao / TB / Thấp', 'Báo cáo đầy đủ trả bằng coin', '1 báo cáo mỗi quốc gia trong package'] },
        { id: 'goi-coin', cells: ['Coin', 'Nhiệm vụ, tối đa 50 coin / tháng', '1.000 coin kèm theo, hết hạn cùng Pro', 'Giờ học của package đổi thành coin'] },
        { id: 'goi-lop', cells: ['Lớp Tutor', 'Giá gốc', 'Giá gốc', 'Dùng coin trong package'] },
        { id: 'goi-chat-mentor', cells: ['Mentor duyệt hồ sơ, essay', 'Không', 'Không', 'Có'] },
        { id: 'goi-sau-offer', cells: ['Visa, nhà ở', 'Checklist chung', 'Checklist chung', 'Mentor hỗ trợ'] },
        { id: 'goi-phu-huynh', cells: ['Phụ huynh theo dõi', 'Không', 'Có', 'Có, kèm báo cáo của mentor'] },
        { id: 'goi-feed', cells: ['Feed, chat cộng đồng', 'Có', 'Có', 'Có'] },
      ],
    },
    {
      id: 'goi-tru-tien',
      sectionId: 'goi',
      kind: 'text',
      text: 'Lên package trong 6 tháng sau khi mua Pro thì trừ toàn bộ 4.900.000đ vào giá package. Pro là bước đệm lên Premium, không phải đối thủ của nó.',
    },

    { id: 'goi-doi', sectionId: 'goi', kind: 'heading', text: 'Đổi trường và đổi nước' },
    {
      id: 'goi-doi-bang',
      sectionId: 'goi',
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
      sectionId: 'goi',
      kind: 'text',
      text: 'Khi đổi nước: coin không hoàn lại, giấy tờ dùng chung như IELTS và hộ chiếu giữ nguyên, trường đã bỏ rời khỏi danh sách theo dõi.',
    },

    { id: 'goi-nang-cap', sectionId: 'goi', kind: 'heading', text: 'Khi nào người dùng cần nâng cấp' },
    {
      id: 'ban-nguyen-tac',
      sectionId: 'goi',
      kind: 'text',
      text: 'Tỷ lệ trả tiền được tạo ra ở đây. Mỗi lúc gặp vấn đề là một màn hình riêng, dùng số liệu của chính học sinh đó. Với package, nút chính luôn là “Hẹn tư vấn 15 phút”, vì gói hàng chục đến hàng trăm triệu cần nói chuyện trước khi mua.',
    },
    {
      id: 'goi-nang-cap-bang',
      sectionId: 'goi',
      kind: 'table',
      columns: ['Từ', 'Lúc gặp vấn đề', 'Người dùng thấy gì', 'Mời'],
      rows: [
        { id: 'nang-cap-truong-3', cells: ['Free', 'Thêm trường thứ 3', 'Mỗi trường một deadline và bộ giấy tờ khác nhau, tự ghi chép là sót', 'Pro'] },
        { id: 'nang-cap-deadline', cells: ['Free', 'Chọn xong trường, mở journey', 'Journey chỉ có 9 bước chung, không biết hạn nào của trường nào', 'Pro'] },
        { id: 'nang-cap-match', cells: ['Free', 'Mở học bổng thứ 4 trong tháng', 'Match % bị làm mờ', 'Pro, hoặc 5 coin cho 1 học bổng'] },
        { id: 'nang-cap-phu-huynh', cells: ['Free', 'Phụ huynh hỏi con đang làm tới đâu', 'Không có chỗ cho phụ huynh xem', 'Pro'] },
        { id: 'ban-bao-cao', cells: ['Free, Pro', 'Xem xong bản xem trước dự báo việc làm', 'Muốn biết khoản đầu tư có đáng không', '150 coin, hoặc package có sẵn báo cáo'] },
        { id: 'nang-cap-nuoc-2', cells: ['Pro', 'Muốn thêm nước thứ 2', 'Pro chỉ mở 1 nước', 'Package U3'] },
        { id: 'ban-ho-so', cells: ['Pro', 'Tới bước 4: Hồ sơ', 'Thấy khối lượng giấy tờ', 'Hẹn tư vấn package'] },
        { id: 'nang-cap-essay', cells: ['Pro', 'Viết xong essay và hồ sơ', 'Không biết đủ tốt chưa, không có ai duyệt', 'Package có mentor'] },
        { id: 'nang-cap-hoc-bong', cells: ['Pro', 'Match thấy học bổng phù hợp', 'Biết học bổng nhưng không biết apply', 'Package U18 trở lên'] },
        { id: 'ban-buoi-2', cells: ['Pro', 'Học xong buổi thứ 2 với Tutor', 'Đã quen trả bằng coin, coin kèm Pro sắp hết', 'Package, coin có sẵn rẻ hơn'] },
        { id: 'ban-phu-huynh', cells: ['Pro', 'Phụ huynh mở báo cáo tiến độ', 'Muốn con có người kèm', 'Package'] },
        { id: 'nang-cap-gap', cells: ['Pro', 'Còn 45 ngày tới deadline mà hồ sơ chưa xong', 'Sợ trễ, tự làm không kịp', 'Hẹn tư vấn package'] },
        { id: 'nang-cap-visa', cells: ['Pro', 'Nhận offer', 'Visa và nhà ở chỉ có checklist chung', 'Package có mentor hỗ trợ visa'] },
      ],
    },

    { id: 'goi-ai-tieu-de', sectionId: 'goi', kind: 'heading', text: 'Chi phí AI của Pro' },
    {
      id: 'goi-ai-chi-phi',
      sectionId: 'goi',
      kind: 'text',
      text: 'Journey Pro chạy bằng dữ liệu trường và luật, không gọi AI mỗi lần mở trang. Dữ liệu deadline, giấy tờ và điểm yêu cầu do mentor cập nhật mỗi mùa. AI chỉ chạy khi có thay đổi như thêm trường, đổi điểm, có kết quả, tối đa 10 lần mỗi tháng. Hỏi AI tự do và báo cáo AI dự báo trả bằng coin.',
    },

    { id: 'premium', sectionId: 'premium', kind: 'heading', text: '3. Package trọn gói' },
    {
      id: 'premium-nguyen-tac',
      sectionId: 'premium',
      kind: 'text',
      text: 'Giá, số quốc gia, số trường, lớp được học và hỗ trợ lấy theo brochure USAS Globally. Khác một chỗ: cột giờ học với mentor đổi thành coin để học sinh tự book lớp.',
    },
    {
      id: 'premium-cam-ket',
      sectionId: 'premium',
      kind: 'text',
      text: 'Cam kết dựa trên năng lực của học viên. U3, U9, U18, U27 học online 1:1. U30 học online hoặc offline 1:1.',
    },
    {
      id: 'premium-bang',
      sectionId: 'premium',
      kind: 'table',
      columns: ['Chương trình', 'Quốc gia', 'Số trường', 'Lớp trong gói, đổi thành coin', 'Hỗ trợ hoạt động khác', 'Chi phí'],
      rows: [
        {
          id: 'premium-u3',
          cells: [
            'U3 Online',
            '2 quốc gia: Bỉ, Hà Lan, Phần Lan, Đài Loan, Trung Quốc',
            '2',
            '12 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết), EU Advisors, IELTS / SAT Mock-test',
            'Không có',
            '52.690.000 VND',
          ],
        },
        {
          id: 'premium-u9',
          cells: [
            'U9 Express',
            '3 quốc gia: Bỉ, Hà Lan, Phần Lan, Hungary, Pháp, Đài Loan, Trung Quốc',
            '3',
            '21 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết), EU Advisors, Thesis, IELTS / SAT Mock-test',
            'Hỗ trợ 2 hoạt động ngoại khoá',
            '69.800.000 VND',
          ],
        },
        {
          id: 'premium-u18',
          cells: [
            'U18 Fundamental',
            '4 quốc gia: Bỉ, Hà Lan, Phần Lan, Hungary, Pháp, Đức, Ý, Đài Loan, Trung Quốc',
            '4',
            '33 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết + thực hành), EU Advisors, Thesis, IELTS / SAT Mock-test',
            'Hỗ trợ 2: hoạt động ngoại khoá và Apply 2 học bổng',
            '97.800.000 VND',
          ],
        },
        {
          id: 'premium-u27',
          cells: [
            'U27 Mastery',
            '5 quốc gia: Bỉ, Hà Lan, Phần Lan, Hungary, Pháp, Đức, Ý, Đài Loan, Trung Quốc hoặc Anh, Úc, Mỹ, Canada, Singapore',
            '10',
            '43 giờ đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết + thực hành), EU Advisors, Q&A 1:1 với Mentor, Financial Aid, Thesis, IELTS / SAT / GMAT Mock-test',
            'Hỗ trợ 3: hoạt động ngoại khoá, Apply 10 học bổng, Mentor Premium',
            '150.800.000 VND',
          ],
        },
        {
          id: 'premium-u30',
          cells: [
            'U30 Comprehensive',
            'Không giới hạn: Châu Âu, Châu Mỹ, Châu Á, Châu Úc',
            'Không giới hạn. Cam kết đầu trường TOP 100',
            'Không giới hạn giờ, đổi thành coin để học sinh tự đặt: Guidance, Documents (lý thuyết + thực hành), EU Advisors, Q&A 1:1 với EU Advisors, Financial Aid, Thesis, IELTS / SAT / GMAT / GRE / IMAC Mock-test',
            'Không giới hạn: hoạt động ngoại khoá, Apply học bổng, Financial Aid, Mentor Premium, và một bài nghiên cứu khoa học',
            '297.800.000 VND',
          ],
        },
      ],
    },
    {
      id: 'premium-gio-mentor',
      sectionId: 'premium',
      kind: 'text',
      text: 'Giờ học với mentor trên brochure không giữ thành buổi cố định. Phần đó đổi thành coin trong package để học sinh tự book lớp.',
    },
    {
      id: 'premium-mua',
      sectionId: 'premium',
      kind: 'text',
      text: 'Cách thu: mua package trọn gói.',
    },

    { id: 'coin', sectionId: 'coin', kind: 'heading', text: '4. Hệ thống coin' },
    {
      id: 'coin-dinh-nghia',
      sectionId: 'coin',
      kind: 'text',
      text: '1 coin = 1.000đ để học sinh và phụ huynh dễ quy đổi. Coin miễn phí phải có trần và hạn dùng. Nếu không dùng sẽ mất giá và không ai mua coin.',
    },
    {
      id: 'coin-nguon',
      sectionId: 'coin',
      kind: 'heading',
      text: 'Coin đến từ đâu',
    },
    {
      id: 'coin-nguon-bang',
      sectionId: 'coin',
      kind: 'table',
      columns: ['Nguồn', 'Số lượng', 'Hạn dùng'],
      rows: [
        { id: 'coin-mua-le', cells: ['Mua lẻ', '100 coin = 99k · 300 = 269k · 1.000 = 799k', '12 tháng'] },
        { id: 'coin-nhiem-vu', cells: ['Nhiệm vụ (Free)', 'Tối đa 50 coin / tháng', '60 ngày'] },
        { id: 'coin-pro', cells: ['Kèm theo Pro', '1.000 coin', 'Hết hạn cùng Pro'] },
        { id: 'coin-trong-goi', cells: ['Có sẵn trong package trọn gói', 'Đổi từ giờ học của gói: U3 12 giờ, U9 21 giờ, U18 33 giờ, U27 43 giờ, U30 không giới hạn', 'Hết hạn cùng gói'] },
        { id: 'coin-gioi-thieu', cells: ['Thưởng mời bạn', 'Khi người được mời mua gói đầu tiên', '60 ngày'] },
      ],
    },
    {
      id: 'coin-dung',
      sectionId: 'coin',
      kind: 'heading',
      text: 'Coin dùng vào đâu',
    },
    {
      id: 'coin-dung-bang',
      sectionId: 'coin',
      kind: 'table',
      columns: ['Dùng cho', 'Giá'],
      rows: [
        { id: 'coin-lop-60', cells: ['Buổi học Tutor 60 phút', '150 – 400 coin (Tutor tự đặt trong khung)'] },
        { id: 'coin-lop-90', cells: ['Buổi học 90 phút (essay, chọn trường)', '250 – 600 coin'] },
        { id: 'coin-combo', cells: ['Combo 4–6 buổi', 'Giảm 15% so với đặt lẻ'] },
        { id: 'coin-ngoai-khoa', cells: ['1 hoạt động ngoại khoá lẻ, vai tình nguyện viên', '700 coin'] },
        { id: 'coin-match', cells: ['Mở match % 1 học bổng (Free)', '5 coin'] },
        { id: 'coin-bao-cao', cells: ['Báo cáo AI dự báo việc làm (1 trường · 1 ngành)', '150 coin'] },
        { id: 'coin-so-sanh', cells: ['So sánh dự báo 3 trường', '350 coin'] },
        { id: 'coin-cap-nhat', cells: ['Cập nhật báo cáo khi hồ sơ thay đổi', '50 coin'] },
      ],
    },
    {
      id: 'coin-ai-mo-ta',
      sectionId: 'coin',
      kind: 'text',
      text: 'Tính năng thu coin là AI dự báo việc làm và định cư. AI đọc hồ sơ và mục tiêu của học sinh để dự đoán CV sau khi học xong, đối chiếu với JD thật đang tuyển, rồi trả về mức khớp với JD, khả năng có việc và điều kiện ở lại. Chi tiết giá và cách tính ở [[/ai-du-bao|trang AI dự báo]].',
    },
    {
      id: 'coin-ai-cho',
      sectionId: 'coin',
      kind: 'text',
      text: 'Đây là câu hỏi phụ huynh quan tâm nhất: học xong có việc không, có ở lại được không. Nên là chỗ thu coin tốt mà không tốn giờ mentor. Nằm ở bước 2 và 4 của journey, có thêm lối vào từ trang chủ và từ thẻ trường trong Theo dõi hồ sơ.',
    },
    {
      id: 'coin-ai-bang',
      sectionId: 'coin',
      kind: 'table',
      columns: ['Đầu vào', 'AI làm gì', 'Báo cáo trả về', 'Nguồn dữ liệu'],
      rows: [
        {
          id: 'coin-ai-noi-dung',
          cells: [
            'Hồ sơ của tôi ở bước 1: học lực, ngoại ngữ, hoạt động, kinh nghiệm. Trường và ngành target ở bước 2, chương trình học và môn tự chọn. Kế hoạch bù thiếu: thực tập, ngoại khoá, chứng chỉ dự kiến.',
            'Dự đoán CV lúc tốt nghiệp: bằng cấp, kỹ năng, thực tập, ngoại ngữ. Đối chiếu CV đó với JD đang tuyển ở nước target. Tính mức khớp với JD, khả năng có việc, và tra điều kiện ở lại theo luật visa sau tốt nghiệp.',
            'CV dự kiến, top 5 JD khớp nhất và lương khởi điểm. Mức khớp dạng “Khớp 7/10 yêu cầu của 34 JD đang tuyển”. Khả năng có việc dạng khoảng, ví dụ 60–75%, kèm độ tin cậy. Điều kiện ở lại dạng chữ, ví dụ “Đủ điều kiện ở lại 2 năm · Ngành thiếu người: Có”. Kỹ năng còn thiếu và gợi ý lớp Tutor, ngoại khoá để bù.',
            'JD từ các trang tuyển dụng lớn và công việc làm quốc gia, làm mới hằng tháng. Thống kê việc làm sau tốt nghiệp của trường và của nước. Luật visa sau tốt nghiệp lấy từ module quốc gia do mentor cập nhật mỗi mùa.',
          ],
        },
      ],
    },
    {
      id: 'coin-ai-gia-bang',
      sectionId: 'coin',
      kind: 'table',
      columns: ['Mức', 'Giá', 'Nhận được'],
      rows: [
        { id: 'coin-ai-gia', cells: ['Xem trước', 'Miễn phí', 'Mức Cao / TB / Thấp cho 1 trường · 1 ngành, không có chi tiết'] },
        { id: 'ai-gia-bao-cao', cells: ['Báo cáo', '150 coin', '1 trường · 1 ngành: CV dự kiến, top 5 JD, kỹ năng còn thiếu, khả năng có việc, điều kiện ở lại'] },
        { id: 'ai-gia-so-sanh', cells: ['So sánh', '350 coin', '3 trường đặt cạnh nhau, lúc học sinh đang phân vân'] },
        { id: 'ai-gia-goi', cells: ['Gói chọn trường', '600 coin', '5 báo cáo trong 1 quốc gia, rẻ hơn khoảng 20% so với mua lẻ'] },
        { id: 'ai-gia-cap-nhat', cells: ['Cập nhật', '50 coin', 'Chạy lại khi hồ sơ thay đổi. Miễn phí 1 lần trong 30 ngày đầu'] },
        { id: 'ai-gia-pro', cells: ['Pro', 'Trả bằng 1.000 coin kèm theo', 'Không tặng báo cáo, để coin của Pro có chỗ tiêu'] },
        { id: 'ai-gia-package', cells: ['Package', 'Có sẵn', '1 báo cáo mỗi quốc gia trong package, mentor đọc cùng học sinh'] },
      ],
    },
    {
      id: 'coin-luat-hien-thi',
      sectionId: 'coin',
      kind: 'text',
      text: 'Luật hiển thị bắt buộc: khả năng có việc luôn hiện dạng khoảng, ví dụ 60–75%, kèm độ tin cậy, nguồn dữ liệu và ngày cập nhật. Mức khớp hiện dạng “Khớp 7/10 yêu cầu”. Điều kiện ở lại hiện dạng chữ theo luật visa, không phải phần trăm. Ghi rõ đây là ước tính, không phải cam kết việc làm hay định cư. Sales không được dùng con số này để hứa với khách.',
    },
    {
      id: 'coin-het-han',
      sectionId: 'coin',
      kind: 'text',
      text: 'Coin nhiệm vụ của Free, tối đa 50 coin/tháng, hết hạn 60 ngày, nên học sinh phải mua coin. Đây là lần trả tiền đầu tiên tự nhiên. Cuối báo cáo luôn có 2 nút: đặt lớp Tutor để bù kỹ năng thiếu, và hẹn tư vấn 15 phút để mentor đọc báo cáo cùng.',
    },

    { id: 'vai-tro', sectionId: 'vai-tro', kind: 'heading', text: '5. Vai trò người dùng' },
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
          id: 'phu-huynh',
          title: 'Phụ huynh',
          badge: 'Mới, nên thêm',
          items: [
            'Người trả tiền cho Pro hoặc package. Học sinh mời qua link.',
            'Xem tiến độ journey của con, chỉ xem.',
            'Xem lịch học, báo cáo của mentor.',
            'Thanh toán gói, nạp coin.',
            'Không chỉnh hồ sơ.',
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
    {
      id: 'phu-huynh-ly-do',
      sectionId: 'vai-tro',
      kind: 'text',
      text: 'Vì sao thêm role Phụ huynh: Pro và package thường do phụ huynh trả. Cho phụ huynh xem tiến độ và báo cáo giúp chốt gói nhanh hơn và gia hạn dễ hơn. Phụ huynh chỉ được xem và thanh toán, không chỉnh hồ sơ của con.',
    },

    { id: 'journey', sectionId: 'journey', kind: 'heading', text: '6. Journey của học sinh' },
    {
      id: 'journey-nguyen-tac',
      sectionId: 'journey',
      kind: 'text',
      text: '3 chặng, 9 bước chính và 1 giai đoạn hội nhập, giống nhau cho mọi gói. Hồ sơ trước, mục tiêu sau: học sinh nhập điều kiện hiện tại rồi mới được gợi ý mục tiêu vừa sức.',
    },
    {
      id: 'journey-mo-buoc',
      sectionId: 'journey',
      kind: 'text',
      text: 'Lúc đầu học sinh chỉ thấy 6 bước nộp hồ sơ. Bước 7–9 tự mở khi nhận offer. Free được đi đủ các bước nhưng tự làm. Mỗi mục tiêu, tức mỗi quốc gia, là một journey riêng, có thanh tiến độ ở đầu màn hình.',
    },
    {
      id: 'journey-dung-chung',
      sectionId: 'journey',
      kind: 'text',
      text: 'Việc dùng chung như IELTS hay hộ chiếu chỉ làm một lần và hiện ở mọi journey. Chi tiết bước phụ và assignment nằm ở canvas Journey du học.',
    },
    {
      id: 'journey-bang',
      sectionId: 'journey',
      kind: 'table',
      columns: ['Bước', 'Tên', 'Học sinh làm gì', 'Khác nhau theo gói'],
      rows: [
        {
          id: 'journey-1',
          cells: ['1', 'Hồ sơ của tôi', 'Học lực, ngoại ngữ (hoặc chưa thi), ngân sách, ngành quan tâm, trong 5–10 phút', 'Premium: mentor đánh giá hồ sơ ban đầu'],
        },
        {
          id: 'journey-2',
          cells: ['2', 'Mục tiêu và trường', 'Gợi ý nước, ngành vừa sức theo hồ sơ. Đặt mục tiêu, chọn trường và học bổng', 'Free: 1 nước để xem. Pro: 1 nước, tối đa 8 trường, match % đầy đủ. Premium: mentor chốt'],
        },
        {
          id: 'journey-3',
          cells: ['3', 'Bù khoảng thiếu', 'Khoảng thiếu so với các trường đã chọn: điểm thi, hoạt động', 'Tutor: lập luyện thi. Premium: mentor lập kế hoạch bù'],
        },
        {
          id: 'journey-4',
          cells: ['4', 'Chuẩn bị hồ sơ', 'Giấy tờ, bài luận, thư giới thiệu, checklist từng trường', 'Pro: checklist riêng từng trường. Premium: mentor review. Tutor: lớp sửa essay'],
        },
        {
          id: 'journey-5',
          cells: ['5', 'Nộp hồ sơ', 'Xác nhận, đóng phí, nộp. Sau bước này nước đó bị khóa đổi', 'Premium: mentor kiểm tra lần cuối'],
        },
        {
          id: 'journey-6',
          cells: ['6', 'Kết quả', 'Theo dõi từng trường, offer, điều kiện, chọn trường. Pro kết thúc khi có kết quả', 'Premium: tư vấn chọn offer, luyện phỏng vấn'],
        },
        {
          id: 'journey-7',
          cells: ['7–9', 'Lên đường', 'Visa, nhà ở, vé máy bay, trước khi bay. Mở khi chấp nhận offer', 'Free, Pro: checklist chung. Premium: mentor kiểm tra hồ sơ visa. Tutor: lớp phỏng vấn visa'],
        },
        {
          id: 'journey-hoi-nhap',
          cells: ['Sau khi đến', 'Hội nhập', 'Tuần đầu, câu chuyện lên Feed, lời mời làm Tutor', 'U30: hỗ trợ theo hạng mục không giới hạn của package'],
        },
      ],
    },
    {
      id: 'journey-tu-van-15',
      sectionId: 'journey',
      kind: 'text',
      text: 'Buổi tư vấn 15 phút nằm ngoài journey. Không đặt làm bước 0 bắt buộc. Nút “Hẹn tư vấn 15 phút” luôn có sẵn và xuất hiện mạnh ở bước 2 và bước 4.',
    },
    {
      id: 'journey-ban-goi',
      sectionId: 'journey',
      kind: 'text',
      text: 'Với khách mới, đây là cuộc gọi bán gói do sales phụ trách. Sau khi mua package, buổi làm quen với mentor là task đầu tiên trong journey Premium.',
    },

    { id: 'tutor', sectionId: 'tutor', kind: 'heading', text: '7. Tutor' },
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

    { id: 'chi-so', sectionId: 'chi-so', kind: 'heading', text: '8. Chỉ số cần đo' },
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

    { id: 'rui-ro', sectionId: 'rui-ro', kind: 'heading', text: '9. Rủi ro cần chặn sớm' },
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
      text: 'Agency du học miễn phí: package phải bán điều agency không có, người đã từng học ở đó, lời khuyên độc lập. Phụ huynh thấy được tiến độ.',
    },
    {
      id: 'rui-ro-offline',
      sectionId: 'rui-ro',
      kind: 'text',
      text: 'Khách offline cũ: ảnh chụp bị cắt ở đây, phần còn lại của mục này chưa có trong plan.',
    },
  ] satisfies PlanBlock[],
}
