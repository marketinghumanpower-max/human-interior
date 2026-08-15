export interface NewsArticle {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content: string[]
  category: 'Xu hướng thiết kế' | 'Dự án mới' | 'Vật liệu cao cấp' | 'Phong cách sống'
  publishedAt: string
  readTime: string
  author: {
    name: string
    role: string
    avatar: string
  }
  featuredImage: string
  gallery?: string[]
  isFeatured?: boolean
}
