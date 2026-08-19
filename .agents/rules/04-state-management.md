# 04 — State Management Convention

## Nguyên tắc phân tách state

| Loại state | Giải pháp | Ví dụ |
|-----------|----------|-------|
| **Server state** (data từ API) | TanStack Query | Danh sách candidates, chi tiết job |
| **Client state — global UI** | Zustand | Theme, sidebar open/close |
| **Client state — auth** | Zustand + localStorage | Access token |
| **Local UI state** | `useState` | Modal open, form step, toggle |
| **Form state** | React Hook Form | Form values, validation errors |

> **Quy tắc vàng**: Không dùng Zustand để cache server data. TanStack Query là source of truth cho data từ API.

---

## Zustand Stores Pattern

### Cấu trúc chuẩn

```ts
import { create } from 'zustand'

// 1. Định nghĩa interface cho state + actions
interface UIState {
  // State
  theme: 'light' | 'dark'
  sidebarOpen: boolean

  // Actions — tên bắt đầu bằng động từ
  toggleTheme: () => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

// 2. Tạo store — export hook với prefix "use"
export const useUIStore = create<UIState>((set) => ({
  // Initial state
  theme: 'light',
  sidebarOpen: true,

  // Actions
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
```

### Auth Store với localStorage

```ts
export const useAuthStore = create<AuthState>((set) => ({
  // Khởi tạo từ localStorage để persist qua refresh
  accessToken: localStorage.getItem('access_token'),

  setAccessToken: (token) => {
    // ✅ Đồng bộ localStorage và store cùng lúc
    if (token) {
      localStorage.setItem('access_token', token)
    } else {
      localStorage.removeItem('access_token')
    }
    set({ accessToken: token })
  },

  clearAuth: () => {
    localStorage.removeItem('access_token')
    set({ accessToken: null })
  },
}))
```

### Truy cập store ngoài React component

```ts
// ✅ Dùng .getState() cho non-React context (interceptors, utils)
const token = useAuthStore.getState().accessToken
useAuthStore.getState().clearAuth()

// ✅ Dùng hook trong component
const { theme, toggleTheme } = useUIStore()
```

### Selector pattern — tránh re-render không cần thiết

```tsx
// ✅ Chỉ subscribe field cần dùng
const theme = useUIStore((state) => state.theme)
const toggleTheme = useUIStore((state) => state.toggleTheme)

// ⚠️ Destructure toàn bộ — component re-render khi bất kỳ field nào thay đổi
const { theme, sidebarOpen, toggleTheme, toggleSidebar } = useUIStore()
```

---

## TanStack Query Pattern (Server State)

### QueryClient setup (main.tsx)

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  // tắt refetch khi focus window
      retry: 1,                     // retry 1 lần khi lỗi
      staleTime: 1000 * 60 * 5,    // cache 5 phút
    },
  },
})
```

### Query Hook Pattern (trong `features/<name>/hooks/`)

```ts
import { useQuery } from '@tanstack/react-query'
import { fetchCandidates } from '../api/candidatesApi'

// ✅ Query keys — dùng array, từ chung đến riêng
export const candidateKeys = {
  all: ['candidates'] as const,
  lists: () => [...candidateKeys.all, 'list'] as const,
  list: (params: QueryParams) => [...candidateKeys.lists(), params] as const,
  detail: (id: string) => [...candidateKeys.all, 'detail', id] as const,
}

// ✅ Dùng `export const` (arrow function) — nhất quán với style codebase
export const useCandidatesQuery = (params: QueryParams) => {
  return useQuery({
    queryKey: candidateKeys.list(params),
    queryFn: () => fetchCandidates(params),
  })
}

export const useCandidateDetailQuery = (id: string) => {
  return useQuery({
    queryKey: candidateKeys.detail(id),
    queryFn: () => fetchCandidateById(id),
    enabled: !!id,   // ✅ Chỉ fetch khi có id
  })
}
```

### Mutation Hook Pattern

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ✅ Dùng `export const` (arrow function) — nhất quán với style codebase
export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      // ✅ Invalidate list sau khi tạo mới
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() })
    },
  })
}
```

---

## Quy tắc tổng quát

1. **Server data** → TanStack Query (không lưu vào Zustand)
2. **UI state** (theme, sidebar, modal) → Zustand
3. **Auth token** → Zustand + localStorage sync
4. **Form data** → React Hook Form (không dùng useState từng field)
5. **Component-local toggle** (expand, hover) → `useState`
