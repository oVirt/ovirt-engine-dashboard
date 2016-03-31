import React, { PropTypes } from 'react'
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

export function cloneElementWithCustomRef (reactElement, customRef, props = {}) {
  return React.cloneElement(reactElement, Object.assign({}, props, {
    ref: (e) => {
      // invoke custom callback ref
      customRef(e)

      // invoke existing callback ref, if it's defined
      if (typeof reactElement.ref === 'function') {
        reactElement.ref(e)
      }
    }
  }))
}
