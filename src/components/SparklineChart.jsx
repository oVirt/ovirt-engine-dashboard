import React, { PropTypes } from 'react'
const { string, number, bool, shape, arrayOf, oneOf, instanceOf } = PropTypes
import c3 from 'c3'
import { getDefaultSparklineConfig } from '../compat/patternfly_defaults'

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
      <div className='sparkline-chart'>
        <div ref={(e) => { this._chartContainer = e }}></div>
      </div>
    )
  }

  _generateChart ({ unit, data, total, showXAxis, showYAxis, tooltipType }) {
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
        }
      }
    })

    // default tooltip provided via getDefaultSparklineConfig
    if (tooltipType !== 'default') {
      config.tooltip.contents = (d) => {
        return this._getSparklineChartTooltipHTML({ d, total, tooltipType })
      }
    }

    this._chart = c3.generate(config)
  }

  _updateChart (props) {
    this._destroyChart()
    this._generateChart(props)
  }

  _destroyChart () {
    this._chart.destroy()
  }

  _getSparklineChartTooltipHTML ({ d, total, tooltipType }) {
    const percentUsed = Math.round(d[0].value / total * 100)

    function getTooltipTableHTML (tipRows) {
      return `<div class='module-triangle-bottom'><table class='c3-tooltip'><tbody>${tipRows}</tbody></table></div>`
    }

    switch (tooltipType) {
      case 'percent':
        return getTooltipTableHTML(
          `<tr><td class='name'>${percentUsed}%</td></tr>`
        )
      case 'valuePerDay':
        return getTooltipTableHTML(
          `<tr><td class='value'>${d[0].x.toLocaleDateString()}</td><td class='value text-nowrap'>${d[0].value} ${d[0].name}</td></tr>`
        )
      case 'usagePerDay':
        return getTooltipTableHTML(
          `<tr><th colspan='2'>${d[0].x.toLocaleDateString()}</th></tr>` +
          `<tr><td class='name'>${percentUsed}%:</td><td class='value text-nowrap'>${d[0].value} ${d[0].name}</td></tr>`
        )
    }
  }

}

SparklineChart.propTypes = {
  unit: string.isRequired,
  data: arrayOf(shape({
    value: number,
    date: instanceOf(Date)
  })).isRequired,
  total: number.isRequired,
  showXAxis: bool,
  showYAxis: bool,
  tooltipType: oneOf(['default', 'percent', 'valuePerDay', 'usagePerDay'])
}

SparklineChart.defaultProps = {
  showXAxis: false,
  showYAxis: false,
  tooltipType: 'default'
}

export default SparklineChart
