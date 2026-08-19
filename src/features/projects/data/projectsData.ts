export interface FurnitureItem {
  id: string
  name: string
  category: 'sofa' | 'lighting' | 'table' | 'chair' | 'bed' | 'decor' | 'cabinet'
  categoryLabel: string
  price: string
  originalPrice?: string
  image: string
  material: string
  dimensions?: string
  hotspot: { x: number; y: number } // Percentage position x, y (0-100)
  inStock?: boolean
  description?: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  category: 'bietti' | 'vanphong' | 'cuahang' | 'canho' | 'nhahang' | 'khachsạn'
  categoryLabel: string
  location: string
  area: string
  year: string
  client?: string
  architect?: string
  style?: string
  estimatedPrice: string
  image: string
  gallery: string[]
  description: string
  highlights: string[]
  materials: string[]
  isFeatured?: boolean
  furnitureItems: FurnitureItem[]
}

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'Tất cả không gian' },
  { id: 'bietti', label: 'Biệt thự' },
  { id: 'canho', label: 'Căn hộ & Penthouse' },
  { id: 'vanphong', label: 'Văn phòng' },
  { id: 'cuahang', label: 'Showroom & Cửa hàng' },
  { id: 'nhahang', label: 'Nhà hàng & Omakase' },
  { id: 'khachsạn', label: 'Khách sạn Boutique' },
] as const

export const FURNITURE_CATEGORIES = [
  { id: 'all_furniture', label: 'Tất cả nội thất' },
  { id: 'sofa', label: 'Sofa & Ghế Lounge' },
  { id: 'table', label: 'Bàn Ăn & Bàn Trà' },
  { id: 'lighting', label: 'Đèn Trang Trí' },
  { id: 'bed', label: 'Giường & Phòng Ngủ' },
  { id: 'cabinet', label: 'Tủ Kệ & Vách Trang Trí' },
  { id: 'decor', label: 'Decor Cao Cấp' },
] as const

export const PROJECTS_DATA: Project[] = [
  {
    id: 'villa-thao-dien',
    title: 'Biệt thự Thảo Điền Sanctuary',
    subtitle: 'Nội thất biệt thự sang trọng mảng xanh hiện đại',
    category: 'bietti',
    categoryLabel: 'Biệt thự',
    location: 'Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
    area: '850 m²',
    year: '2024',
    client: 'Gia đình Gia Bách',
    architect: 'KTS. Nguyễn Thành & Đội ngũ Human Interior',
    style: 'Modern Minimalist Luxury',
    estimatedPrice: 'Từ 450.000.000 VNĐ / Không gian',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Dự án biệt thự Thảo Điền kết hợp lối kiến trúc tối giản hiện đại với không gian mở thông tầng hướng ra sân vườn xanh mát. Hệ thống vật liệu gỗ óc chó tự nhiên kết hợp đá Calacatta nhập khẩu Ý mang tới nét xa xỉ thượng thượng.',
    highlights: [
      'Thông tầng phòng khách cao 6.8m với giếng trời kính thông minh',
      'Phòng bếp đảo Marble Ý kết hợp thiết bị Miele cao cấp',
      'Hồ bơi tràn bờ nước mặn liền kề phòng sảnh tiếp khách'
    ],
    materials: ['Đá Cẩm thạch Calacatta', 'Gỗ Óc chó Bắc Mỹ nguyên khối', 'Hợp kim mạ đồng Champagne', 'Kính hộp Low-E chống UV'],
    isFeatured: true,
    furnitureItems: [
      {
        id: 'sofa-italia-curved',
        name: 'Sofa Cong Italia Poltrona Modern',
        category: 'sofa',
        categoryLabel: 'Sofa & Ghế Lounge',
        price: '68.000.000 VNĐ',
        originalPrice: '78.000.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
        material: 'Da bò nappa Ý nhập khẩu & Khung gỗ sồi nguyên khối',
        dimensions: '280cm x 110cm x 75cm',
        hotspot: { x: 38, y: 62 },
        inStock: true,
        description: 'Sofa uốn cong tinh tế mang đậm hơi thở kiến trúc đương đại Milan.'
      },
      {
        id: 'table-calacatta-marble',
        name: 'Bàn Trà Đá Cẩm Thạch Calacatta Gold',
        category: 'table',
        categoryLabel: 'Bàn Ăn & Bàn Trà',
        price: '32.500.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop',
        material: 'Mặt đá Calacatta tự nhiên Ý, Chân mạ PVD Titan Gold',
        dimensions: '120cm x 80cm x 42cm',
        hotspot: { x: 58, y: 72 },
        inStock: true,
        description: 'Mặt đá cẩm thạch trắng đường vân mây tự nhiên kết hợp chân kim loại mạ vàng sang trọng.'
      },
      {
        id: 'pendant-crystal-modern',
        name: 'Đèn Chùm Pha Lê Điêu Khắc Art Light',
        category: 'lighting',
        categoryLabel: 'Đèn Trang Trí',
        price: '42.000.000 VNĐ',
        originalPrice: '49.000.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
        material: 'Thủy tinh pha lê thủ công & Đồng thau chải xước',
        hotspot: { x: 48, y: 22 },
        inStock: true,
        description: 'Tác phẩm đèn chùm pha lê thả trần tạo điểm nhấn ánh sáng kiệt tác cho phòng khách.'
      }
    ]
  },
  {
    id: 'penthouse-landmark-81',
    title: 'Penthouse Landmark 81 Sky Palace',
    subtitle: 'Căn hộ Penthouse tầng cao tầm nhìn panorama toàn thành phố',
    category: 'canho',
    categoryLabel: 'Căn hộ',
    location: 'Landmark 81, Q. Bình Thạnh, TP. Hồ Chí Minh',
    area: '420 m²',
    year: '2024',
    client: 'Tập đoàn Tân Mỹ',
    architect: 'KTS. Lê Hoàng Phúc',
    style: 'Italian Contemporary Gold',
    estimatedPrice: 'Từ 380.000.000 VNĐ / Không gian',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Không gian sống xa hoa đỉnh cao trên không trung. Nội thất cá nhân hóa tinh xảo với tone màu trầm gold champagne, sofa bọc da bò Ý cao cấp Poltrona Frau cùng đèn chùm pha lê Baccarat.',
    highlights: [
      'View 360 độ ngắm toàn cảnh sông Sài Gòn và trung tâm thành phố',
      'Phòng thay đồ Walk-in Closet cao cấp tích hợp tủ kính chiếu sáng cảm ứng',
      'Hệ thống Smart Home điều khiển kịch bản ánh sáng và âm thanh toàn gia đình'
    ],
    materials: ['Da bò nappa Ý', 'Gỗ veneer Ebony Snakewood', 'Đá Onyx xuyên sáng', 'Kim loại mạ Titanium PVD'],
    isFeatured: true,
    furnitureItems: [
      {
        id: 'lounge-chair-velvet',
        name: 'Ghế Lounge Thư Giãn Armchair Imperial Gold',
        category: 'sofa',
        categoryLabel: 'Sofa & Ghế Lounge',
        price: '24.500.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
        material: 'Vải nhung Bỉ cao cấp & Chân kim loại mạ Champagne',
        hotspot: { x: 28, y: 68 },
        inStock: true,
        description: 'Ghế bành thư giãn tạo sự êm ái tuyệt đối cho gia chủ đọc sách thư giãn.'
      },
      {
        id: 'cabinet-onyx-illuminated',
        name: 'Tủ Rượu & Vách Trang Trí Đá Onyx Xuyên Sáng',
        category: 'cabinet',
        categoryLabel: 'Tủ Kệ & Vách Trang Trí',
        price: '115.000.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop',
        material: 'Đá Onyx xuyên sáng tự nhiên, Khung inox mạ PVD đen nhám',
        hotspot: { x: 75, y: 45 },
        inStock: true,
        description: 'Hệ tủ rượu âm tường cao kịch trần tích hợp hệ thống LED cảm biến chuyển động.'
      }
    ]
  },
  {
    id: 'showroom-flagship-d1',
    title: 'Human Luxury Showroom District 1',
    subtitle: 'Trải nghiệm không gian thương hiệu nội thất cao cấp',
    category: 'cuahang',
    categoryLabel: 'Showroom',
    location: 'Quận 1, TP. Hồ Chí Minh',
    area: '350 m²',
    year: '2023',
    client: 'Human Interior Retail',
    architect: 'KTS. Vũ Đức Anh',
    style: 'High-end Architectural Retail',
    estimatedPrice: 'Từ 290.000.000 VNĐ / Showroom',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Cửa hàng trưng bày flagship đẳng cấp 5 sao dành riêng cho trải nghiệm nội thất xa xỉ. Sử dụng ánh sáng nghệ thuật kết hợp sàn đá Terrazzo đúc nguyên khối.',
    highlights: [
      'Khu vực lounge VIP tư vấn với quầy bar mạ đồng',
      'Phòng mẫu phối cảnh 3D thực tế ảo VR dành cho khách hàng',
      'Trưng bày sản phẩm độc quyền nhập khẩu từ Milan, Ý'
    ],
    materials: ['Đá Terrazzo Ý', 'Kính xám khói Temper', 'Vữa mỹ thuật hiệu ứng bê tông lụa', 'Mạ đồng Brushed Brass'],
    isFeatured: false,
    furnitureItems: [
      {
        id: 'dining-table-monolith',
        name: 'Bàn Ăn 8 Ghế Monolith Marble & Walnut',
        category: 'table',
        categoryLabel: 'Bàn Ăn & Bàn Trà',
        price: '85.000.000 VNĐ',
        originalPrice: '95.000.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=600&auto=format&fit=crop',
        material: 'Mặt đá Nero Marquina đen Ý & Ghế bọc da sồi walnut',
        hotspot: { x: 50, y: 60 },
        inStock: true,
        description: 'Bộ bàn ăn nguyên khối thiết kế riêng cho các dinh thự xa hoa.'
      }
    ]
  },
  {
    id: 'villa-phu-my-hung',
    title: 'Biệt thự Indochine Phú Mỹ Hưng',
    subtitle: 'Nét đẹp Đông Dương kết hợp hiện đại sang trọng',
    category: 'bietti',
    categoryLabel: 'Biệt thự',
    location: 'Phú Mỹ Hưng, Q. 7, TP. Hồ Chí Minh',
    area: '680 m²',
    year: '2024',
    client: 'Gia đình Doanh nhân Trịnh Hữu',
    architect: 'KTS. Nguyễn Thành',
    style: 'Luxury Indochine Heritage',
    estimatedPrice: 'Từ 520.000.000 VNĐ / Không gian',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Bản hòa tấu tinh tế giữa nét hoài cổ Đông Dương và phong cách sống hiện đại. Sử dụng gỗ gõ đỏ chạm khắc kết hợp gạch bông thủ công hoa văn độc bản.',
    highlights: [
      'Hàng hành lang lá sách đón gió tự nhiên thoáng đãng',
      'Nội thất gỗ chạm trổ họa tiết hoa sen truyền thống',
      'Sân vườn hồ cá Koi phong thủy chuẩn sinh thái'
    ],
    materials: ['Gỗ Gõ Đỏ tự nhiên', 'Gạch bông mỹ thuật thủ công', 'Gốm sứ Bát Tràng tráng men', 'Đồng thau nguyên chất'],
    isFeatured: true,
    furnitureItems: [
      {
        id: 'armchair-indochine-rattan',
        name: 'Ghế Thư Giãn Mây Đan Thủ Công Indochine',
        category: 'sofa',
        categoryLabel: 'Sofa & Ghế Lounge',
        price: '18.500.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop',
        material: 'Mây tự nhiên chọn lọc & Gỗ Gõ Đỏ nguyên khối',
        hotspot: { x: 32, y: 65 },
        inStock: true,
        description: 'Ghế mây đan họa tiết mắt cáo truyền thống Đông Dương ấm cúng.'
      },
      {
        id: 'vase-ceramic-art',
        name: 'Bình Gốm Trang Trí Men Hỏa Biến',
        category: 'decor',
        categoryLabel: 'Decor Cao Cấp',
        price: '6.800.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop',
        material: 'Gốm thủ công tráng men cao cấp',
        hotspot: { x: 68, y: 55 },
        inStock: true,
        description: 'Vật phẩm trang trí phong thủy thủ công tinh tế.'
      }
    ]
  },
  {
    id: 'duplex-empire-city',
    title: 'Duplex Empire City Linden',
    subtitle: 'Căn hộ Duplex 2 tầng phong cách Dark Minimal Chic',
    category: 'canho',
    categoryLabel: 'Căn hộ',
    location: 'KĐT Thủ Thiêm, TP. Thủ Đức, TP. Hồ Chí Minh',
    area: '280 m²',
    year: '2024',
    client: 'Gia đình Anh Quốc Bảo',
    architect: 'KTS. Trần Hoàng Lâm',
    style: 'Dark Aesthetic Minimalist',
    estimatedPrice: 'Từ 320.000.000 VNĐ / Không gian',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Thiết kế Duplex 2 tầng ấn tượng với sắc tối quyền lực (Dark Aesthetic). Cầu thang xoắn ốc thép uốn lượn như tác phẩm điêu khắc nghệ thuật trung tâm.',
    highlights: [
      'Cầu thang xoắn ốc điêu khắc bằng thép nguyên khối mạ titan',
      'Mảng tường đá Nero Marquina vân sét ấn tượng',
      'Phòng nghe nhạc Hifi gia đình được xử lý âm học tiêu chuẩn studio'
    ],
    materials: ['Đá Nero Marquina đen Ý', 'Thép uốn PVD màu súng', 'Gỗ óc chó nhuộm sẫm', 'Kính phản quang xám'],
    isFeatured: false,
    furnitureItems: [
      {
        id: 'bed-king-walnut-luxury',
        name: 'Giường Ngủ Master King Size Gỗ Óc Chó',
        category: 'bed',
        categoryLabel: 'Giường & Phòng Ngủ',
        price: '54.000.000 VNĐ',
        originalPrice: '62.000.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop',
        material: 'Gỗ óc chó Bắc Mỹ & Đầu giường bọc da bò Ý',
        dimensions: '200cm x 220cm',
        hotspot: { x: 45, y: 58 },
        inStock: true,
        description: 'Giường ngủ master bề thế êm ái tiêu chuẩn khách sạn 5 sao.'
      }
    ]
  },
  {
    id: 'nhahang-omakase-signature',
    title: 'Nhà hàng Fine Dining Omakase',
    subtitle: 'Không gian ẩm thực Nhật Bản Zen Luxury đỉnh cao',
    category: 'nhahang',
    categoryLabel: 'Nhà hàng',
    location: 'Quận 3, TP. Hồ Chí Minh',
    area: '400 m²',
    year: '2023',
    client: 'Signature Restaurant Group',
    architect: 'KTS. Nguyễn Thành & Kenzo Sato',
    style: 'Japanese Wabi-Sabi Luxury',
    estimatedPrice: 'Từ 600.000.000 VNĐ / Không gian',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Nhà hàng Omakase chuẩn Michelin với triết lý thiết kế Wabi-Sabi tinh giản nhưng đầy tôn nghiêm. Sử dụng gỗ Tuyết Tùng Nhật Bản (Hinoki) ngát hương.',
    highlights: [
      'Quầy Sushi Bar dài 10m chế tác từ 1 tấm gỗ Hinoki nguyên khối',
      'Hệ tường giấy Washi thủ công dát lá vàng truyền thống',
      'Khu vườn Bonsai cổ thụ ngàn năm tuổi tạo điểm nhấn phong thủy'
    ],
    materials: ['Gỗ Hinoki nguyên khối Nhật Bản', 'Giấy Washi dệt tay', 'Đá núi lửa tự nhiên', 'Vữa trát đất sét nung'],
    isFeatured: true,
    furnitureItems: [
      {
        id: 'chair-zen-hinoki',
        name: 'Ghế Ăn Thuyền Zen Hinoki Dining Chair',
        category: 'chair',
        categoryLabel: 'Bàn Ăn & Bàn Trà',
        price: '12.800.000 VNĐ',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop',
        material: 'Gỗ Hinoki tự nhiên mốt nhẵn bóng & Đệm vải gai dệt',
        hotspot: { x: 42, y: 65 },
        inStock: true,
        description: 'Ghế ăn thiết kế Ergonomic chuẩn Nhật Bản tối giản thanh thoát.'
      }
    ]
  }
]
