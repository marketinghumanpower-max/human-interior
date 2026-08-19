# 07 — TypeScript Type Convention

## Nguyên tắc chung

- Dự án dùng TypeScript **strict mode** — bắt buộc type rõ ràng, không dùng `any`
- Ưu tiên `interface` cho object types, `type` cho unions/intersections/aliases
- Generic types nên có tên mô tả (hoặc `T` cho trường hợp đơn giản)

---

## Shared Types (`src/types/`)

### `src/types/api.ts` — API Response Shapes

```ts
/** Standard paginated API response wrapper */
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

/** Standard single-item API response */
export interface ApiResponse<T> {
  data: T
  message?: string
}

/** Common base fields cho mọi entity */
export interface BaseEntity {
  id: string
  createdAt: string  // ISO 8601 string
  updatedAt: string  // ISO 8601 string
}
```

### `src/types/index.ts` — Re-export barrel

```ts
// Chỉ chứa re-exports — không khai báo type trực tiếp ở đây
export * from './api'
```

---

## Feature-specific Types

Mỗi feature có thể có `types.ts` riêng cho domain models:

```ts
// features/candidates/types.ts
import type { BaseEntity } from '@/types'

export interface Candidate extends BaseEntity {
  fullName: string
  email: string
  phone?: string
  status: CandidateStatus
  position: string
}

export type CandidateStatus =
  | 'new'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected'

export interface CreateCandidateDto {
  fullName: string
  email: string
  phone?: string
  position: string
}

export interface UpdateCandidateDto extends Partial<CreateCandidateDto> {}

export interface QueryParams {
  page?: number
  pageSize?: number
  search?: string
  status?: CandidateStatus
}
```

---

## Quy ước đặt tên Types

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Entity/Model | `PascalCase` | `Candidate`, `JobPosting` |
| DTO | `PascalCase + "Dto"` | `CreateCandidateDto` |
| Props | `ComponentName + "Props"` | `CandidateCardProps` |
| State interface | `StoreNoun + "State"` | `AuthState`, `UIState` |
| Union type | `PascalCase` | `CandidateStatus`, `Theme` |
| Enum-like union | Lowercase string literals | `'light' \| 'dark'` |
| Query params | `QueryParams` | `CandidateQueryParams` |

---

## Interface vs Type

```ts
// ✅ interface — cho object shapes, extendable
interface Candidate extends BaseEntity {
  fullName: string
}

// ✅ type — cho unions, intersections, aliases
type CandidateStatus = 'new' | 'screening' | 'hired' | 'rejected'
type Theme = 'light' | 'dark'
type CandidateWithDetails = Candidate & { interviews: Interview[] }

// ❌ Không dùng interface cho unions
interface StatusUnion {
  status: 'new' | 'hired'  // ✅ ok in interface, but better as type alias if standalone
}
```

---

## Generic Patterns

```ts
// ✅ Single generic — dùng T
function useDebounce<T>(value: T, delay: number): T { ... }

// ✅ Multiple generics — dùng tên mô tả
function transform<TInput, TOutput>(
  input: TInput,
  fn: (val: TInput) => TOutput
): TOutput { ... }

// ✅ Constrained generic
function getEntityById<T extends BaseEntity>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}
```

---

## Zustand Store Typing

```ts
// ✅ Định nghĩa interface rõ ràng cho store
interface AuthState {
  accessToken: string | null           // state
  setAccessToken: (token: string | null) => void  // action
  clearAuth: () => void                // action
}

export const useAuthStore = create<AuthState>((set) => ({ ... }))
```

---

## Import Type

```ts
// ✅ Dùng "import type" cho type-only imports
import type { Candidate, CandidateStatus } from '@/types'
import type { AxiosError } from 'axios'

// ✅ Mixed imports khi cần cả value và type
import { useState } from 'react'            // value
import type { FC, ReactNode } from 'react'  // type only
```

---

## Các anti-patterns cần tránh

```ts
// ❌ Không dùng any
const data: any = await fetchCandidates()

// ✅ Thay bằng type assertion hoặc generic
const data: PaginatedResponse<Candidate> = await fetchCandidates(params)

// ❌ Không dùng object thay interface
const candidate: object = { ... }

// ❌ Không dùng Function type
const handler: Function = () => { ... }
// ✅ Thay bằng signature rõ ràng
const handler: (id: string) => void = (id) => { ... }
```
