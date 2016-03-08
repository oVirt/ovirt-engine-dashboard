import React, { PropTypes } from 'react'
const { string, number } = PropTypes
import { formatNumber1D } from '../utils'
import DonutPctChart from './DonutPctChart'
import SparklineChart from './SparklineChart'

function UtilizationCard ({ title, unit, used, total, history, donutCenterLabel, sparklineTooltipType }) {
  return (
    <div className='utilization-chart-pf'>

      {/* title */}
      <h3>{title}</h3>

      {/* utilization summary */}
      <div className='current-values'>
        <h1 className='available-count pull-left'>
          <span>{formatNumber1D(total - used)}</span>
        </h1>
        <div className='available-text pull-left'>
          <div><span>Available</span></div>
          <div><span>of {formatNumber1D(total)} {unit}</span></div>
        </div>
      </div>

      {/* percentage chart */}
      <DonutPctChart
        unit={unit}
        used={used}
        total={total}
        centerLabel={donutCenterLabel} />

      {/* sparkline chart */}
      <SparklineChart
        unit={unit}
        data={history}
        total={total}
        tooltipType={sparklineTooltipType} />

    </div>
  )
}

UtilizationCard.propTypes = {
  title: string.isRequired,
  unit: string.isRequired,
  used: number.isRequired,
  total: number.isRequired,
  history: SparklineChart.propTypes.data, // implicit isRequired
  donutCenterLabel: DonutPctChart.propTypes.centerLabel.isRequired,
  sparklineTooltipType: SparklineChart.propTypes.tooltipType.isRequired
}

export default UtilizationCard
