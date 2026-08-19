# 03 — Component Pattern

## Cấu trúc chuẩn một React Component

```tsx
// 1. Imports — thứ tự: thư viện bên ngoài → internal
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils'
import type { SomeType } from '@/types'

// 2. Props interface — ngay trước component
interface CandidateCardProps {
  candidateId: string
  name: string
  className?: string
  onSelect?: (id: string) => void
}

// 3. Component — named export, arrow function
export const CandidateCard = ({
  candidateId,
  name,
  className,
  onSelect,
}: CandidateCardProps) => {
  // 3a. Hooks — hooks trước, theo thứ tự: state → context → custom hooks
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  // 3b. Derived state / computed values
  const displayName = name.trim() || t('common:unknown')

  // 3c. Event handlers — prefix "handle"
  const handleClick = () => {
    onSelect?.(candidateId)
  }

  // 3d. JSX return
  return (
    <div
      className={cn('rounded-lg border p-4', className)}
      onClick={handleClick}
    >
      <span>{displayName}</span>
    </div>
  )
}
```

## Shared vs Feature-specific Components

| Loại | Vị trí | Khi nào |
|------|--------|---------|
| Shared UI primitives | `src/components/ui/` | shadcn/ui — cài bằng CLI |
| Shared custom components | `src/components/` | Dùng ở ≥ 2 features |
| Feature components | `src/features/<name>/components/` | Chỉ dùng trong 1 feature |

## Layout Component Pattern

Layout dùng `<Outlet />` của React Router để render children:

```tsx
import { Outlet } from 'react-router-dom'

// ✅ Named export
export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header>...</header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />   {/* Children pages render ở đây */}
      </main>
      <footer>...</footer>
    </div>
  )
}
```

## shadcn/ui Pattern

- Cài component qua CLI: `npx shadcn@latest add <component-name>`
- File được tạo trong `src/components/ui/`
- **KHÔNG sửa trực tiếp source** của shadcn components — customize bằng Tailwind class props hoặc wrapper

```tsx
// ✅ Dùng shadcn component qua className/props
import { Button } from '@/components/ui/button'

<Button variant="outline" className="text-indigo-600">
  Click me
</Button>

// ❌ Không sửa trực tiếp file src/components/ui/button.tsx
```

## Event Handler Pattern

```tsx
// ✅ Prefix "handle" + PascalCase action
const handleSubmit = (e: React.FormEvent) => { ... }
const handleSelectCandidate = (id: string) => { ... }
const handleToggleExpand = () => { ... }

// Props callback naming — prefix "on" + PascalCase
interface Props {
  onSelect: (id: string) => void     // ✅
  onClose: () => void                // ✅
  onChange: (value: string) => void  // ✅
}
```

## Optional Chaining cho Callbacks

```tsx
// ✅ Dùng optional chaining cho optional callbacks
onSelect?.(candidateId)

// ❌ Không check thủ công
if (onSelect) onSelect(candidateId)
```

## className Pattern với `cn()`

```tsx
import { cn } from '@/utils'

// ✅ Dùng cn() để merge classes động
<div className={cn(
  'base-class another-class',          // base styles
  isActive && 'bg-indigo-600 text-white', // conditional
  className                            // forwarded className prop
)} />
```

## Thứ tự imports

```tsx
// 1. React (chỉ khi cần explicit)
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

// 3. Internal — absolute paths với @/
import { cn } from '@/utils'
import { useAuthStore } from '@/stores/authStore'
import type { Candidate } from '@/types'

// 4. Relative imports (local files trong cùng folder/feature)
import { CandidateForm } from './CandidateForm'
```
