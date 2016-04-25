import React, { PropTypes } from 'react'
const { element } = PropTypes
import $ from 'jquery'
import { PLUGIN_API as api } from '../constants'

class DashboardDataProvider extends React.Component {

  constructor (props) {
    super(props)
    this.state = { data: NO_DATA }
  }

  componentDidMount () {
    const request = this._jqXHR = $.ajax({
      method: 'GET',
      url: `${api.engineBaseUrl()}webadmin/dashboard_data`,
      dataType: 'json',
      headers: {
        'Accept': 'application/json'
        // For testing purposes you can uncomment either of these.
        // 'Prefer': 'fake_data' // returns randomly generated data
        // 'Prefer': 'error'     // triggers HTTP error response
      }
    })

    request.done((data) => {
      this._updateData({ data: this._transformData({ data }) })
    })

    request.fail(() => {
      console.error('Request failed', request)
      this._updateData({ data: DATA_ERROR })
    })
  }

  componentWillUnmount () {
    this._jqXHR.abort()
  }

  render () {
    const child = React.Children.only(this.props.children)

    switch (this.state.data) {
      case NO_DATA:
        return this.props.loading
      case DATA_ERROR:
        return this.props.error
      default:
        return React.cloneElement(child, {
          data: this.state.data,
          lastUpdated: this.state.lastUpdated
        })
    }
  }

  _updateData ({ data }) {
    this.setState({
      data,
      lastUpdated: new Date()
    })
  }

  _transformData ({ data }) {
    // no need to deep clone the data, just modify the object itself
    const newData = data

    const inventoryStatusOrder = ['alert', 'error', 'warning', 'down', 'up']

    ;['dc', 'cluster', 'host', 'storage', 'vm', 'event'].forEach((category) => {
      const inventoryData = newData.inventory[category]

      // sort object statuses
      inventoryData.statuses.sort((a, b) => {
        return inventoryStatusOrder.indexOf(a.type) - inventoryStatusOrder.indexOf(b.type)
      })

      // define additional search constraints for events
      category === 'event' && inventoryData.statuses.forEach((obj) => {
        if (obj.type === 'error' || obj.type === 'warning') {
          obj.searchSince = 'Today'
        }
      })
    })

    ;['cpu', 'memory', 'storage'].forEach((category) => {
      const globalUtilizationData = newData.globalUtilization[category]
      const heatMapData = newData.heatMapData[category]

      globalUtilizationData.history.forEach((obj) => {
        // sparkline chart works with Date objects on X axis
        obj.date = new Date(obj.date)
      })

      heatMapData.forEach((obj) => {
        // heat map component expects values in range <0, 1>
        obj.value = obj.value / 100
      })

      // sort heat map data
      heatMapData.sort((a, b) => {
        return b.value - a.value
      })
    })

    return newData
  }

}

const NO_DATA = null
const DATA_ERROR = 'error'

DashboardDataProvider.propTypes = {
  children: element.isRequired,
  loading: element.isRequired,
  error: element.isRequired
}

export default DashboardDataProvider
