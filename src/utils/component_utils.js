import { PropTypes } from 'react'
const { func } = PropTypes

export function addProp (component, propName, propType, defaultValue) {
  component.propTypes[propName] = propType

  if (defaultValue != null) {
    component.defaultProps[propName] = defaultValue
  }
}

export function addFormatNumberProp (component, formatFn) {
  addProp(component, 'formatNumber', func, formatFn)
}

export function addFormatDateProp (component, formatFn) {
  addProp(component, 'formatDate', func, formatFn)
}
