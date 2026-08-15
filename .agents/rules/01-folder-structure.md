# 01 — Folder Structure Convention

## Cấu trúc thư mục `src/`

```
src/
├── api/                  # Axios instance & API modules dùng chung
│   └── axiosClient.ts    # Axios instance duy nhất (singleton)
│
├── assets/               # Static assets (ảnh, font, icon, svg)
│
├── components/           # Shared/Primitive UI components
│   ├── ui/               # shadcn/ui components (KHÔNG tự sửa source)
│   └── LanguageSwitcher.tsx  # Shared component dùng nhiều nơi
│
├── features/             # Feature-based modules (xem 06-feature-module.md)
│   └── <feature-name>/
│       ├── components/   # UI components riêng của feature
│       ├── hooks/        # TanStack Query hooks (useXxxQuery, useXxxMutation)
│       └── api/          # API functions riêng của feature (optional)
│
├── hooks/                # Shared custom hooks (không thuộc feature nào)
│   └── useDebounce.ts
│
├── i18n/                 # i18next config và locale files
│   ├── config.ts
│   └── locales/
│       ├── vi.json
│       └── en.json
│
├── layouts/              # Page layout components (wrap Outlet)
│   └── MainLayout.tsx
│
├── router/               # React Router — định nghĩa routes
│   └── routes.tsx
│
├── stores/               # Zustand client-state stores (global UI state)
│   ├── authStore.ts
│   └── uiStore.ts
│
├── types/                # Shared TypeScript types & interfaces
│   ├── api.ts            # API response types
│   └── index.ts          # Re-export tất cả
│
├── utils/                # Pure helper functions (không có side-effect)
│   ├── cn.ts             # clsx + tailwind-merge
│   ├── format.ts         # formatDate, formatCurrency, truncate
│   └── index.ts          # Re-export tất cả
│
├── App.tsx               # Root page component (mounted vào router)
├── main.tsx              # Entry point — bootstrap providers
└── index.css             # Global styles (Tailwind v4 @import)
```

## Quy tắc phân vùng

| Thư mục | Đặt vào đây khi nào |
|---------|---------------------|
| `src/components/` | Component dùng ở ≥ 2 features khác nhau |
| `src/components/ui/` | shadcn/ui components được cài bằng CLI |
| `src/features/<name>/components/` | Component chỉ dùng trong 1 feature |
| `src/hooks/` | Hook không gắn với feature cụ thể (debounce, media query, ...) |
| `src/features/<name>/hooks/` | TanStack Query hooks của feature đó |
| `src/stores/` | Zustand store cho **client state** (UI, auth token) |
| `src/api/` | Axios client dùng chung — KHÔNG chứa business API calls |
| `src/features/<name>/api/` | Business API functions của feature |
| `src/types/` | Types dùng ở nhiều nơi (API response shapes, base entities) |
| `src/utils/` | Pure functions không import gì từ React |

## Quy tắc import alias

Dự án dùng alias `@/` trỏ tới `src/`:

```ts
// ✅ Đúng
import { cn } from '@/utils'
import { useAuthStore } from '@/stores/authStore'

// ❌ Sai — import tương đối sâu
import { cn } from '../../utils/cn'
```

## Nguyên tắc chung

- Mỗi thư mục có `index.ts` để re-export — tránh import trực tiếp vào file con.
- Feature modules tự chứa logic của mình (components + hooks + api trong cùng folder).
- Không để business logic trong `stores/` — stores chỉ giữ UI state và auth token.
