import React, { PropTypes } from 'react'
const { bool, string, element } = PropTypes
import $ from 'jquery'
import { cloneElementWithCustomRef } from '../../utils/react'

class Tooltip extends React.Component {

  componentDidMount () {
    $(this._childElement).tooltip({
      title: this.props.text,
      container: 'body',
      placement: this.props.placement || 'top',
      trigger: this.props.hideOnClick ? 'hover' : 'hover focus'
    })
    if (this.props.hideOnClick) {
      $(this._childElement).find('button').on('click', () => {
        $(this._childElement).tooltip('hide')
      })
    }
  }

  render () {
    const child = React.Children.only(this.props.children)
    return cloneElementWithCustomRef(child, (e) => { this._childElement = e })
  }

}

Tooltip.propTypes = {
  children: element.isRequired,
  text: string.isRequired,
  placement: string,
  hideOnClick: bool
}

export default Tooltip
