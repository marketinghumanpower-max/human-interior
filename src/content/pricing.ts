export const pricingContent = {
  hero: {
    eyebrow: 'BẢNG GIÁ NIÊM YẾT 2026',
    title: 'Báo Giá Thiết Kế & Thi Công Nội Thất 2026',
    subtitle: 'Dự toán minh bạch · Miễn phí 100% bản vẽ 3D khi thi công',
    description:
      'Bảng giá niêm yết dành cho căn hộ chung cư, nhà phố và biệt thự. Mức giá chuẩn xưởng sản xuất giúp quý khách hàng ước tính dự toán ban đầu trước khi Human Interior khảo sát thực tế và lập báo giá chi tiết.',
    zaloLink: 'https://zalo.me/0329688826',
    hotline: '0329 688 826',
    stats: [
      { number: '0 VNĐ', label: 'Chi phí thiết kế (khi thi công)' },
      { number: '20-30%', label: 'Tiết kiệm chi phí nhờ xưởng riêng' },
      { number: '5 NĂM', label: 'Bảo hành sản phẩm & Bảo trì trọn đời' },
      { number: '10 NÀY', label: 'Hoàn thiện hồ sơ thiết kế 3D' },
    ],
  },

  designPricing: {
    eyebrow: '1. BẢNG GIÁ THIẾT KẾ NỘI THẤT',
    title: 'Miễn Phí 100% Chi Phí Thiết Kế 3D',
    subtitle: 'Khi ký hợp đồng thi công nội thất trọn gói tại Human Interior',
    packages: [
      {
        id: 'apartment',
        name: 'Căn Hộ Chung Cư',
        price: '150.000đ - 180.000đ',
        unit: 'm²',
        promo: 'Miễn phí 100% khi thi công',
        features: [
          'Khảo sát hiện trạng & tư vấn phong cách',
          'Bản vẽ 2D bố trí mặt bằng công năng',
          'Phối cảnh 3D không gian phòng khách, bếp',
          'Phối cảnh 3D toàn bộ các phòng ngủ',
          'Hồ sơ bản vẽ kỹ thuật sản xuất nội thất',
        ],
      },
      {
        id: 'townhouse',
        name: 'Nhà Phố / Liền Kề',
        price: '180.000đ - 220.000đ',
        unit: 'm²',
        promo: 'Miễn phí 100% khi thi công',
        features: [
          'Khảo sát kết cấu & tối ưu giếng trời',
          'Bản vẽ layout 2D các tầng & lô gia',
          'Phối cảnh 3D sắc nét từng góc cạnh',
          'Hồ sơ kỹ thuật gỗ & chi tiết lắp đặt',
          'Hồ sơ bản vẽ điện nước MEP chuẩn xác',
        ],
      },
      {
        id: 'villa',
        name: 'Biệt Thự / Villa Luxury',
        price: '220.000đ - 280.000đ',
        unit: 'm²',
        promo: 'Miễn phí 100% khi thi công',
        features: [
          'Concept thiết kế độc bản cá nhân hóa',
          'Phối cảnh 3D kiến trúc & nội thất sang trọng',
          'Bản vẽ kỹ thuật chế tác gỗ cao cấp',
          'Tư vấn vật liệu & phụ kiện dát vàng/PVD',
          'Giám sát tác giả xuyên suốt quá trình thi công',
        ],
      },
    ],
  },

  constructionPricing: {
    eyebrow: '2. BẢNG GIÁ THI CÔNG TRỌN GÓI',
    title: 'Bảng Giá Thi Công Nội Thất Theo Căn Hộ & Quy Mô',
    subtitle: 'Vật liệu gỗ công nghiệp MDF An Cường chống ẩm niêm yết',
    packages: [
      {
        id: '1pn',
        title: 'Căn Hộ 1 Phòng Ngủ',
        area: '45m² - 55m²',
        estimatedPrice: '70.000.000 - 110.000.000 VNĐ',
        material: 'MDF An Cường Melamine cao cấp',
        items: [
          'Tủ bếp trên + dưới kịch trần (3.5m - 4m md)',
          'Bộ bàn ăn 4 ghế đệm da hiện đại',
          'Sofa văng nỉ/da + Bàn trà kính + Vách tivi',
          'Giường ngủ 1m6 x 2m bọc nỉ đầu giường',
          'Tủ quần áo cánh mở kịch trần (2m x 2.6m)',
        ],
      },
      {
        id: '2pn',
        title: 'Căn Hộ 2 Phòng Ngủ',
        area: '60m² - 75m²',
        estimatedPrice: '120.000.000 - 165.000.000 VNĐ',
        material: 'MDF An Cường Melamine / Laminate',
        items: [
          'Tủ bếp chữ L kịch trần (4.5m - 5.5m md)',
          'Bộ bàn ăn 6 ghế sang trọng',
          'Sofa góc L / Sofa văng lớn + Bàn trà',
          'Phòng ngủ Master: Giường 1m8, tủ áo 2.4m, bàn trang điểm',
          'Phòng ngủ nhỏ: Giường 1m6, tủ áo 1.8m, bàn học/làm việc',
        ],
      },
      {
        id: '3pn',
        title: 'Căn Hộ 3 Phòng Ngủ',
        area: '85m² - 110m²',
        estimatedPrice: '170.000.000 - 240.000.000 VNĐ',
        material: 'MDF An Cường chống ẩm Melamine / Acrylic',
        items: [
          'Tủ bếp chữ L/U + Đảo bếp sang trọng',
          'Hệ tủ giày kịch trần sảnh vào + Tủ trang trí',
          'Sofa da cao cấp + Vách ốp đá / nẹp PVD tivi',
          '3 Phòng ngủ trọn gói (Giường, tủ áo, bàn học, táp)',
          'Tủ lavabo chống nước 3 phòng vệ sinh',
        ],
      },
      {
        id: 'townhouse',
        title: 'Nhà Phố 1 Trệt 2 Lầu',
        area: '180m² - 220m²',
        estimatedPrice: '250.000.000 - 380.000.000 VNĐ',
        material: 'MDF An Cường + Khung gỗ tự nhiên',
        items: [
          'Tầng trệt: Phòng khách lớn, Bếp ăn & Tủ rượu',
          'Tầng 1: Master Suite trọn gói (Giường, tủ áo, bàn phấn)',
          'Tầng 2: 2 Phòng ngủ con + Phòng làm việc',
          'Sân thượng: Tủ thờ trang trọng + Lô gia giặt phơi',
        ],
      },
      {
        id: 'villa',
        title: 'Biệt Thự / Villa Luxury',
        area: '250m² - 400m²+',
        estimatedPrice: '420.000.000 - 750.000.000+ VNĐ',
        material: 'Gỗ Óc Chó / Gõ Đỏ / Acrylic bóng gương',
        items: [
          'Nội thất thông tầng phòng khách sang trọng',
          'Hệ phòng thay đồ Walk-in Closet cao cấp',
          'Tủ bếp hiện đại tích hợp thiết bị Hafele / Bosch',
          'Hoàn thiện thủ công tỉ mỉ từng chi tiết nẹp mạ PVD',
        ],
      },
    ],
  },

  unitPrices: {
    eyebrow: 'BẢNG ĐƠN GIÁ HẠNG MỤC THAM KHẢO',
    title: 'Đơn Giá Sản Xuất Tại Xưởng (Tính Theo m² / md)',
    items: [
      { name: 'Tủ bếp trên (MDF An Cường chống ẩm Melamine)', unit: 'mét dài', price: '2.400.000 - 3.200.000 VNĐ' },
      { name: 'Tủ bếp dưới (MDF An Cường chống ẩm Melamine)', unit: 'mét dài', price: '2.800.000 - 3.800.000 VNĐ' },
      { name: 'Cánh tủ bếp phủ Acrylic bóng gương An Cường', unit: 'm²', price: '1.200.000 - 1.800.000 VNĐ' },
      { name: 'Tủ quần áo kịch trần (MDF An Cường Melamine)', unit: 'm²', price: '2.400.000 - 3.200.000 VNĐ' },
      { name: 'Tủ quần áo cánh kính khung nhôm mạ PVD', unit: 'm²', price: '3.800.000 - 5.500.000 VNĐ' },
      { name: 'Giường ngủ hộp có ngăn kéo (1m8 x 2m)', unit: 'bộ', price: '7.500.000 - 12.500.000 VNĐ' },
      { name: 'Vách ốp trang trí tivi (MDF vân gỗ / nẹp đồng)', unit: 'm²', price: '1.200.000 - 2.400.000 VNĐ' },
      { name: 'Bàn ăn 6 ghế gỗ tự nhiên bọc da', unit: 'bộ', price: '9.500.000 - 18.000.000 VNĐ' },
    ],
  },

  advantages: {
    eyebrow: 'LỢI THẾ VƯỢT TRỘI',
    title: 'Tại Sao Báo Giá Tại Human Interior Luôn Tối Ưu Nhất?',
    items: [
      {
        title: 'Xưởng Sản Xuất Trực Tiếp 1.000m²',
        description:
          'Human Interior chủ động sản xuất trực tiếp không qua trung gian, giúp gia chủ tiết kiệm từ 20% - 30% chi phí so với thị trường.',
      },
      {
        title: 'Miễn Phí 100% Thiết Kế 3D',
        description:
          'Toàn bộ chi phí bản vẽ thiết kế 3D được hoàn lại 100% khi khách hàng tiến hành ký hợp đồng thi công trọn gói.',
      },
      {
        title: 'Công Nghệ Dán Cạnh Keo PUR',
        description:
          'Ứng dụng keo PUR chịu nhiệt và kháng nước tuyệt đối, liên kết nẹp chắc chắn, hạn chế tối đa tình trạng bong tróc viền gỗ.',
      },
      {
        title: 'Phụ Kiện ACOCO / Hafele Inox 304',
        description:
          'Bản lề giảm chấn inox 304 dày 2mm, ray trượt âm đáy không gỉ chịu tải lực lớn, vận hành êm ái suốt hàng chục năm.',
      },
    ],
  },

  commitments: {
    eyebrow: 'TIẾN ĐỘ & BẢO HÀNH',
    title: 'Cam Kết Tiến Độ & Chính Sách Hậu Mãi',
    items: [
      {
        title: 'Thiết kế 3D trong 10 ngày',
        desc: 'Tính từ khi tiếp nhận thông tin và thống nhất định hướng phong cách với gia chủ.',
      },
      {
        title: 'Thi công hoàn thiện trong 30 ngày',
        desc: 'Tính sau khi chốt bản vẽ kỹ thuật & duyệt bảng mẫu vật liệu thực tế.',
      },
      {
        title: 'Bảo hành lên đến 5 năm',
        desc: 'Áp dụng cho toàn bộ kết cấu gỗ, bề mặt hoàn thiện và phụ kiện kim khí.',
      },
      {
        title: 'Bảo trì trọn đời 24/7',
        desc: 'Human Interior đồng hành hỗ trợ bảo trì, xử lý kỹ thuật tận nơi khi có yêu cầu.',
      },
    ],
  },

  faqs: {
    eyebrow: 'CÂU HỎI THƯỜNG GẶP',
    title: 'Giải Đáp Thắc Mắc Về Báo Giá',
    items: [
      {
        question: 'Bảng giá trên có phải là chi phí cuối cùng không?',
        answer:
          'Chưa. Đây là mức giá niêm yết giúp gia chủ ước tính dự toán ban đầu. Human Interior sẽ gửi bản báo giá chính thức sau khi khảo sát hiện trạng thực tế, chốt kích thước 3D và vật liệu lựa chọn.',
      },
      {
        question: 'Human Interior có nhận thi công trọn gói chìa khóa trao tay không?',
        answer:
          'Có. Chúng tôi đồng hành xuyên suốt từ khảo sát, lên bản vẽ 2D/3D, gia công xưởng, thi công thô, lắp đặt hoàn thiện đến vệ sinh công nghiệp trước khi bàn giao.',
      },
      {
        question: 'Báo giá có bị phát sinh chi phí ngoài hợp đồng không?',
        answer:
          'Chúng tôi cam kết KHÔNG phát sinh bất kỳ khoản phí nào so với hợp đồng đã ký. Nếu gia chủ muốn thay đổi quy cách hoặc bổ sung hạng mục mới, hai bên sẽ xác nhận bằng phụ lục hợp đồng rõ ràng.',
      },
      {
        question: 'Khách hàng có được duyệt mẫu vật liệu thực tế trước khi thi công không?',
        answer:
          'Hoàn toàn có. Khách hàng được trực tiếp xem mẫu tem An Cường, catalogue màu sắc và duyệt chất liệu gỗ tại xưởng sản xuất của Human Interior trước khi tiến hành cắt gỗ.',
      },
    ],
  },

  form: {
    eyebrow: 'NHẬN BÁO GIÁ',
    title: 'Đăng Ký Nhận Dự Toán Chi Tiết Theo Công Trình',
    description:
      'Cung cấp loại công trình, diện tích và mức đầu tư dự kiến. Kiến trúc sư Human Interior sẽ tư vấn và gửi bảng dự toán phù hợp nhất.',
    submitText: 'NHẬN BÁO GIÁ NGAY',
    successMessage:
      'Cảm ơn quý khách! Human Interior đã nhận thông tin và sẽ gửi bảng dự toán chi tiết qua Zalo / SĐT trong vòng 15 phút.',
  },
} as const
