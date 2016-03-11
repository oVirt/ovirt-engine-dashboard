// TODO(vs) use Intl.NumberFormat and Intl.DateTimeFormat (ECMA-402 standard)
// If we need to support IE <= 10, use polyfill https://github.com/andyearnshaw/Intl.js

export function formatNumber (num, digits) {
  return Number(num.toFixed(digits))
}

export function formatNumber0D (num) {
  return formatNumber(num, 0)
}

export function formatNumber1D (num) {
  return formatNumber(num, 1)
}

export function formatDate (date) {
  return date.toLocaleDateString()
}

export function formatDateTime (date) {
  return `${formatDate(date)} ${date.toLocaleTimeString()}`
}
