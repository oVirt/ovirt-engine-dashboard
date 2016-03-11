import React, { PropTypes } from 'react'
const { string, number } = PropTypes
import { formatNumber0D } from '../utils/format_utils'
import DonutChart from './patternfly/DonutChart'
import SparklineChart from './patternfly/SparklineChart'

function UtilizationCard ({ title, overcommit, allocated, used, total, history, unit, donutCenterLabel, sparklineTooltipType }) {
  const lastHistoryObj = history[history.length - 1] || {}
  const lastHistoryValue = lastHistoryObj.value || 0
  return (
    <div className='utilization-chart-pf'>

      {/* title */}
      <h3>{title}</h3>

      {/* utilization summary */}
      <div className='current-values'>
        <div className='available-text'>
          Over commit: {formatNumber0D(overcommit)}% (allocated {formatNumber0D(allocated)}%)
        </div>
      </div>

      {/* percentage chart */}
      <DonutChart
        used={used}
        total={total}
        unit={unit}
        centerLabel={donutCenterLabel} />

      {/* sparkline chart with percentage label */}
      <SparklineChart
        data={history}
        total={total}
        unit={unit}
        tooltipType={sparklineTooltipType}
        containerStyle={{width: 360}} />
      <h1 style={{display: 'inline-block', float: 'right', width: 65 }}>
        <span>{formatNumber0D(lastHistoryValue)}%</span>
      </h1>

    </div>
  )
}

UtilizationCard.propTypes = {
  title: string.isRequired,
  overcommit: number.isRequired,
  allocated: number.isRequired,
  used: number.isRequired,
  total: number.isRequired,
  history: SparklineChart.propTypes.data, // implicit isRequired
  unit: string,
  donutCenterLabel: DonutChart.propTypes.centerLabel,
  sparklineTooltipType: SparklineChart.propTypes.tooltipType
}

UtilizationCard.defaultProps = {
  unit: '',
  donutCenterLabel: DonutChart.defaultProps.centerLabel,
  sparklineTooltipType: SparklineChart.defaultProps.tooltipType
}

export default UtilizationCard
