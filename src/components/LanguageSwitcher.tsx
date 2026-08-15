import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi'
    i18n.changeLanguage(nextLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors"
    >
      {i18n.language === 'vi' ? 'EN' : 'VI'}
    </button>
  )
}
