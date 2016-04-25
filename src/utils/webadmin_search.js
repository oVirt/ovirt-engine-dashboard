import { PLUGIN_API as api } from '../constants'

// TODO(vs) this is complex enough to have a unit test

export function applySearch (prefix, fields = []) {
  let str = `${prefix}:`

  fields.forEach(({ name, values, operator = '=' }, fieldIndex) => {
    if (name && values.length > 0) {
      // add conjunction if needed
      str = fieldIndex > 0 ? `${str} and` : str

      // add field search criteria
      str = values.reduce((str, value, valueIndex) => (
        valueIndex === 0
          ? `${str} ${name} ${operator} ${value}`
          : `${str} or ${name} ${operator} ${value}`
      ), str)
    }
  })

  api.setSearchString(str)
}
