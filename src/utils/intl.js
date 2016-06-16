/* global __DEV__ */

import IntlMessageFormat from 'intl-messageformat'
import { pluginApi, translatedMessages } from '../constants'

// IntlMessageFormat object cache
const messageFormats = {}

// initialized lazily due to UI plugin lifecycle
let locale

// TODO(vs) fetch translations for given locale asynchronously

export function initLocale () {
  locale = pluginApi.currentLocale()
  !locale && __DEV__ && console.error('Failed to resolve current locale')
}

export function currentLocale () {
  return locale
}

export function translateMessage (id, defaultMessage) {
  const translation = translatedMessages[locale] && translatedMessages[locale][id]

  if (!translation) {
    __DEV__ && console.warn(`Missing [${locale}] translation for message [${id}]`)
    return defaultMessage
  }

  return translation
}

export function formatMessage (id, defaultMessage, values = {}) {
  let fmt = messageFormats[id]

  if (!fmt) {
    fmt = new IntlMessageFormat(translateMessage(id, defaultMessage), locale)
    messageFormats[id] = fmt
  }

  return fmt.format(values)
}

// TODO(vs) use Intl.NumberFormat and Intl.DateTimeFormat (ECMA-402 standard)

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
