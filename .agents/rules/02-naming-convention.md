# 02 — Naming Convention

## File & Thư mục

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| React Component file | `PascalCase.tsx` (Luôn đặt tên bằng Tiếng Anh) | `CandidateCard.tsx`, `BenefitsPage.tsx` |
| Hook file | `camelCase.ts` | `useDebounce.ts` |
| Store file | `camelCase + "Store".ts` | `authStore.ts`, `uiStore.ts` |
| Utility file | `camelCase.ts` | `format.ts`, `cn.ts` |
| Type file | `camelCase.ts` | `api.ts` |
| Config file | `camelCase.ts` | `config.ts` |
| Locale file | `<lang>.json` | `vi.json`, `en.json` |
| Feature thư mục | `kebab-case` | `candidates/`, `job-postings/` |
| Re-export barrel | `index.ts` | `utils/index.ts`, `types/index.ts` |
| Route file | `routes.tsx` (singleton) | `router/routes.tsx` |

> ⚠️ **Lưu ý**: Tất cả tên React Component và tên file `.tsx` phải luôn được đặt bằng **tiếng Anh** (ví dụ: `BenefitsPage.tsx`, `BoardOfDirectorsPage.tsx`, `GeneralOverviewPage.tsx`).

## React Components

```tsx
// ✅ Đúng — Named export, PascalCase
export const CandidateCard = () => { ... }

// ✅ Đúng — Default export cho page/root component
export default function App() { ... }

// ❌ Sai — arrow function với default export ẩn danh
export default () => { ... }
```

### Quy tắc export component

- **Layout, shared components**: dùng **named export** (`export const`)
- **Page / root component (App.tsx)**: dùng **default export** + function declaration

## Props Interface

```tsx
// ✅ Đúng — Props interface đặt tên = ComponentName + "Props"
interface CandidateCardProps {
  candidateId: string
  onSelect: (id: string) => void
}

export const CandidateCard = ({ candidateId, onSelect }: CandidateCardProps) => {
  ...
}
```

## Custom Hooks

```ts
// ✅ Đúng — Prefix "use", camelCase
export function useDebounce<T>(value: T, delay: number = 300): T { ... }
export function useCandidateQuery(id: string) { ... }

// ❌ Sai
export function debounce<T>(...) { ... }  // thiếu prefix "use"
```

## Zustand Stores

```ts
// ✅ Đúng — Hook tên = "use" + StoreName (PascalCase)
export const useAuthStore = create<AuthState>(...)
export const useUIStore = create<UIState>(...)

// Interface tên = StoreNoun + "State"
interface AuthState { ... }
interface UIState { ... }
```

## TanStack Query Hooks (trong features)

```ts
// ✅ Query hooks
export function useCandidatesQuery(params: QueryParams) { ... }
export function useCandidateDetailQuery(id: string) { ... }

// ✅ Mutation hooks
export function useCreateCandidateMutation() { ... }
export function useUpdateCandidateMutation() { ... }
export function useDeleteCandidateMutation() { ... }
```

## API Functions

```ts
// ✅ Đặt trong features/<name>/api/ — động từ + danh từ
export async function fetchCandidates(params: QueryParams) { ... }
export async function createCandidate(data: CreateCandidateDto) { ... }
export async function updateCandidate(id: string, data: UpdateCandidateDto) { ... }
export async function deleteCandidate(id: string) { ... }
```

## Types & Interfaces

```ts
// ✅ Interface dùng PascalCase
interface BaseEntity { ... }
interface PaginatedResponse<T> { ... }

// ✅ Generic type parameter — chữ cái đơn hoặc tên mô tả
type ApiResponse<T> = { data: T; message?: string }
type ApiResponse<TData> = { data: TData }   // ✅ cũng ok

// ✅ DTO (Data Transfer Object) — Noun + "Dto"
interface CreateCandidateDto { ... }
interface UpdateCandidateDto { ... }

// ❌ Tránh prefix "I" cho interface (không dùng convention C#)
interface ICandidate { ... }  // ❌
```

## Biến & Constants

```ts
// ✅ camelCase cho biến thông thường
const accessToken = '...'
const currentLang = 'vi'

// ✅ SCREAMING_SNAKE_CASE cho constants module-level
const MAX_RETRY_COUNT = 3
const DEFAULT_PAGE_SIZE = 20

// ✅ camelCase cho object keys trong JSON/config
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: ... } } })
```

## i18n Keys

```json
// ✅ Namespace.camelCase
{
  "common": {
    "currentTheme": "...",
    "toggleTheme": "..."
  },
  "home": {
    "welcome": "...",
    "description": "..."
  }
}
```

```tsx
// ✅ Sử dụng trong code
const { t } = useTranslation(['home', 'common'])
t('home:welcome')
t('common:toggleTheme')
```
