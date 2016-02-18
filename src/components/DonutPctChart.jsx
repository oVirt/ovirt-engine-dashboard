import React from 'react'
import c3 from 'c3'
import { getDefaultDonutConfig } from '../patternfly_defaults'

// Angular reference:
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/donut/donut-pct-chart-directive.js
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/donut/donut-pct-chart.html

class DonutPctChart extends React.Component {

  constructor (props) {
    super(props)
    this._chart = null
    this._chartContainer = null
  }

  componentDidMount () {
    this._generateChart(this.props)
  }

  componentWillReceiveProps (newProps) {
    this._updateChart(newProps)
  }

  componentWillUnmount () {
    this._destroyChart()
  }

  render () {
    return (
      <div className="donut-chart-pf">
        <div ref={(e) => this._chartContainer = e}></div>
      </div>
    )
  }

  _generateChart ({ unit, used, total, threshold, centerLabel }) {
    const available = total - used

    // TODO unused for now
    function getCenterLabelText () {
      switch (centerLabel) {
        case 'used':
          return {
            bigText: `${used}`,
            smText: `${unit} Used`
          }
        case 'available':
          return {
            bigText: `${available}`,
            smText: `${unit} Available`
          }
        case 'percent':
          return {
            bigText: `${Math.round(used / total * 100.0)} %`,
            smText: `of ${total} ${unit}`
          }
        case 'none':
          return {
            bigText: '',
            smText: ''
          }
      }
    }

    const config = Object.assign({}, getDefaultDonutConfig(), {
      bindto: this._chartContainer,
      data: {
        type: 'donut',
        columns: [
          ['used', used],
          ['available', available]
        ],
        names: {
          used: 'Used',
          available: 'Available'
        },
        groups: [
          ['used', 'available']
        ],
        order: null
      },
      color: {
        pattern: this._getDonutChartColorPattern({ used, total, threshold })
      },
      tooltip: {
        contents (data) {
          const percentUsed = Math.round(data[0].ratio * 100)
          const tooltipText = `${percentUsed} % ${unit} ${data[0].name}`
          return `<span class="donut-tooltip-pf" style="white-space: nowrap;">${tooltipText}</span>`
        }
      }
    })

    this._chart = c3.generate(config)
  }

  _updateChart (props) {
    this._destroyChart()
    this._generateChart(props)
  }

  _destroyChart () {
    this._chart.destroy()
  }

  _getDonutChartColorPattern ({ used, total, threshold }) {
    const defaultPattern = getDefaultDonutConfig().color.pattern
    if (!threshold.enabled) {
      return defaultPattern
    }

    const percentUsed = used / total * 100.0
    let color = '#3F9C35'

    if (percentUsed >= threshold.error) {
      color = '#CC0000'
    } else if (percentUsed >= threshold.warning) {
      color = '#EC7A08'
    }

    // return new array with first color replaced
    return [color].concat(defaultPattern.slice(1))
  }

}

DonutPctChart.propTypes = {
  unit: React.PropTypes.string.isRequired,
  used: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
  threshold: React.PropTypes.shape({
    enabled: React.PropTypes.bool,
    warning: React.PropTypes.number,
    error: React.PropTypes.number
  }),
  centerLabel: React.PropTypes.oneOf(['used', 'available', 'percent', 'none'])
}

DonutPctChart.defaultProps = {
  threshold: {
    enabled: true,
    warning: 60,
    error: 90
  },
  centerLabel: 'used'
}

export default DonutPctChart
