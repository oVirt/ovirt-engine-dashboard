import React from 'react'
import DonutPctChart from './DonutPctChart'

function UtilizationCard ({ title, unit, used, total }) {
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
      <DonutPctChart used={used} total={total} />

    </div>
  )
}

UtilizationCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  unit: React.PropTypes.string.isRequired,
  used: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
}

export default UtilizationCard
