import React, { PropTypes } from 'react'
const { string, element } = PropTypes
import $ from 'jquery'
import { cloneElementWithCustomRef } from '../../utils/react'

class Tooltip extends React.Component {

  componentDidMount () {
    $(this._childElement).tooltip({
      title: this.props.text
    })
  }

  render () {
    const child = React.Children.only(this.props.children)
    return cloneElementWithCustomRef(child, (e) => { this._childElement = e })
  }

}

Tooltip.propTypes = {
  children: element.isRequired,
  text: string.isRequired
}

export default Tooltip
