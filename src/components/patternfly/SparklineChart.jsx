import React, { PropTypes } from 'react'
const { string, number, bool, object, shape, arrayOf, oneOf, instanceOf } = PropTypes
import c3 from 'c3'
import { getDefaultSparklineConfig } from '../../patternfly_defaults'
import { addFormatNumberProp, addFormatDateProp } from '../../utils/component_utils'
import { formatNumber1D, formatDateTime } from '../../utils/format_utils'

// Angular reference:
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/sparkline/sparkline-chart.directive.js
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/sparkline/sparkline-chart.html

class SparklineChart extends React.Component {

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
      <div className='sparkline-chart' style={this.props.containerStyle} ref={(e) => { this._chartContainer = e }}>
      </div>
    )
  }

  _generateChart ({ data, total, unit, showXAxis, showYAxis, tooltipType, formatNumber, formatDate }) {
    const config = Object.assign({}, getDefaultSparklineConfig(), {
      bindto: this._chartContainer,
      data: {
        type: 'area',
        columns: [
          ['date'].concat(data.map((obj) => {
            return obj.date
          })),
          ['used'].concat(data.map((obj) => {
            return obj.value
          }))
        ],
        names: {
          date: 'Date',
          used: `${unit} Used`
        },
        x: 'date'
      },
      axis: {
        x: {
          show: showXAxis,
          type: 'timeseries',
          tick: {
            format () {
              return ''
            }
          }
        },
        y: {
          show: showYAxis,
          tick: {
            format () {
              return ''
            }
          }
        }
      },
      tooltip: {
        position: (d, width, height, element) => {
          try {
            const center = parseInt(element.getAttribute('x'))
            const top = parseInt(element.getAttribute('y'))
            const chartBox = this._chartContainer.getBoundingClientRect()
            const graphOffsetX = this._chartContainer.querySelector('g.c3-axis-y').getBoundingClientRect().right
            const x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2))

            return {
              top: top - height,
              left: Math.min(x, chartBox.width - width)
            }
          } catch (e) {
            console.warn('Error while computing tooltip position', e)
          }
        },
        contents: (d) => {
          return this._getSparklineChartTooltipHTML({ d, total, tooltipType, formatNumber, formatDate })
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

  _getSparklineChartTooltipHTML ({ d, total, tooltipType, formatNumber, formatDate }) {
    const percentUsed = Math.round(d[0].value / total * 100)

    function getTooltipTableHTML (tipRows) {
      return `<div class='module-triangle-bottom'><table class='c3-tooltip'><tbody>${tipRows}</tbody></table></div>`
    }

    switch (tooltipType) {
      case 'percent':
        return getTooltipTableHTML(
          `<tr><td class='name'>${percentUsed}%</td></tr>`
        )
      case 'valuePerDate':
        return getTooltipTableHTML(
          `<tr><td class='value'>${formatDate(d[0].x)}</td><td class='value text-nowrap'>${formatNumber(d[0].value)} ${d[0].name}</td></tr>`
        )
      case 'usagePerDate':
        return getTooltipTableHTML(
          `<tr><th colspan='2'>${formatDate(d[0].x)}</th></tr>` +
          `<tr><td class='name'>${percentUsed}%:</td><td class='value text-nowrap'>${formatNumber(d[0].value)} ${d[0].name}</td></tr>`
        )
      default:
        return `<span class='c3-tooltip-sparkline'>${formatNumber(d[0].value)} ${d[0].name}</span>`
    }
  }

}

SparklineChart.propTypes = {
  data: arrayOf(shape({
    value: number,
    date: instanceOf(Date)
  })).isRequired,
  total: number.isRequired,
  unit: string.isRequired,
  showXAxis: bool,
  showYAxis: bool,
  tooltipType: oneOf(['default', 'percent', 'valuePerDate', 'usagePerDate']),
  containerStyle: object
}

SparklineChart.defaultProps = {
  showXAxis: false,
  showYAxis: false,
  tooltipType: 'default',
  containerStyle: {}
}

addFormatNumberProp(SparklineChart, formatNumber1D)
addFormatDateProp(SparklineChart, formatDateTime)

export default SparklineChart
