import type { NewsArticle } from '../types'

export const newsArticlesData: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'xu-huong-thiet-ke-noi-that-biet-thu-2026',
    title: 'Xu Hướng Thiết Kế Nội Thất Biệt Thự Cao Cấp 2026: Đỉnh Cao Tối Giản & Độc Bản',
    subtitle: 'Khám phá sự kết hợp giữa nghệ thuật tối giản (Minimalism) và công nghệ mô phỏng 3D thời gian thực trong kiến trúc hiện đại.',
    excerpt: 'Năm 2026 đánh dấu sự lên ngôi của phong cách Quiet Luxury - sự sang trọng thầm lặng được tôn vinh qua vật liệu tự nhiên quý hiếm và đường nét kiến trúc tinh giản.',
    content: [
      'Trong bức tranh kiến trúc thượng lưu năm 2026, Quiet Luxury không còn là một xu hướng nhất thời mà đã trở thành triết lý sống đỉnh cao của giới tinh hoa. Những chi tiết phô trương nhường chỗ cho sự tinh tế kín đáo, nơi chất lượng vật liệu và cảm xúc không gian lên tiếng.',
      'Đội ngũ kiến trúc sư Human Interior tiên phong ứng dụng công nghệ render 3D thời gian thực kết hợp cùng thuật toán mô phỏng ánh sáng vật lý chuẩn xác. Nhờ đó, gia chủ có thể trải nghiệm toàn bộ biến đổi ánh sáng theo góc nhìn 360 độ ngay từ giai đoạn ý tưởng.',
      'Sự hòa quyện giữa đá cẩm thạch Calacatta Gold nguyên khối, gỗ óc chó Bắc Mỹ tự nhiên và kim loại mạ anodized mờ tạo nên nhịp điệu kiến trúc đầy cảm xúc. Từng đường nét được tính toán kỹ lưỡng nhằm mang đến khoảng thở nghệ thuật cho ngôi nhà.'
    ],
    category: 'Xu hướng thiết kế',
    publishedAt: '12 Tháng 8, 2026',
    readTime: '5 phút đọc',
    author: {
      name: 'KTS. Lê Hoàng Nam',
      role: 'Giám Đốc Sáng Tạo Human Interior',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
    },
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
    ],
    isFeatured: true
  },
  {
    id: 'news-2',
    slug: 'nghe-thuat-phoi-hop-anh-sang-tu-nhien-vat-lieu',
    title: 'Nghệ Thuật Phối Hợp Ánh Sáng Tự Nhiên & Gỗ Óc Chó Nhập Khẩu',
    subtitle: 'Bí quyết biến ánh sáng mặt trời thành chất liệu kiến trúc sống động trong không gian biệt thự.',
    excerpt: 'Ánh sáng và vật liệu là hai yếu tố song hành quyết định thần thái của ngôi nhà. Cùng Human Interior khám phá giải pháp đón sáng tự nhiên tối ưu.',
    content: [
      'Trong kiến trúc nội thất cao cấp, ánh sáng không chỉ đơn thuần để chiếu sáng mà là một thành tố kiến tạo không gian. Cách ánh sáng tương tác với bề mặt vân gỗ óc chó óng ả hay đá tự nhiên mờ mịn mang đến hiệu ứng thị giác kỳ diệu.',
      'Human Interior ứng dụng giải pháp kính cường lực Low-E tràn viền kết hợp lam chắn nắng điều hướng. Kỹ thuật này giúp tận dụng 90% ánh sáng tự nhiên ban ngày mà vẫn giữ cho nhiệt độ không gian luôn dịu mát.',
      'Sự chuyển vạt ánh sáng từ sáng sớm đến hoàng hôn trên các bề mặt vật liệu được thiết kế tỉ mỉ, giúp chủ nhân luôn cảm nhận được nhịp thở tự nhiên ngay bên trong ngôi nhà.'
    ],
    category: 'Vật liệu cao cấp',
    publishedAt: '08 Tháng 8, 2026',
    readTime: '4 phút đọc',
    author: {
      name: 'KTS. Trần Minh Khoa',
      role: 'Chuyên Gia Vật Liệu & Kiến Trúc',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
    },
    featuredImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
    isFeatured: false
  },
  {
    id: 'news-3',
    slug: 'human-interior-ban-giao-penthouse-landmark-81',
    title: 'Human Interior Bàn Giao Siêu Dự Án Penthouse Landmark 81',
    subtitle: 'Kiệt tác penthouse không gian mở quy mô 450m2 với toàn bộ thiết bị nội thất độc bản thửa riêng.',
    excerpt: 'Dự án siêu penthouse tại Landmark 81 vừa hoàn thiện sau 8 tháng thi công khắt khe, khẳng định năng lực chế tác đỉnh cao của Human Interior.',
    content: [
      'Vượt qua các tiêu chuẩn kiểm định nghiêm ngặt về kết cấu và âm học tại tòa nhà cao nhất Việt Nam, Human Interior chính thức hoàn thành và bàn giao căn Penthouse sang trọng rộng 450m2.',
      'Toàn bộ sản phẩm nội thất từ sofa bọc da bò Ý nguyên tấm, bàn ăn đá Quartzite tự nhiên đến hệ tủ bếp thông minh đều được thiết kế độc bản theo tỉ lệ nhân trắc học của gia chủ.',
      'Điểm nhấn của dự án là không gian phòng khách thông tầng panorama mở trọn tầm nhìn ra sông Sài Gòn, tích hợp hệ thống điều khiển thông minh Smart Home tiên tiến hàng đầu.'
    ],
    category: 'Dự án mới',
    publishedAt: '02 Tháng 8, 2026',
    readTime: '6 phút đọc',
    author: {
      name: 'Ban Biên Tập Human Interior',
      role: 'Tin Tức Dự Án',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
    },
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: 'news-4',
    slug: 'ung-dung-da-cam-thach-calacatta-phong-khach',
    title: 'Bí Quyết Lựa Chọn Đá Cẩm Thạch Calacatta Cho Không Gian Sáng Sang',
    subtitle: 'Hướng dẫn chọn đường vân đá tự nhiên tinh tế tôn lên nét quý phái của dinh thự.',
    excerpt: 'Đá Calacatta từ vùng Carrara nước Ý luôn là chất liệu xa xỉ được săn đón nhất trong các công trình kiến trúc thượng lưu.',
    content: [
      'Đá Calacatta nổi tiếng với nền trắng sứ tinh khôi điểm xuyết những đường vân xám vàng chảy mượt như bức tranh thủy mặc. Mỗi phiến đá là một tác phẩm độc nhất của tạo hóa.',
      'Human Interior tự hào sở hữu nguồn cung ứng đá Calacatta chọn lọc trực tiếp tại mỏ Ý. Đội ngũ thợ đá lành nghề thực hiện kỹ thuật Bookmatching (ghép vân đối xứng) với độ chính xác dưới 0.5mm.',
      'Vật liệu đá được xử lý bề mặt phủ bóng mờ chống thấm 5 lớp công nghệ Nano, đảm bảo độ bền đẹp vĩnh cửu theo thời gian.'
    ],
    category: 'Vật liệu cao cấp',
    publishedAt: '25 Tháng 7, 2026',
    readTime: '4 phút đọc',
    author: {
      name: 'KTS. Phạm Anh Tuấn',
      role: 'Trưởng Phòng Thi Công',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop'
    },
    featuredImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
    isFeatured: false
  },
  {
    id: 'news-5',
    slug: 'khong-gian-song-xanh-ben-vung-gia-chu-hien-dai',
    title: 'Không Gian Sống Xanh & Bền Vững: Xu Hướng Mới Cho Gia Chủ Hiện Đại',
    subtitle: 'Tích hợp cây xanh indoor, vật liệu tái tạo và tiết kiệm năng lượng vào biệt thự sinh thái.',
    excerpt: 'Kiến trúc xanh không chỉ bảo vệ sức khỏe gia đình mà còn mang tới sự thư thái, chữa lành tâm hồn giữa nhịp sống đô thị nhộn nhịp.',
    content: [
      'Tích hợp yếu tố thiên nhiên Biophilic vào không gian nội thất đang trở thành ưu tiên hàng đầu của nhiều gia chủ tinh hoa. Cây xanh không còn là chi tiết trang trí phụ mà đóng vai trò máy lọc không khí tự nhiên.',
      'Human Interior nghiên cứu thiết kế giếng trời kết hợp tiểu cảnh hồ nước thông tầng, giúp lưu thông luồng khí tươi liên tục 24/7.',
      'Các vật liệu sơn sinh học không chứa VOC, gỗ chứng nhận FSC và giải pháp năng lượng mặt trời thông minh được ưu tiên ứng dụng triệt để.'
    ],
    category: 'Phong cách sống',
    publishedAt: '18 Tháng 7, 2026',
    readTime: '5 phút đọc',
    author: {
      name: 'KTS. Nguyễn Thảo My',
      role: 'Chuyên Gia Phong Cách Sống',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'
    },
    featuredImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop',
    isFeatured: false
  },
  {
    id: 'news-6',
    slug: 'giao-thoa-kien-truc-dong-duong-hien-dai-thao-dien',
    title: 'Giao Thoa Kiến Trúc Indochine & Modernism Trong Biệt Thự Thảo Điền',
    subtitle: 'Nét hoài niệm Indochine kết hợp hoàn hảo cùng tiện nghi nội thất hiện đại sang trọng.',
    excerpt: 'Khám phá sự sáng tạo không giới hạn khi đưa hoa văn gạch bông, mây tre đan cao cấp vào tổng thể kiến trúc 3D đương đại.',
    content: [
      'Dự án biệt thự Thảo Điền là bài toán thú vị khi gia chủ muốn kết nối ký ức hoài cổ Đông Dương với phong cách sống hiện đại thanh lịch.',
      'Human Interior giải quyết hài hòa bằng cách tối giản các chi tiết hoa văn rườm rà, giữ lại tinh thần thoáng đãng của mái vòm Indochine kết hợp cùng nội thất cao cấp Châu Âu.',
      'Kết quả là một không gian vừa mang hồn cốt di sản Á Đông, vừa đáp ứng trọn vẹn tiện ích 5 sao cho sinh hoạt gia đình.'
    ],
    category: 'Xu hướng thiết kế',
    publishedAt: '10 Tháng 7, 2026',
    readTime: '5 phút đọc',
    author: {
      name: 'KTS. Lê Hoàng Nam',
      role: 'Giám Đốc Sáng Tạo Human Interior',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
    },
    featuredImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1600&auto=format&fit=crop',
    isFeatured: false
  }
]
