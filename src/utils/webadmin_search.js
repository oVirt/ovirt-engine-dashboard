import { PLUGIN_API as api } from '../constants'

export function applySearch (prefix, fieldName = '', fieldValues = []) {
  let str = `${prefix}:`

  if (fieldName && fieldValues.length > 0) {
    str = fieldValues.reduce((str, value, index) => (
      index === 0
        ? `${str} ${fieldName} = ${value}`
        : `${str} or ${fieldName} = ${value}`
    ), str)
  }

  api.setSearchString(str)
}
