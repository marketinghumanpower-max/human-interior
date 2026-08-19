# 08 — i18n Convention (Internationalization)

## Setup tổng quan

Dự án dùng **i18next** + **react-i18next** với:
- **2 ngôn ngữ**: `vi` (mặc định), `en`
- **Auto-detect**: Từ localStorage → navigator
- **Namespace-based**: Tách key theo feature/domain

---

## Cấu trúc locale files

```
src/i18n/
├── config.ts            # i18next setup & config
└── locales/
    ├── vi.json          # Tiếng Việt (fallback language)
    └── en.json          # Tiếng Anh
```

### Format JSON locale

```json
// vi.json — namespace lồng nhau
{
  "common": {
    "home": "Trang chủ",
    "candidates": "Ứng viên",
    "copyright": "Tất cả các quyền được bảo lưu.",
    "toggleTheme": "Đổi Theme",
    "currentTheme": "Theme hiện tại"
  },
  "home": {
    "welcome": "Chào mừng đến với HumanPower Recruitment!",
    "description": "Mô tả ngắn về trang.",
    "techStackTitle": "Tech Stack",
    "structureTitle": "Cấu trúc thư mục"
  },
  "candidates": {
    "title": "Danh sách ứng viên",
    "addNew": "Thêm ứng viên",
    "search": "Tìm kiếm..."
  }
}
```

---

## i18next Config (`src/i18n/config.ts`)

```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import viTranslation from './locales/vi.json'
import enTranslation from './locales/en.json'

export const defaultNS = 'common'

export const resources = {
  vi: {
    common: viTranslation.common,
    home: viTranslation.home,
    // Thêm namespace mới vào đây khi có feature mới
  },
  en: {
    common: enTranslation.common,
    home: enTranslation.home,
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS,          // namespace mặc định là 'common'
    resources,
    fallbackLng: 'vi',  // fallback về tiếng Việt
    interpolation: {
      escapeValue: false, // React đã escape values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],  // persist ngôn ngữ đã chọn
    },
  })
```

---

## Sử dụng trong Component

### Một namespace

```tsx
import { useTranslation } from 'react-i18next'

export const CandidatesPage = () => {
  // ✅ Single namespace — mặc định dùng defaultNS ('common')
  const { t } = useTranslation()
  // hoặc
  const { t } = useTranslation('candidates')

  return <h1>{t('candidates:title')}</h1>
}
```

### Nhiều namespace

```tsx
export const App = () => {
  // ✅ Khai báo tất cả namespaces dùng trong component
  const { t } = useTranslation(['home', 'common'])

  return (
    <div>
      <h2>{t('home:welcome')}</h2>
      <span>{t('common:currentTheme')}</span>
    </div>
  )
}
```

### Interpolation (biến trong chuỗi)

```json
// vi.json
{
  "greeting": "Xin chào, {{name}}!"
}
```

```tsx
t('greeting', { name: 'Kiet' })  // → "Xin chào, Kiet!"
```

---

## LanguageSwitcher Component

Component dùng chung (`src/components/LanguageSwitcher.tsx`) để toggle ngôn ngữ:

```tsx
const { i18n } = useTranslation()

// ✅ startsWith('vi') để handle cả 'vi' và 'vi-VN'
const currentLang = i18n.language.startsWith('vi') ? 'vi' : 'en'
const nextLang = currentLang === 'vi' ? 'en' : 'vi'

i18n.changeLanguage(nextLang)  // Persist qua localStorage tự động
```

---

## Quy ước i18n Keys

| Rule | Ví dụ |
|------|-------|
| camelCase | `techStackTitle`, `addNew` |
| Namespace prefix khi dùng `t()` | `t('home:welcome')` |
| Common/shared strings → `common` namespace | `t('common:save')` |
| Feature-specific strings → namespace riêng | `t('candidates:filter')` |

---

## Khi thêm Feature mới với i18n

1. Thêm namespace vào `vi.json` và `en.json`
2. Đăng ký namespace trong `config.ts` → `resources`
3. Dùng `useTranslation('feature-name')` trong component

```ts
// config.ts — thêm namespace mới
export const resources = {
  vi: {
    common: viTranslation.common,
    home: viTranslation.home,
    candidates: viTranslation.candidates,  // ✅ thêm vào đây
  },
  en: { ... }
}
```

---

## Quy tắc

- ✅ **Không hardcode text** tiếng Việt hay tiếng Anh trực tiếp trong JSX
- ✅ Luôn có key trong cả `vi.json` và `en.json`
- ✅ `vi` là `fallbackLng` — key phải tồn tại trong `vi.json`
- ✅ Namespace `common` cho strings dùng ở nhiều nơi
- ❌ Không dùng namespace `default` hay `translation` (i18next default name)
