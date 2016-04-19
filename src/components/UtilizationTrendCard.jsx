import React, { PropTypes } from 'react'
const { string, number, bool, shape, arrayOf } = PropTypes
import { SEARCH_PREFIXES } from '../constants'
import { formatNumber0D, formatNumber1D } from '../utils/formatting'
import { applySearch } from '../utils/webadmin_search'
import DonutChart from './patternfly/DonutChart'
import SparklineChart from './patternfly/SparklineChart'
import ModalDialog from './bootstrap/ModalDialog'
import ObjectUtilizationList from './ObjectUtilizationList'
import ObjectUtilizationListTitle from './ObjectUtilizationListTitle'

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
      data: { used, total, overcommit, allocated, history, utilization },
      title, unit, utilizationDialogTitle, showValueAsPercentage,
      donutCenterLabel, sparklineTooltipType, utilizationBarFooterLabelFormat
    } = this.props

    const available = total - used
    const thresholds = { enabled: true, warning: 75, error: 90 }

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
          thresholds={thresholds}
          centerLabel={donutCenterLabel}
          onDataClick={() => {
            this._utilizationDialog.show()
          }} />

        {/* sparkline chart */}
        <SparklineChart
          data={history}
          total={total}
          unit={unit}
          tooltipType={sparklineTooltipType} />

        {/* utilization dialog  */}
        <ModalDialog
          title={utilizationDialogTitle}
          modalContainerClass='overutilization-dialog'
          ref={(e) => { this._utilizationDialog = e }}>

          {utilization.hosts &&
            <div>
              <ObjectUtilizationListTitle text={`Hosts (${utilization.hosts.length})`} />
              <ObjectUtilizationList
                data={utilization.hosts}
                unit={unit}
                emptyListText='There are currently no utilized hosts'
                thresholds={thresholds}
                utilizationBarFooterLabelFormat={utilizationBarFooterLabelFormat}
                onObjectNameClick={(dataItem) => {
                  applySearch(SEARCH_PREFIXES.host, 'name', [dataItem.name])
                }} />
            </div>
          }

          {utilization.storage &&
            <div>
              <ObjectUtilizationListTitle text={`Storage Domains (${utilization.storage.length})`} />
              <ObjectUtilizationList
                data={utilization.storage}
                unit={unit}
                emptyListText='There are currently no utilized storage domains'
                thresholds={thresholds}
                utilizationBarFooterLabelFormat={utilizationBarFooterLabelFormat}
                onObjectNameClick={(dataItem) => {
                  applySearch(SEARCH_PREFIXES.storage, 'name', [dataItem.name])
                }} />
            </div>
          }

          {utilization.vms &&
            <div>
              <ObjectUtilizationListTitle text={`Virtual Machines (${utilization.vms.length})`} />
              <ObjectUtilizationList
                data={utilization.vms}
                unit={unit}
                emptyListText='There are currently no utilized virtual machines'
                thresholds={thresholds}
                utilizationBarFooterLabelFormat={utilizationBarFooterLabelFormat}
                onObjectNameClick={(dataItem) => {
                  applySearch(SEARCH_PREFIXES.vm, 'name', [dataItem.name])
                }} />
            </div>
          }

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
  utilization: shape({
    hosts: arrayOf(shape(ObjectUtilizationList.dataItemShape)),
    storage: arrayOf(shape(ObjectUtilizationList.dataItemShape)),
    vms: arrayOf(shape(ObjectUtilizationList.dataItemShape))
  })
}

UtilizationTrendCard.propTypes = {
  data: shape(dataShape).isRequired,
  title: string.isRequired,
  unit: string.isRequired,
  utilizationDialogTitle: string.isRequired,
  showValueAsPercentage: bool,
  donutCenterLabel: DonutChart.propTypes.centerLabel,
  sparklineTooltipType: SparklineChart.propTypes.tooltipType,
  utilizationBarFooterLabelFormat: ObjectUtilizationList.propTypes.utilizationBarFooterLabelFormat
}

UtilizationTrendCard.defaultProps = {
  showValueAsPercentage: false,
  donutCenterLabel: DonutChart.defaultProps.centerLabel,
  sparklineTooltipType: SparklineChart.defaultProps.tooltipType,
  utilizationBarFooterLabelFormat: ObjectUtilizationList.defaultProps.utilizationBarFooterLabelFormat
}

export default UtilizationTrendCard
