import React, {PropTypes} from 'react'
const {string, number} = PropTypes
import DonutPctChart from './DonutPctChart'

function UtilizationCard ({ title, unit, used, total, donutCenterLabel }) {
  return (
    <div className="utilization-chart-pf">

      {/* title */}
      <h3>{title}</h3>

      {/* utilization summary */}
      <div className="current-values">
        <h1 className="available-count pull-left">
          <span>{total - used}</span>
        </h1>
        <div className="available-text pull-left">
          <div><span>Available</span></div>
          <div><span>of {total} {unit}</span></div>
        </div>
      </div>

      {/* percentage chart */}
      <DonutPctChart unit={unit} used={used} total={total} centerLabel={donutCenterLabel} />

    </div>
  )
}

UtilizationCard.propTypes = {
  title: string.isRequired,
  unit: string.isRequired,
  used: number.isRequired,
  total: number.isRequired,
  donutCenterLabel: DonutPctChart.propTypes.centerLabel.isRequired
}

export default UtilizationCard
