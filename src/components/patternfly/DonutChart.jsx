import React, { PropTypes } from 'react'
const { string, number, bool, object, shape, oneOf, func } = PropTypes
import c3 from 'c3'
import d3 from 'd3'
import { msg } from '../../intl_messages'
import { getDefaultDonutConfig } from '../../patternfly_defaults'
import { formatNumber1D } from '../../utils/intl'

// PatternFly reference:
//  https://www.patternfly.org/patterns/donut-chart/

// Angular reference:
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/donut/donut-pct-chart-directive.js
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/donut/donut-pct-chart.html

// TODO(vs) center label is jumpy when hovering its arcs, double-check Angular reference impl.

// TODO(vs) sync with latest Angular impl.

class DonutChart extends React.Component {

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
      <div className='donut-chart-pf' style={this.props.containerStyle} ref={(e) => { this._chartContainer = e }}>
      </div>
    )
  }

  _generateChart ({ used, total, unit, thresholds, centerLabel, onDataClick }) {
    const config = Object.assign({}, getDefaultDonutConfig(), {
      bindto: this._chartContainer,
      data: {
        type: 'donut',
        columns: [
          ['used', used],
          ['available', total - used]
        ],
        names: {
          used: msg.unitUsed({ unit }),
          available: msg.unitAvailable({ unit })
        },
        groups: [
          ['used', 'available']
        ],
        order: null,
        onclick: onDataClick
      },
      color: {
        pattern: this._getDonutChartColorPattern({ used, total, thresholds })
      },
      tooltip: {
        contents (d) {
          const percentUsed = Math.round(d[0].ratio * 100)
          const tooltipText = `${percentUsed}% ${d[0].name}`
          return `<span class='donut-tooltip-pf' style='white-space: nowrap;'>${tooltipText}</span>`
        }
      }
    })

    this._chart = c3.generate(config)
    this._setDonutChartCenterLabel({ used, total, unit, centerLabel })
  }

  _updateChart (props) {
    this._destroyChart()
    this._generateChart(props)
  }

  _destroyChart () {
    this._chart.destroy()
  }

  _getDonutChartColorPattern ({ used, total, thresholds }) {
    const defaultPattern = getDefaultDonutConfig().color.pattern
    if (!thresholds.enabled) {
      return defaultPattern
    }

    const percentUsed = total === 0 ? 0 : used / total * 100
    let color = '#3F9C35'

    if (percentUsed >= thresholds.error) {
      color = '#CC0000'
    } else if (percentUsed >= thresholds.warning) {
      color = '#EC7A08'
    }

    // return new array with first color replaced
    return [color].concat(defaultPattern.slice(1))
  }

  _setDonutChartCenterLabel ({ used, total, unit, centerLabel }) {
    let bigText = ''
    let smallText = ''

    if (centerLabel === 'used') {
      bigText = `${formatNumber1D(used)}`
      smallText = msg.unitUsed({ unit })
    } else if (centerLabel === 'available') {
      bigText = `${formatNumber1D(total - used)}`
      smallText = msg.unitAvailable({ unit })
    } else if (centerLabel === 'percent') {
      bigText = `${Math.round(total === 0 ? 0 : used / total * 100)}%`
      smallText = msg.used()
    }

    const chartTitle = d3.select(this._chartContainer).select('text.c3-chart-arcs-title')
    chartTitle.selectAll('*').remove()
    chartTitle.insert('tspan').text(bigText).classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0)
    chartTitle.insert('tspan').text(smallText).classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0)
  }

}

DonutChart.propTypes = {
  used: number.isRequired,
  total: number.isRequired,
  unit: string.isRequired,
  thresholds: shape({
    enabled: bool,
    warning: number,
    error: number
  }),
  centerLabel: oneOf(['used', 'available', 'percent']),
  containerStyle: object,
  onDataClick: func // (d, element) => void
}

DonutChart.defaultProps = {
  thresholds: {
    enabled: true,
    warning: 60,
    error: 90
  },
  centerLabel: 'used',
  containerStyle: {},
  onDataClick () {}
}

export default DonutChart
