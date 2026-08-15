/**
 * Format a date to a localized string.
 * @param date - The date to format
 * @param locale - The locale to use (default: 'vi-VN')
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDate(
  date: Date | string | number,
  locale: string = 'vi-VN',
  options?: Intl.DateTimeFormatOptions
): string {
  const d = new Date(date)
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  })
}

/**
 * Format a number as Vietnamese currency (VND).
 */
export function formatCurrency(
  amount: number,
  locale: string = 'vi-VN',
  currency: string = 'VND'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Truncate a string to a max length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '…'
}
