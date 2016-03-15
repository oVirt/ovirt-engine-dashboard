import React, { PropTypes } from 'react'
const { string, element } = PropTypes
import $ from 'jquery'

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
      this.setState({ data: this._transformData({ data }) })
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
    return React.cloneElement(child, { data: this.state.data })
  }

  _transformData ({ data }) {
    // no need to deep clone the data, just modify the object itself
    const newData = data

    ;['cpu', 'memory', 'storage'].forEach((category) => {
      const utilizationData = newData.utilization[category]

      utilizationData.history.forEach((obj) => {
        // SparklineChart works with Date objects on X axis
        obj.date = new Date(obj.date)
      })

      utilizationData.blocks.forEach((obj) => {
        // HeatMap data values should be in range <0, 1>
        obj.value = obj.value / 100
      })

      // sort HeatMap data
      utilizationData.blocks.sort((a, b) => {
        return b.value - a.value
      })

      // compute derived data
      utilizationData.overcommit = (utilizationData.virtualUsed / utilizationData.physicalTotal) * 100
      utilizationData.allocated = (utilizationData.virtualTotal / utilizationData.physicalTotal) * 100

      if (category === 'memory' || category === 'storage') {
        utilizationData.used = (utilizationData.usedAverage * utilizationData.physicalTotal) / 100
        utilizationData.total = utilizationData.physicalTotal

        // transform percentage based history data to physical units
        utilizationData.history.forEach((obj) => {
          obj.value = (obj.value * utilizationData.physicalTotal) / 100
        })
      } else {
        utilizationData.used = utilizationData.usedAverage
        utilizationData.total = 100
      }
    })

    return newData
  }

}

DashboardDataProvider.propTypes = {
  children: element.isRequired,
  url: string.isRequired,
  loading: element.isRequired
}

export default DashboardDataProvider
