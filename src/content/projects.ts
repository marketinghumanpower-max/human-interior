export const projectsContent = {
  hero: {
    badge: 'HUMAN INTERIOR PORTFOLIO',
    title: {
      normal: 'Dự Án',
      highlight: 'Của Chúng Tôi',
    },
    description:
      'Khám phá danh mục các dự án thiết kế & thi công nội thất cao cấp đã hoàn thành bởi Human Interior',
    controls: {
      pauseRotate: '⏸ Tạm dừng 3D',
      startRotate: '▶️ Xoay 3D',
      solidModel: '🔷 Mẫu khối',
      wireframe: '📐 Khung dây',
    },
  },

  filterBar: {
    modes: {
      projects: 'Không Gian / Dự Án Nội Thất',
      furniture: 'Sản Phẩm Nội Thất Bán Chạy',
    },
    sortLabel: 'Sắp xếp:',
    sortOptions: [
      { value: 'featured', label: 'Nổi bật nhất' },
      { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
      { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
      { value: 'newest', label: 'Mới nhất' },
    ],
    searchPlaceholders: {
      projects: 'Tìm kiếm theo tên dự án, phong cách, vị trí...',
      furniture: 'Tìm kiếm sản phẩm sofa, bàn ăn, đèn chùm, gỗ...',
    },
    resultCounts: {
      projects: 'không gian dự án',
      furniture: 'sản phẩm nội thất',
    },
    displayPrefix: 'Hiển thị',
    emptyProjects: {
      title: 'Không tìm thấy dự án',
      description:
        'Không tìm thấy kết quả phù hợp với bộ lọc hoặc từ khóa tìm kiếm của bạn.',
    },
    emptyFurniture: {
      title: 'Không tìm thấy sản phẩm',
      description:
        'Không tìm thấy sản phẩm nội thất phù hợp với từ khóa của bạn.',
    },
  },

  card: {
    featuredBadge: 'NỔI BẬT',
    furnitureBadgeSuffix: 'Sản phẩm',
    dealTag: 'Ưu Đãi',
    hotspotHint: 'Xem thông số & báo giá',
    quoteAction: 'Báo Giá Nội Thất',
    quickQuote: 'Báo giá ngay',
    spaceLabelPrefix: '📍 Không gian:',
  },

  modal: {
    shopLookEyebrow: 'SHOP THE LOOK',
    shopLookTitle: 'Sản Phẩm Nội Thất Trong Không Gian Này',
    availableProductsSuffix: 'Sản phẩm có sẵn',
    location: 'Vị trí',
    area: 'Diện tích',
    style: 'Phong cách',
    architect: 'Kiến trúc sư',
    conceptTitle: 'Ý tưởng & Câu chuyện thiết kế',
    highlightsTitle: 'Điểm nhấn kiến trúc nổi bật',
    materialsTitle: 'Vật liệu cao cấp sử dụng',
    ctaQuestion:
      'Bạn muốn thiết kế hoặc đặt mua trọn gói không gian như dự án này?',
    ctaButton: 'NHẬN BÁO GIÁ THIẾT KẾ & THI CÔNG',
  },

  ctaBanner: {
    eyebrow: 'SHOWROOM & BÁN NỘI THẤT CAO CẤP',
    title: {
      normal: 'Sẵn Sàng Đặt Mua & Thiết Kế',
      highlight: 'Nội Thất Mơ Ước',
    },
    description:
      'Tất cả các sản phẩm nội thất đều có sẵn hoặc nhận sản xuất tùy biến theo kích thước & chất liệu yêu cầu.',
    action: 'NHẬN BÁO GIÁ TRỌN GÓI',
  },
} as const
