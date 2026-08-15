export const contactContent = {
  hero: {
    badge: 'HUMAN INTERIOR CONTACT',
    title: {
      normal: 'Liên Hệ',
      highlight: 'Với Chúng Tôi',
    },
    subtitle: 'Hãy cùng tạo nên không gian mơ ước của bạn',
  },

  cards: {
    address: {
      title: 'Địa chỉ',
      text: 'Số 17, đường DE1, Mỹ Phước 3, phường Thới Hòa, TP. Hồ Chí Minh',
      action: 'Xem chỉ đường',
      mapUrl: 'https://maps.app.goo.gl/2dqRkDhWL6sESdPr8',
    },
    phone: {
      title: 'Điện thoại',
      numbers: ['0329 688 826', '0329 134 939'],
      action: 'Gọi trực tiếp',
    },
    email: {
      title: 'Email',
      emails: ['baogia@humaninterior.vn', 'thanhnguyen@humaninterior.vn'],
      action: 'Gửi thư báo giá',
    },
    workingHours: {
      title: 'Giờ làm việc',
      hours: ['Thứ 2 - Thứ 6: 08:00 - 17:00', 'Thứ 7: 08:00 - 12:00'],
      status: 'Đang Mở Cửa',
    },
  },

  form: {
    eyebrow: 'TƯ VẤN THIẾT KẾ',
    title: {
      normal: 'Gửi Tin Nhắn',
      highlight: 'Cho Chúng Tôi',
    },
    description:
      'Điền thông tin vào biểu mẫu dưới đây, kiến trúc sư của chúng tôi sẽ liên hệ lại với bạn trong vòng 24h.',
    successTitle: 'Gửi yêu cầu thành công!',
    successMessage:
      'Cảm ơn bạn đã liên hệ. Đội ngũ Human Interior sẽ phản hồi tới bạn trong thời gian sớm nhất.',
    labels: {
      name: 'Họ và tên',
      phone: 'Số điện thoại',
      email: 'Địa chỉ email',
      service: 'Dịch vụ quan tâm',
      message: 'Tin nhắn / Chi tiết dự án',
    },
    placeholders: {
      name: 'Nhập họ và tên của bạn',
      phone: 'Nhập số điện thoại của bạn',
      email: 'Nhập địa chỉ email của bạn',
      service: 'Chọn dịch vụ',
      message:
        'Hãy chia sẻ về dự án của bạn (diện tích, phong cách yêu thích, tiến độ mong muốn)...',
    },
    serviceOptions: [
      { value: 'interior-design', label: 'Thiết kế nội thất' },
      { value: 'construction', label: 'Thi công nội thất trọn gói' },
      { value: 'consultation', label: 'Tư vấn kiến trúc & Phong thủy' },
      { value: 'other', label: 'Khác' },
    ],
    submitButton: 'Gửi tin nhắn ngay',
    submittingButton: 'Đang xử lý...',
  },

  mapSection: {
    eyebrow: 'VỊ TRÍ VĂN PHÒNG',
    title: {
      normal: 'Ghé Thăm',
      highlight: 'Human Interior',
    },
    description:
      'Chúng tôi luôn đón chào quý khách tới tham quan showroom và trao đổi trực tiếp cùng đội ngũ kiến trúc sư hàng đầu.',
    companyName: 'Công Ty TNHH Kiến Trúc & Nội Thất Human Interior',
    openMapAction: 'Mở Google Maps',
  },

  ctaSection: {
    title: {
      normal: 'Sẵn Sàng Bắt Đầu',
      highlight: 'Dự Án Của Bạn?',
    },
    description:
      'Liên hệ với chúng tôi ngay hôm nay để được tư vấn trực tiếp và nhận báo giá ưu đãi miễn phí từ các chuyên gia thiết kế hàng đầu.',
    actions: {
      call: 'Gọi ngay: 0329 688 826',
      email: 'Gửi email tư vấn',
    },
  },
} as const
