import IntlMessageFormat from 'intl-messageformat'
import { defaultLocale } from '../constants'
import translatedMessages from '../../intl/translations.json'

// TODO(vs) this is beyond simple utility functions, extract the code into services/intl

// IntlMessageFormat object cache
const messageFormats = {}

let locale

export function initLocale (currentLocale) {
  locale = currentLocale
}

export function currentLocale () {
  return locale
}

export function translateMessage (id, defaultMessage) {
  const translation = translatedMessages[locale] && translatedMessages[locale][id]

  if (!translation) {
    __DEV__ && console.warn(`Missing [${locale}] translation for message key [${id}]`)
    return defaultMessage
  }

  return translation
}

export function formatMessage (id, defaultMessage, values = {}) {
  let fmt = messageFormats[id]

  if (!fmt) {
    // translation needed only for non-default locale
    const message = (locale !== defaultLocale) ? translateMessage(id, defaultMessage) : defaultMessage

    fmt = new IntlMessageFormat(message, locale)
    messageFormats[id] = fmt
  }

  return fmt.format(values)
}

// TODO(vs) use Intl.NumberFormat and Intl.DateTimeFormat

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
