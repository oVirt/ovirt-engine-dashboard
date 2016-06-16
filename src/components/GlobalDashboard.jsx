import React, { PropTypes } from 'react'
const { shape, instanceOf } = PropTypes
import { searchPrefixes, searchFields, heatMapThresholds, heatMapLegendLabels, storageUnitTable } from '../constants'
import { msg } from '../intl-messages'
import { formatNumber1D } from '../utils/intl'
import { convertValue } from '../utils/unit-conversion'
import { applySearch } from '../utils/webadmin-search'
import LastUpdatedLabel from './LastUpdatedLabel'
import AggregateStatusCard from './AggregateStatusCard'
import UtilizationTrendCard from './UtilizationTrendCard'
import HeatMap from './patternfly/HeatMap'
import HeatMapLegend from './patternfly/HeatMapLegend'

function GlobalDashboard ({ data: { inventory, globalUtilization, heatMapData }, lastUpdated }) {
  const storageUtilizationFooterLabel = (used, total, unit) => {
    const { unit: newUnit, value: newUsed } = convertValue(storageUnitTable, unit, used)
    return (
      <div style={{ display: 'inline-block' }}>
        <strong>{formatNumber1D(newUsed)} {newUnit}</strong> Used
      </div>
    )
  }

  return (
    <div className='container-fluid container-tiles-pf containers-dashboard'>

      {/* last updated label */}
      <div className='row row-tile-pf'>
        <p style={{ marginLeft: 10, marginTop: 10 }}>
          <LastUpdatedLabel date={lastUpdated} />
        </p>
      </div>

      {/* inventory cards */}
      <div className='row row-tile-pf'>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.dc}
            title={msg.statusCardDataCenterTitle()}
            mainIconClass='fa fa-globe'
            onTotalCountClick={() => {
              applySearch(searchPrefixes.dc)
            }}
            onStatusCountClick={(statusItem) => {
              applySearch(searchPrefixes.dc, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.cluster}
            title={msg.statusCardClusterTitle()}
            mainIconClass='pficon pficon-cluster'
            noStatusText={msg.notAvailableShort()}
            noStatusIconClass=''
            onTotalCountClick={() => {
              applySearch(searchPrefixes.cluster)
            }} />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.host}
            title={msg.statusCardHostTitle()}
            mainIconClass='pficon pficon-screen'
            onTotalCountClick={() => {
              applySearch(searchPrefixes.host)
            }}
            onStatusCountClick={(statusItem) => {
              applySearch(searchPrefixes.host, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.storage}
            title={msg.statusCardStorageTitle()}
            mainIconClass='pficon pficon-storage-domain'
            onTotalCountClick={() => {
              applySearch(searchPrefixes.storage)
            }}
            onStatusCountClick={(statusItem) => {
              applySearch(searchPrefixes.storage, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.vm}
            title={msg.statusCardVmTitle()}
            mainIconClass='pficon pficon-virtual-machine'
            onTotalCountClick={() => {
              applySearch(searchPrefixes.vm)
            }}
            onStatusCountClick={(statusItem) => {
              applySearch(searchPrefixes.vm, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.event}
            title={msg.statusCardEventTitle()}
            mainIconClass='pficon pficon-flag'
            onTotalCountClick={() => {
              applySearch(searchPrefixes.event)
            }}
            onStatusCountClick={(statusItem) => {
              applySearch(searchPrefixes.event, [{
                name: searchFields.severity,
                values: statusItem.statusValues
              }, {
                name: searchFields.time,
                values: statusItem.searchSince ? [statusItem.searchSince] : [],
                operator: '>'
              }])
            }} />
        </div>

      </div>

      {/* utilization cards */}
      <div className='row row-tile-pf'>
        <div className='col-md-12'>
          <div className='card-pf'>
            <div className='card-pf-heading'>
              <h2 className='card-pf-title'>{msg.globalUtilizationHeading()}</h2>
            </div>
            <div className='card-pf-body'>
              <div className='row'>

                <div className='col-xs-12 col-sm-4 col-md-4'>
                  <UtilizationTrendCard
                    data={globalUtilization.cpu}
                    title={msg.cpuTitle()}
                    unit=''
                    utilizationDialogTitle={msg.utilizationCardCpuDialogTitle()}
                    showValueAsPercentage
                    donutCenterLabel='percent'
                    sparklineTooltipType='percentPerDate'
                    utilizationFooterLabel='percent' />
                </div>

                <div className='col-xs-12 col-sm-4 col-md-4'>
                  <UtilizationTrendCard
                    data={globalUtilization.memory}
                    title={msg.memoryTitle()}
                    unit='GB'
                    utilizationDialogTitle={msg.utilizationCardMemoryDialogTitle()}
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate'
                    utilizationFooterLabel={storageUtilizationFooterLabel} />
                </div>

                <div className='col-xs-12 col-sm-4 col-md-4'>
                  <UtilizationTrendCard
                    data={globalUtilization.storage}
                    title={msg.storageTitle()}
                    unit='TB'
                    utilizationDialogTitle={msg.utilizationCardStorageDialogTitle()}
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate'
                    utilizationFooterLabel={storageUtilizationFooterLabel} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* heat maps */}
      <div className='row row-tile-pf row-tile-pf-last'>
        <div className='col-md-8'>
          <div className='heatmap-card'>
            <div className='card-pf'>
              <div className='card-pf-heading'>
                <h2 className='card-pf-title'>{msg.clusterUtilizationHeading()}</h2>
              </div>
              <div className='card-pf-body'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-12 col-md-12 card-heatmap-body'>

                    <div className='col-xs-12 col-sm-6 col-md-6 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>{msg.cpuTitle()}</span>
                      <HeatMap
                        data={heatMapData.cpu}
                        thresholds={heatMapThresholds}
                        onBlockClick={(dataItem) => {
                          applySearch(searchPrefixes.host, [{
                            name: searchFields.cluster,
                            values: [dataItem.name]
                          }])
                        }} />
                    </div>

                    <div className='col-xs-12 col-sm-6 col-md-6 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>{msg.memoryTitle()}</span>
                      <HeatMap
                        data={heatMapData.memory}
                        thresholds={heatMapThresholds}
                        onBlockClick={(dataItem) => {
                          applySearch(searchPrefixes.host, [{
                            name: searchFields.cluster,
                            values: [dataItem.name]
                          }])
                        }} />
                    </div>

                    <div className='col-xs-12 col-sm-12 col-md-12'>
                      <HeatMapLegend labels={heatMapLegendLabels} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='heatmap-card'>
            <div className='card-pf'>
              <div className='card-pf-heading'>
                <h2 className='card-pf-title'>{msg.storageUtilizationHeading()}</h2>
              </div>
              <div className='card-pf-body'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-12 col-md-12 card-heatmap-body'>

                    <div className='col-xs-12 col-sm-12 col-md-12 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>{msg.storageTitle()}</span>
                      <HeatMap
                        data={heatMapData.storage}
                        thresholds={heatMapThresholds}
                        onBlockClick={(dataItem) => {
                          applySearch(searchPrefixes.storage, [{
                            name: searchFields.name,
                            values: [dataItem.name]
                          }])
                        }} />
                    </div>

                    <div className='col-xs-12 col-sm-12 col-md-12'>
                      <HeatMapLegend labels={heatMapLegendLabels} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

const dataShape = {
  inventory: shape({
    dc: shape(AggregateStatusCard.dataShape),
    cluster: shape(AggregateStatusCard.dataShape),
    host: shape(AggregateStatusCard.dataShape),
    storage: shape(AggregateStatusCard.dataShape),
    vm: shape(AggregateStatusCard.dataShape),
    event: shape(AggregateStatusCard.dataShape)
  }),
  globalUtilization: shape({
    cpu: shape(UtilizationTrendCard.dataShape),
    memory: shape(UtilizationTrendCard.dataShape),
    storage: shape(UtilizationTrendCard.dataShape)
  }),
  heatMapData: shape({
    cpu: HeatMap.propTypes.data,
    memory: HeatMap.propTypes.data,
    storage: HeatMap.propTypes.data
  })
}

GlobalDashboard.propTypes = {
  data: shape(dataShape),
  lastUpdated: instanceOf(Date)
}

export default GlobalDashboard
