# 10 — Styling Convention (Tailwind CSS v4)

## Stack styling

| Công cụ | Vai trò |
|---------|---------|
| **Tailwind CSS v4** | Utility-first CSS framework |
| **clsx** | Conditional class joining |
| **tailwind-merge** | Resolve Tailwind class conflicts |
| **`cn()`** helper | Kết hợp clsx + twMerge |

---

## Dùng `cn()` cho className động

```tsx
import { cn } from '@/utils'

// ✅ Mọi className có logic điều kiện → dùng cn()
<button
  className={cn(
    // Base classes — luôn áp dụng
    'px-4 py-2 rounded-lg font-medium text-sm transition-colors',
    // Variant
    variant === 'primary' && 'bg-indigo-600 hover:bg-indigo-700 text-white',
    variant === 'outline' && 'border border-slate-300 hover:bg-slate-100 text-slate-700',
    // State
    disabled && 'opacity-50 cursor-not-allowed',
    // Forwarded className
    className
  )}
/>
```

---

## Color Palette của dự án

| Role | Color | Class |
|------|-------|-------|
| Primary | Indigo | `indigo-600`, `indigo-700` (hover) |
| Background | Slate | `slate-50` (page bg), `slate-100` |
| Surface | White | `bg-white` |
| Border | Slate | `slate-200`, `slate-300` |
| Text primary | Slate 800-900 | `text-slate-800`, `text-slate-900` |
| Text secondary | Slate 500-600 | `text-slate-500`, `text-slate-600` |
| Success/Feature | Emerald | `emerald-50`, `emerald-100` |
| Info/Highlight | Indigo | `indigo-50`, `indigo-100` |

---

## Layout patterns

### Page Layout

```tsx
// MainLayout pattern
<div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
  <header className="bg-white border-b border-slate-200 px-6 py-4">...</header>
  <main className="flex-1 max-w-7xl w-full mx-auto p-6">...</main>
  <footer className="bg-white border-t border-slate-200">...</footer>
</div>
```

### Content max-width

```tsx
// ✅ Content luôn có max-width để không giãn quá rộng
<main className="max-w-7xl w-full mx-auto p-6">
```

### Grid responsive

```tsx
// ✅ Mobile-first responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

---

## Card / Surface pattern

```tsx
// ✅ Standard card
<div className="bg-white p-8 rounded-xl shadow-xs border border-slate-200">
  ...
</div>

// ✅ Feature highlight card
<div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
  ...
</div>
```

---

## Typography

```tsx
// Heading hierarchy
<h1 className="text-xl font-bold tracking-tight text-indigo-600">  {/* Logo/Brand */}
<h2 className="text-2xl font-bold text-slate-800">
<h3 className="font-semibold text-slate-900">
<p  className="text-slate-600">
<span className="text-sm text-slate-500">
<code className="text-xs">
```

---

## Button Styles

```tsx
// ✅ Primary button
<button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">

// ✅ Outline button
<button className="px-3 py-1 text-xs font-semibold rounded-md border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer">

// ✅ Luôn có transition-colors cho hover effects
// ✅ Luôn có cursor-pointer
```

---

## Navigation / Link Styles

```tsx
// ✅ Nav link với hover transition
<a href="/" className="hover:text-indigo-600 transition-colors text-slate-600 font-medium text-sm">
```

---

## Spacing Scale

Dùng Tailwind spacing utilities. Một số pattern phổ biến:

| Context | Class |
|---------|-------|
| Section padding | `p-6`, `p-8` |
| Card padding | `p-4`, `p-6` |
| Gap between items | `gap-4`, `gap-6` |
| Space between siblings | `space-y-4`, `space-y-6` |
| Horizontal nav gap | `gap-4` |

---

## shadcn/ui Integration

- Cài component: `npx shadcn@latest add <name>`
- File được tạo tự động tại `src/components/ui/`
- **Không sửa source file** của shadcn — chỉ customize qua `className` prop

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// ✅ Customize qua className
<Button className="bg-indigo-600 hover:bg-indigo-700">Submit</Button>
```

---

## Dark mode (hiện tại chưa implement)

Theme `dark/light` đang được lưu trong `useUIStore` nhưng chưa có Tailwind dark mode class. Khi implement:

```tsx
// ✅ Pattern dùng class-based dark mode (Tailwind v4)
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
```

---

## Quy tắc quan trọng

- ✅ **Mobile-first**: Breakpoints theo thứ tự `sm:`, `md:`, `lg:`, `xl:`
- ✅ **Không hardcode color** — luôn dùng Tailwind color scale
- ✅ **Dùng `cn()`** khi có class điều kiện — tránh string concatenation
- ✅ **`transition-colors`** cho mọi element có hover state
- ✅ **`cursor-pointer`** cho mọi clickable element (button, a, ...)
- ❌ **Không viết CSS tùy chỉnh** ngoài `index.css` (chỉ global styles)
- ❌ **Không dùng inline style** `style={{ ... }}` trừ khi bắt buộc (dynamic values)
