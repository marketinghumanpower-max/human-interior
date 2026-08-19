# 05 — API Pattern

## Axios Client (`src/api/axiosClient.ts`)

File này là **singleton duy nhất** cho toàn bộ HTTP requests. Không tạo thêm axios instance khác.

```ts
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,  // 10 giây
})
```

### Request Interceptor

Tự động đính kèm Bearer token vào mọi request:

```ts
axiosClient.interceptors.request.use((config) => {
  // ✅ Dùng .getState() — không dùng hook trong interceptor
  const token = useAuthStore.getState().accessToken
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Response Interceptor

- **Success**: Tự động unwrap `response.data` → caller nhận trực tiếp payload
- **401**: Tự động clear auth (logout)

```ts
axiosClient.interceptors.response.use(
  (response) => response.data,  // ✅ Unwrap data
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()  // Auto logout
    }
    return Promise.reject(error)
  }
)
```

> ⚠️ **Lưu ý**: Vì response interceptor unwrap `response.data`, API functions sẽ nhận **trực tiếp payload** chứ không phải `AxiosResponse<T>`.

---

## API Functions Pattern (trong `features/<name>/api/`)

```ts
// features/candidates/api/candidatesApi.ts
import axiosClient from '@/api/axiosClient'
import type { PaginatedResponse, ApiResponse } from '@/types'
import type { Candidate, CreateCandidateDto, QueryParams } from '../types'

// ✅ Hàm async — trả về typed data trực tiếp (đã unwrap bởi interceptor)
export async function fetchCandidates(
  params: QueryParams
): Promise<PaginatedResponse<Candidate>> {
  return axiosClient.get('/candidates', { params })
}

export async function fetchCandidateById(
  id: string
): Promise<ApiResponse<Candidate>> {
  return axiosClient.get(`/candidates/${id}`)
}

export async function createCandidate(
  data: CreateCandidateDto
): Promise<ApiResponse<Candidate>> {
  return axiosClient.post('/candidates', data)
}

export async function updateCandidate(
  id: string,
  data: Partial<CreateCandidateDto>
): Promise<ApiResponse<Candidate>> {
  return axiosClient.patch(`/candidates/${id}`, data)
}

export async function deleteCandidate(id: string): Promise<void> {
  return axiosClient.delete(`/candidates/${id}`)
}
```

---

## Environment Variables

```bash
# .env.local — KHÔNG commit file này
VITE_API_BASE_URL=https://api.humanpower.vn

# .env.example — COMMIT file này làm template
VITE_API_BASE_URL=
```

- Tất cả env vars phải có prefix `VITE_` để Vite expose ra client
- Truy cập bằng `import.meta.env.VITE_*`
- Fallback mặc định: `/api` (cho proxy dev server)

---

## Shared Response Types (`src/types/api.ts`)

```ts
/** Paginated list response */
interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

/** Single item response */
interface ApiResponse<T> {
  data: T
  message?: string
}

/** Base fields cho mọi entity */
interface BaseEntity {
  id: string
  createdAt: string  // ISO string
  updatedAt: string  // ISO string
}
```

---

## Error Handling Pattern

```ts
// ✅ Trong TanStack Query — dùng onError callback
const { mutate } = useCreateCandidateMutation()

mutate(data, {
  onError: (error: AxiosError<{ message: string }>) => {
    toast.error(error.response?.data?.message ?? 'Có lỗi xảy ra')
  },
})

// ✅ Trong component — dùng isError state từ useQuery
const { data, isLoading, isError, error } = useCandidatesQuery(params)

if (isError) {
  return <ErrorMessage message={(error as AxiosError).message} />
}
```

---

## Checklist khi thêm API mới

- [ ] Tạo API function trong `features/<name>/api/`
- [ ] Import `axiosClient` từ `@/api/axiosClient`
- [ ] Định nghĩa kiểu trả về rõ ràng (không dùng `any`)
- [ ] Tạo TanStack Query hook trong `features/<name>/hooks/`
- [ ] Định nghĩa query keys theo factory pattern
