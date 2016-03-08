export function formatNumber (num, digits) {
  return Number(num.toFixed(digits))
}

export function formatNumber1D (num) {
  return formatNumber(num, 1)
}
