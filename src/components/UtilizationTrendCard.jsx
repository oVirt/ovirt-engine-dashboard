import React, { PropTypes } from 'react'
const { string, number, bool, shape, arrayOf } = PropTypes
import { searchPrefixes, searchFields } from '../constants'
import { msg } from '../intl-messages'
import { formatNumber0D, formatNumber1D } from '../utils/intl'
import { applySearch } from '../utils/webadmin-search'
import DonutChart from './patternfly/DonutChart'
import SparklineChart from './patternfly/SparklineChart'
import ModalDialog from './bootstrap/ModalDialog'
import RenderInto from './helper/RenderInto'
import ObjectUtilizationList from './ObjectUtilizationList'
import ObjectUtilizationListTitle from './ObjectUtilizationListTitle'

// PatternFly reference:
//  https://www.patternfly.org/patterns/utilization-trend-card/

// TODO(vs) extract the generic bits into reusable component

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
      donutCenterLabel, sparklineTooltipType, utilizationFooterLabel
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
            <div>{msg.available()}</div>
            <div>
              {showValueAsPercentage
                ? msg.utilizationCardAvailableOfPercent({ total: formatNumber0D(total) })
                : msg.utilizationCardAvailableOfUnit({ total: formatNumber1D(total), unit })
              }
            </div>
          </div>

          <div style={{ clear: 'left', paddingTop: 5 }}>
            {msg.utilizationCardOverCommit({
              overcommit: formatNumber0D(overcommit),
              allocated: formatNumber0D(allocated)
            })}
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
        <RenderInto targetElement={window.document.body}>
          <ModalDialog
            title={utilizationDialogTitle}
            modalContainerClass='overutilization-dialog'
            ref={(e) => { this._utilizationDialog = e }}>

            {utilization.hosts &&
              <div>
                <ObjectUtilizationListTitle text={msg.utilizationCardDialogHostListTitle({
                  hostCount: utilization.hosts.length
                })} />
                <ObjectUtilizationList
                  data={utilization.hosts}
                  unit={unit}
                  emptyListText={msg.utilizationCardDialogEmptyHostList()}
                  thresholds={thresholds}
                  utilizationFooterLabel={utilizationFooterLabel}
                  onObjectNameClick={(dataItem) => {
                    applySearch(searchPrefixes.host, [{
                      name: searchFields.name,
                      values: [dataItem.name]
                    }])
                  }} />
              </div>
            }

            {utilization.storage &&
              <div>
                <ObjectUtilizationListTitle text={msg.utilizationCardDialogStorageListTitle({
                  storageCount: utilization.storage.length
                })} />
                <ObjectUtilizationList
                  data={utilization.storage}
                  unit={unit}
                  emptyListText={msg.utilizationCardDialogEmptyStorageList()}
                  thresholds={thresholds}
                  utilizationFooterLabel={utilizationFooterLabel}
                  onObjectNameClick={(dataItem) => {
                    applySearch(searchPrefixes.storage, [{
                      name: searchFields.name,
                      values: [dataItem.name]
                    }])
                  }} />
              </div>
            }

            {utilization.vms &&
              <div>
                <ObjectUtilizationListTitle text={msg.utilizationCardDialogVmListTitle({
                  vmCount: utilization.vms.length
                })} />
                <ObjectUtilizationList
                  data={utilization.vms}
                  unit={unit}
                  emptyListText={msg.utilizationCardDialogEmptyVmList()}
                  thresholds={thresholds}
                  utilizationFooterLabel={utilizationFooterLabel}
                  onObjectNameClick={(dataItem) => {
                    applySearch(searchPrefixes.vm, [{
                      name: searchFields.name,
                      values: [dataItem.name]
                    }])
                  }} />
              </div>
            }

          </ModalDialog>
        </RenderInto>

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
  utilizationFooterLabel: ObjectUtilizationList.propTypes.utilizationFooterLabel
}

UtilizationTrendCard.defaultProps = {
  showValueAsPercentage: false,
  donutCenterLabel: DonutChart.defaultProps.centerLabel,
  sparklineTooltipType: SparklineChart.defaultProps.tooltipType,
  utilizationFooterLabel: ObjectUtilizationList.defaultProps.utilizationFooterLabel
}

export default UtilizationTrendCard
