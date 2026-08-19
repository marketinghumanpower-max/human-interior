# HumanPower Recruitment — Convention & Pattern Overview

Thư mục này chứa toàn bộ quy ước và pattern của dự án, chia theo từng lĩnh vực.

## Danh sách convention files

| File | Nội dung |
|------|----------|
| [01-folder-structure.md](./01-folder-structure.md) | Cấu trúc thư mục `src/` và quy ước tổ chức |
| [02-naming-convention.md](./02-naming-convention.md) | Quy ước đặt tên file, biến, hàm, component |
| [03-component-pattern.md](./03-component-pattern.md) | Pattern viết React component |
| [04-state-management.md](./04-state-management.md) | Zustand stores — server state vs client state |
| [05-api-pattern.md](./05-api-pattern.md) | Axios client, interceptors, TanStack Query |
| [06-feature-module.md](./06-feature-module.md) | Pattern tổ chức feature-based module |
| [07-type-convention.md](./07-type-convention.md) | TypeScript types, interfaces, generic patterns |
| [08-i18n-convention.md](./08-i18n-convention.md) | Internationalization (i18next) |
| [09-utils-hooks.md](./09-utils-hooks.md) | Pure utilities và shared custom hooks |
| [10-styling-convention.md](./10-styling-convention.md) | Tailwind CSS v4, class naming, cn() helper |

## Tech stack

| Lớp | Thư viện |
|-----|----------|
| Framework | React 19 + TypeScript (strict mode) |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 (Data Router) |
| Server state | TanStack Query v5 |
| Client state | Zustand |
| HTTP client | Axios (với interceptors) |
| Form | React Hook Form + Zod |
| i18n | i18next + react-i18next |
| UI primitives | shadcn/ui (trong `components/ui/`) |
