import React, { PropTypes } from 'react'
const { string, number, bool, shape, arrayOf } = PropTypes
import { formatNumber0D, formatNumber1D } from '../utils/formatting'
import DonutChart from './patternfly/DonutChart'
import SparklineChart from './patternfly/SparklineChart'
import ModalDialog from './bootstrap/ModalDialog'
import ObjectUtilizationList from './ObjectUtilizationList'

// PatternFly reference:
//  https://www.patternfly.org/patterns/utilization-trend-card/

// TODO(vs) extract the generic bits into reusable PatternFly component

/*
  TODO(vs) update markup to match the latest PatternFly reference:
  <div class="card-pf card-pf-utilization">
    <h2 class="card-pf-title">Network</h2>
    <div class="card-pf-body">
      <p class="card-pf-utilization-details">
        <span class="card-pf-utilization-card-details-count">200</span>
        <span class="card-pf-utilization-card-details-description">
          <span class="card-pf-utilization-card-details-line-1">Available</span>
          <span class="card-pf-utilization-card-details-line-2">of 1300 Gbps</span>
        </span>
      </p>
      <div id="chart-pf-donut"></div>
      <div class="chart-pf-sparkline" id="chart-pf-sparkline"></div>
    </div>
  </div>
 */

class UtilizationTrendCard extends React.Component {

  render () {
    const {
      data: { used, total, overcommit, allocated, history, overUtilization },
      title, unit, overUtilizationDialogTitle, showValueAsPercentage,
      donutCenterLabel, sparklineTooltipType
    } = this.props

    const available = total - used

    return (
      <div className='utilization-chart-pf'>

        {/* title */}
        <h3>{title}</h3>

        {/* summary */}
        <div className='current-values'>
          <h1 className='available-count pull-left'>
            {showValueAsPercentage ? `${formatNumber0D(available)}%` : formatNumber1D(available)}
          </h1>
          <div className='available-text pull-left'>
            <div>Available</div>
            <div>of {showValueAsPercentage ? `${formatNumber0D(total)}%` : `${formatNumber1D(total)} ${unit}`}</div>
          </div>

          <div style={{ clear: 'left', paddingTop: 5 }}>
            Over commit: {formatNumber0D(overcommit)}% (allocated {formatNumber0D(allocated)}%)
          </div>
        </div>

        {/* donut chart */}
        <DonutChart
          used={used}
          total={total}
          unit={unit}
          centerLabel={donutCenterLabel}
          onDataClick={() => {
            this._overUtilizationDialog.show()
          }} />

        {/* sparkline chart */}
        <SparklineChart
          data={history}
          total={total}
          unit={unit}
          tooltipType={sparklineTooltipType} />

        {/* over-utilization dialog  */}
        <ModalDialog title={overUtilizationDialogTitle} ref={(e) => { this._overUtilizationDialog = e }}>

          {/* hosts */}
          <div className='row row-tile-pf'>
            <div className='col-md-12'>
              <div>Hosts ({overUtilization.hosts.length})</div>
            </div>
          </div>
          <ObjectUtilizationList
            data={overUtilization.hosts}
            emptyListText='There are currently no overutilized hosts' />

          {/* virtual machines */}
          <div className='row row-tile-pf'>
            <div className='col-md-12'>
              <div>Virtual Machines ({overUtilization.vms.length})</div>
            </div>
          </div>
          <ObjectUtilizationList
            data={overUtilization.vms}
            emptyListText='There are currently no overutilized virtual machines' />

        </ModalDialog>

      </div>
    )
  }

}

const dataShape = UtilizationTrendCard.dataShape = {
  used: number,
  total: number,
  overcommit: number,
  allocated: number,
  history: SparklineChart.propTypes.data,
  overUtilization: shape({
    vms: arrayOf(shape(ObjectUtilizationList.dataItemShape)),
    hosts: arrayOf(shape(ObjectUtilizationList.dataItemShape))
  })
}

UtilizationTrendCard.propTypes = {
  data: shape(dataShape).isRequired,
  title: string.isRequired,
  unit: string.isRequired,
  overUtilizationDialogTitle: string.isRequired,
  showValueAsPercentage: bool,
  donutCenterLabel: DonutChart.propTypes.centerLabel,
  sparklineTooltipType: SparklineChart.propTypes.tooltipType
}

UtilizationTrendCard.defaultProps = {
  showValueAsPercentage: false,
  donutCenterLabel: DonutChart.defaultProps.centerLabel,
  sparklineTooltipType: SparklineChart.defaultProps.tooltipType
}

export default UtilizationTrendCard
