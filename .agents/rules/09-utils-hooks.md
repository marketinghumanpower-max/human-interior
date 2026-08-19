# 09 — Utils & Custom Hooks Convention

## Shared Utils (`src/utils/`)

Chứa **pure functions** — không có side effects, không import từ React, không gọi API.

### Barrel export

```ts
// src/utils/index.ts — re-export tất cả
export * from './cn'
export * from './format'
```

Import từ bất cứ đâu qua barrel:

```ts
import { cn, formatDate, formatCurrency, truncate } from '@/utils'
```

---

## `cn()` — Class Name Helper

```ts
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Cách dùng

```tsx
// ✅ Base class + conditional class + forwarded className
<div className={cn(
  'rounded-lg border p-4',             // luôn có
  isActive && 'border-indigo-500',     // conditional boolean
  size === 'sm' ? 'p-2' : 'p-4',      // conditional ternary
  className                            // forwarded prop
)} />

// ✅ Merge Tailwind conflicts — twMerge xử lý
cn('p-4', 'p-2')  // → 'p-2' (conflict resolved)
cn('text-red-500', 'text-blue-500')  // → 'text-blue-500'
```

---

## Format Utilities (`src/utils/format.ts`)

### `formatDate()`

```ts
/**
 * @param date - Date | string | number
 * @param locale - mặc định 'vi-VN'
 * @param options - Intl.DateTimeFormatOptions
 */
formatDate(date)                          // → "08/08/2026" (vi-VN)
formatDate(date, 'en-US')                 // → "08/08/2026"
formatDate(date, 'vi-VN', { month: 'long' })  // → "08 tháng 8, 2026"
```

### `formatCurrency()`

```ts
/**
 * @param amount - number
 * @param locale  - mặc định 'vi-VN'
 * @param currency - mặc định 'VND'
 */
formatCurrency(5000000)            // → "5.000.000 ₫"
formatCurrency(1000, 'en-US', 'USD')  // → "$1,000.00"
```

### `truncate()`

```ts
truncate('Hello World', 8)   // → "Hello W…"
truncate('Hi', 10)           // → "Hi" (không cắt nếu ngắn hơn maxLength)
```

---

## Shared Custom Hooks (`src/hooks/`)

Chứa hooks **không thuộc feature cụ thể** — dùng được ở nhiều nơi.

### Quy tắc

- Prefix bắt buộc: `use`
- Pure logic — không import business API
- Có JSDoc mô tả mục đích

### `useDebounce<T>()`

```ts
// src/hooks/useDebounce.ts
// ✅ Dùng `export const` (arrow function) — nhất quán với style codebase
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  // implementation
}

// Sử dụng
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 500)

useEffect(() => {
  // Chỉ gọi API khi debouncedSearch thay đổi (sau 500ms dừng gõ)
  fetchResults(debouncedSearch)
}, [debouncedSearch])
```

### Các hooks phổ biến nên thêm

```ts
// useMediaQuery — responsive checks
export const useMediaQuery = (query: string): boolean => { ... }

// useLocalStorage — typed localStorage
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (val: T) => void] => { ... }

// useClickOutside — đóng dropdown/modal khi click ngoài
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
): void => { ... }

// useToggle — boolean toggle
export const useToggle = (initialValue = false): [boolean, () => void] => { ... }
```

---

## Feature-specific Hooks (`src/features/<name>/hooks/`)

Hooks thuộc feature cụ thể — chủ yếu là TanStack Query hooks:

```
features/candidates/hooks/
├── useCandidatesQuery.ts       # GET list
├── useCandidateDetailQuery.ts  # GET by id
├── useCreateCandidateMutation.ts
├── useUpdateCandidateMutation.ts
└── useDeleteCandidateMutation.ts
```

### Ví dụ — `useUsers` (GET list users)

```ts
// src/features/users/hooks/useUsersQuery.ts
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/usersApi'
import type { UserQueryParams } from '../types'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserQueryParams) => [...userKeys.lists(), params] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
}

// ✅ export const — không dùng `export function`
export const useUsers = (params: UserQueryParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUsers(params),
  })
}
```

Chi tiết xem tại [04-state-management.md](./04-state-management.md) và [05-api-pattern.md](./05-api-pattern.md).

---

## Tóm tắt phân loại

| Đặt ở đâu | Khi nào |
|-----------|---------|
| `src/utils/` | Pure function, không có React hooks |
| `src/hooks/` | Custom hook dùng chung, không thuộc feature |
| `src/features/<name>/hooks/` | TanStack Query hooks của feature |
| Inline trong component | Hook logic quá nhỏ, không cần tái sử dụng |
