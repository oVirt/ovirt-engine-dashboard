import React, { PropTypes } from 'react'
const { string, element } = PropTypes
import $ from 'jquery'
import GlobalDashboard from './GlobalDashboard'

class DashboardDataProvider extends React.Component {

  constructor (props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount () {
    const request = this._jqXHR = $.ajax({
      method: 'GET',
      url: this.props.url,
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Prefer': 'fake_data'
      }
    })

    request.done((data) => {
      this.setState({ data })
    })

    request.fail(() => {
      console.error(`Request failed with status code ${request.statusCode()}`)
    })
  }

  componentWillUnmount () {
    this._jqXHR.abort()
  }

  render () {
    if (this.state.data === null) {
      return this.props.loading
    }

    const child = React.Children.only(this.props.children)

    if (child.type === GlobalDashboard) {
      return React.cloneElement(child, { data: this.state.data })
    }

    __DEV__ && console.error('Unsupported child type', child)
    return false
  }

}

DashboardDataProvider.propTypes = {
  children: element.isRequired,
  url: string.isRequired,
  loading: element.isRequired
}

export default DashboardDataProvider
