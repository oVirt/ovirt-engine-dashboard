import React, { PropTypes } from 'react'
const { element } = PropTypes
import $ from 'jquery'
import { PLUGIN_API as api } from '../constants'

class DashboardDataProvider extends React.Component {

  constructor (props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount () {
    const request = this._jqXHR = $.ajax({
      method: 'GET',
      url: `${api.engineBaseUrl()}webadmin/dashboard_data`,
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Prefer': 'fake_data' // TODO(vs) send 'error' occasionally
      }
    })

    request.done((data) => {
      this.setState({
        data: this._transformData({ data }),
        lastUpdated: new Date()
      })
    })

    request.fail(() => {
      console.error('Request failed', request)
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

    return React.cloneElement(child, {
      data: this.state.data,
      lastUpdated: this.state.lastUpdated
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
    })

    ;['cpu', 'memory', 'storage'].forEach((category) => {
      const globalUtilizationData = newData.globalUtilization[category]
      const clusterUtilizationData = newData.clusterUtilization[category]

      globalUtilizationData.history.forEach((obj) => {
        // sparkline chart works with Date objects on X axis
        obj.date = new Date(obj.date)
      })

      clusterUtilizationData.blocks.forEach((obj) => {
        // heat map component expects values in range <0, 1>
        obj.value = obj.value / 100
      })

      // sort heat map data
      clusterUtilizationData.blocks.sort((a, b) => {
        return b.value - a.value
      })
    })

    return newData
  }

}

DashboardDataProvider.propTypes = {
  children: element.isRequired,
  loading: element.isRequired
}

export default DashboardDataProvider
