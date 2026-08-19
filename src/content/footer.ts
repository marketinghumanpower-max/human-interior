export const footerContent = {
  brand: {
    name: 'HUMAN INTERIOR',
    description:
      'Công ty TNHH Kiến Trúc & Nội Thất Human Interior - Chuyên thiết kế và thi công nội thất cao cấp.',
    socials: [
      { icon: 'facebook', href: 'https://facebook.com/humaninterior', label: 'Facebook' },
      { icon: 'instagram', href: 'https://instagram.com/humaninterior', label: 'Instagram' },
      { icon: 'youtube', href: 'https://youtube.com/@humaninterior', label: 'YouTube' },
    ],
  },

  quickLinks: {
    title: 'Liên kết nhanh',
    items: [
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Dự án', href: '/projects' },
      { label: 'Báo giá', href: '/bao-gia' },
      { label: 'Tin tức', href: '/news' },
      { label: 'Liên hệ', href: '/contact' },
    ],
  },

  services: {
    title: 'Báo Giá & Dịch Vụ',
    items: [
      { label: 'Báo giá thiết kế & thi công', href: '/bao-gia' },
      { label: 'Thi công nội thất trọn gói', href: '/thi-cong-noi-that' },
      { label: 'Tư vấn phong thủy', href: '/tu-van-phong-thuy' },
      { label: 'Bảo hành & bảo trì 5 năm', href: '/bao-hanh-bao-tri' },
    ],
  },

  contact: {
    title: 'Liên hệ',
    address: 'Số 17, đường DE1, Mỹ Phước 3, phường Thới Hòa, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.app.goo.gl/2dqRkDhWL6sESdPr8',
    phones: ['0329 688 826', '0329 134 939'],
    emails: ['baogia@humaninterior.vn', 'thanhnguyen@humaninterior.vn'],
    website: { label: 'humaninterior.vn', href: 'https://humaninterior.vn' },
  },

  bottom: {
    copyright: '© 2025 Human Interior. Tất cả quyền được bảo lưu.',
    legalLinks: [
      { label: 'Chính sách bảo mật', href: '/privacy' },
      { label: 'Điều khoản sử dụng', href: '/terms' },
    ],
  },
} as const
