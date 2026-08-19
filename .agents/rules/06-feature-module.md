# 06 — Feature Module Pattern

## Khái niệm Feature-based Architecture

Dự án tổ chức theo **feature modules**: mỗi tính năng (candidates, jobs, interviews, ...) là một thư mục khép kín, tự chứa toàn bộ logic của mình.

## Cấu trúc một Feature Module

```
src/features/<feature-name>/
├── components/          # UI components chỉ dùng trong feature này
│   ├── CandidateCard.tsx
│   ├── CandidateForm.tsx
│   └── CandidateList.tsx
│
├── hooks/               # TanStack Query hooks (useXxxQuery, useXxxMutation)
│   ├── useCandidatesQuery.ts
│   ├── useCandidateDetailQuery.ts
│   └── useCreateCandidateMutation.ts
│
├── api/                 # (Optional) API functions riêng của feature
│   └── candidatesApi.ts
│
├── types.ts             # (Optional) Types riêng của feature
│
└── README.md            # Mô tả ngắn về feature này
```

## Ví dụ: Feature `candidates`

### `features/candidates/api/candidatesApi.ts`

```ts
import axiosClient from '@/api/axiosClient'
import type { PaginatedResponse } from '@/types'
import type { Candidate, QueryParams } from './types'

export async function fetchCandidates(params: QueryParams): Promise<PaginatedResponse<Candidate>> {
  return axiosClient.get('/candidates', { params })
}
```

### `features/candidates/hooks/useCandidatesQuery.ts`

```ts
import { useQuery } from '@tanstack/react-query'
import { fetchCandidates } from '../api/candidatesApi'

export const candidateKeys = {
  all: ['candidates'] as const,
  lists: () => [...candidateKeys.all, 'list'] as const,
  list: (params: QueryParams) => [...candidateKeys.lists(), params] as const,
  detail: (id: string) => [...candidateKeys.all, 'detail', id] as const,
}

export function useCandidatesQuery(params: QueryParams) {
  return useQuery({
    queryKey: candidateKeys.list(params),
    queryFn: () => fetchCandidates(params),
  })
}
```

### `features/candidates/components/CandidateList.tsx`

```tsx
import { useCandidatesQuery } from '../hooks/useCandidatesQuery'

export const CandidateList = () => {
  const { data, isLoading } = useCandidatesQuery({ page: 1 })

  if (isLoading) return <Spinner />

  return (
    <div>
      {data?.data.map((c) => <CandidateCard key={c.id} candidate={c} />)}
    </div>
  )
}
```

---

## Quy tắc Feature Module

### ✅ Được phép
- Component trong feature import từ `@/components/`, `@/hooks/`, `@/utils/`, `@/types/`
- Feature có thể tạo `types.ts` riêng cho domain types
- Features có thể có thư mục `api/` riêng nếu API calls phức tạp

### ❌ Không được phép
- **Feature A KHÔNG import từ Feature B** — gây coupling
  ```ts
  // ❌ Sai
  import { CandidateCard } from '@/features/candidates/components/CandidateCard'
  // trong src/features/jobs/components/JobCard.tsx
  ```
- Nếu cần share component giữa features → chuyển lên `src/components/`

### Khi nào tạo feature mới?

Tạo feature mới khi có một nhóm tính năng liên quan với:
- Ít nhất 1 route/page
- Data model riêng
- API endpoints riêng

Ví dụ: `candidates/`, `job-postings/`, `interviews/`, `reports/`

---

## Thêm route cho Feature

Sau khi tạo feature, đăng ký route trong `src/router/routes.tsx`:

```tsx
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import App from '@/App'
import { CandidatesPage } from '@/features/candidates/components/CandidatesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'candidates', element: <CandidatesPage /> },
    ],
  },
])
```

---

## README.md trong mỗi Feature

Mỗi feature nên có `README.md` mô tả:

```markdown
# Feature: <feature-name>

Mô tả ngắn về feature này làm gì.

## Structure
- `components/` — ...
- `hooks/`      — ...
- `api/`        — ...

## API Endpoints
- GET /candidates
- POST /candidates
```
