import React, { PropTypes } from 'react'
const { string, number, shape } = PropTypes
import { formatNumber0D } from '../utils/format_utils'
import DonutChart from './patternfly/DonutChart'
import SparklineChart from './patternfly/SparklineChart'

function UtilizationCard ({ data: { overcommit, allocated, used, total, history }, title, unit, donutCenterLabel, sparklineTooltipType }) {
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

      {/* sparkline chart */}
      <SparklineChart
        data={history}
        total={total}
        unit={unit}
        tooltipType={sparklineTooltipType} />

    </div>
  )
}

const dataShape = UtilizationCard.dataShape = {
  overcommit: number,
  allocated: number,
  used: number,
  total: number,
  history: SparklineChart.propTypes.data
}

UtilizationCard.propTypes = {
  data: shape(dataShape).isRequired,
  title: string.isRequired,
  unit: string.isRequired,
  donutCenterLabel: DonutChart.propTypes.centerLabel,
  sparklineTooltipType: SparklineChart.propTypes.tooltipType
}

UtilizationCard.defaultProps = {
  donutCenterLabel: DonutChart.defaultProps.centerLabel,
  sparklineTooltipType: SparklineChart.defaultProps.tooltipType
}

export default UtilizationCard
