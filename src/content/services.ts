export const servicesContent = {
  process: {
    eyebrow: 'QUY TRÌNH LÀM VIỆC',
    title: 'Quy trình làm việc',
    steps: [
      {
        number: '1',
        title: 'Tư vấn & Khảo sát',
        description:
          'Gặp gỡ trao đổi ý tưởng, khảo sát thực tế không gian và tìm hiểu nhu cầu',
      },
      {
        number: '2',
        title: 'Thiết kế ý tưởng',
        description:
          'Phát thảo concept, lên layout tổng thể và bản vẽ 2D chi tiết.',
      },
      {
        number: '3',
        title: 'Thiết kế 3D',
        description:
          'Tạo mô hình 3D chân thực và render hình ảnh chất lượng cao.',
      },
      {
        number: '4',
        title: 'Báo giá & Hợp đồng',
        description:
          'Lập báo giá chi tiết và thỏa thuận hợp đồng thực hiện.',
      },
      {
        number: '5',
        title: 'Thi công',
        description:
          'Triển khai thi công với đội ngũ thợ có kinh nghiệm.',
      },
      {
        number: '6',
        title: 'Bàn giao',
        description:
          'Hoàn thiện, vệ sinh và bàn giao công trình với bảo hành.',
      },
    ],
  },

  servicesList: {
    eyebrow: 'DỊCH VỤ CHUYÊN NGHIỆP',
    title: {
      normal: 'Giải Pháp Kiến Trúc',
      highlight: 'Toàn Diện',
    },
    description:
      'Tối ưu từng giai đoạn thiết kế, thi công và giám sát tiêu chuẩn 3D chuẩn xác',
    items: [
      {
        code: '01 / PRICING',
        title: 'Báo giá thi công trọn gói',
        description:
          'Bảng giá dự toán chi tiết, minh bạch vật liệu An Cường và miễn phí 100% bản vẽ 3D.',
        action: 'Xem Chi Tiết',
        imageAlt: 'Báo giá thi công',
      },
      {
        code: '02 / CONSTRUCTION',
        title: 'Thi công hoàn thiện',
        description:
          'Thi công trọn gói đồng bộ khớp 100% với bản vẽ 3D, cam kết tiến độ và chế độ bảo hành dài hạn.',
        action: 'Xem Chi Tiết',
        imageAlt: 'Thi công hoàn thiện',
      },
      {
        code: '03 / ARCHITECTURE',
        title: 'Tư vấn kiến trúc',
        description:
          'Tư vấn giải pháp mặt bằng, phong thủy và định hướng chiếu sáng tự nhiên cá nhân hóa cho từng gia chủ.',
        action: 'Xem Chi Tiết',
        imageAlt: 'Tư vấn kiến trúc',
      },
    ],
  },
} as const
