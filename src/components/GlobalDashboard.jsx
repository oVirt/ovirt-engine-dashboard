import React, { PropTypes } from 'react'
const { shape, instanceOf, func } = PropTypes
import { searchPrefixes, searchFields, heatMapThresholds, heatMapLegendLabels, storageUnitTable, webadminPlaces } from '../constants'
import getPluginApi from '../plugin-api'
import { msg } from '../intl-messages'
import { formatNumber1D } from '../utils/intl'
import { convertValue } from '../utils/unit-conversion'
import { applySearch } from '../utils/webadmin-search'
import RefreshDataControl from './RefreshDataControl'
import LastUpdatedLabel from './LastUpdatedLabel'
import AggregateStatusCard from './AggregateStatusCard'
import UtilizationTrendCard from './UtilizationTrendCard'
import HeatMap from './patternfly/HeatMap'
import HeatMapLegend from './patternfly/HeatMapLegend'
import AggregateStatusCardHeightMatching from './AggregateStatusCardHeightMatching'
import classNames from 'classnames'

function GlobalDashboard ({ data: { inventory, globalUtilization, heatMapData }, lastUpdated, refreshData }) {
  const storageUtilizationFooterLabel = (used, total, unit) => {
    const { unit: newUnit, value: newUsed } = convertValue(storageUnitTable, unit, used)
    return (
      <div style={{ display: 'inline-block' }}>
        <strong>{formatNumber1D(newUsed)} {newUnit}</strong> Used
      </div>
    )
  }
  const showGlusterCard = inventory.volume.totalCount > 0
  const statusCardClass = classNames('col-xs-4', 'col-sm-4', {
    'col-md-1': showGlusterCard,
    'col-md-2': !showGlusterCard
  })

  return (
    <div className='container-fluid container-tiles-pf containers-dashboard'>

      {/* refresh buttons and last updated information label */}
      <div className='row row-tile-pf'>
        <div className='col-xs-12 global-dashboard-update-column'>
          <RefreshDataControl onRefresh={refreshData} />

          <div style={{ marginLeft: 10 }}>
            <LastUpdatedLabel date={lastUpdated} />
          </div>
        </div>
      </div>

      {/* inventory cards - match height of all of the card's titles and body */}
      <AggregateStatusCardHeightMatching className={classNames('row', 'row-tile-pf', {'seven-cols': showGlusterCard})}>

        <div className={statusCardClass}>
          <AggregateStatusCard
            data={inventory.dc}
            title={msg.statusCardDataCenterTitle()}
            mainIconClass='fa fa-building-o'
            onTotalCountClick={() => {
              getPluginApi().revealPlace(webadminPlaces.dc)
              applySearch(searchPrefixes.dc)
            }}
            onStatusCountClick={(statusItem) => {
              getPluginApi().revealPlace(webadminPlaces.dc)
              applySearch(searchPrefixes.dc, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        <div className={statusCardClass}>
          <AggregateStatusCard
            data={inventory.cluster}
            title={msg.statusCardClusterTitle()}
            mainIconClass='pficon pficon-cluster'
            noStatusText={msg.notAvailableShort()}
            noStatusIconClass=''
            onTotalCountClick={() => {
              getPluginApi().revealPlace(webadminPlaces.cluster)
              applySearch(searchPrefixes.cluster)
            }} />
        </div>

        <div className={statusCardClass}>
          <AggregateStatusCard
            data={inventory.host}
            title={msg.statusCardHostTitle()}
            mainIconClass='pficon pficon-screen'
            onTotalCountClick={() => {
              getPluginApi().revealPlace(webadminPlaces.host)
              applySearch(searchPrefixes.host)
            }}
            onStatusCountClick={(statusItem) => {
              getPluginApi().revealPlace(webadminPlaces.host)
              applySearch(searchPrefixes.host, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        <div className={statusCardClass}>
          <AggregateStatusCard
            data={inventory.storage}
            title={msg.statusCardStorageTitle()}
            mainIconClass='pficon pficon-storage-domain'
            onTotalCountClick={() => {
              getPluginApi().revealPlace(webadminPlaces.storage)
              applySearch(searchPrefixes.storage)
            }}
            onStatusCountClick={(statusItem) => {
              getPluginApi().revealPlace(webadminPlaces.storage)
              applySearch(searchPrefixes.storage, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        {showGlusterCard &&
          <div className={statusCardClass}>
            <AggregateStatusCard
              data={inventory.volume}
              title={msg.statusCardGlusterVolumeTitle()}
              mainIconClass='pficon pficon-volume'
              onTotalCountClick={() => {
                getPluginApi().revealPlace(webadminPlaces.volume)
                applySearch(searchPrefixes.volume)
              }}
              onStatusCountClick={(statusItem) => {
                getPluginApi().revealPlace(webadminPlaces.volume)
                applySearch(searchPrefixes.volume, [{
                  name: searchFields.status,
                  values: statusItem.statusValues
                }])
              }} />
          </div>
        }

        <div className={statusCardClass}>
          <AggregateStatusCard
            data={inventory.vm}
            title={msg.statusCardVmTitle()}
            mainIconClass='pficon pficon-virtual-machine'
            onTotalCountClick={() => {
              getPluginApi().revealPlace(webadminPlaces.vm)
              applySearch(searchPrefixes.vm)
            }}
            onStatusCountClick={(statusItem) => {
              getPluginApi().revealPlace(webadminPlaces.vm)
              applySearch(searchPrefixes.vm, [{
                name: searchFields.status,
                values: statusItem.statusValues
              }])
            }} />
        </div>

        <div className={statusCardClass}>
          <AggregateStatusCard
            data={inventory.event}
            title={msg.statusCardEventTitle()}
            mainIconClass='fa fa-bell'
            onTotalCountClick={() => {
              getPluginApi().revealPlace(webadminPlaces.event)
              applySearch(searchPrefixes.event)
            }}
            onStatusCountClick={(statusItem) => {
              getPluginApi().revealPlace(webadminPlaces.event)
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

      </AggregateStatusCardHeightMatching>

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
                    unit='GiB'
                    utilizationDialogTitle={msg.utilizationCardMemoryDialogTitle()}
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate'
                    utilizationFooterLabel={storageUtilizationFooterLabel} />
                </div>

                <div className='col-xs-12 col-sm-4 col-md-4'>
                  <UtilizationTrendCard
                    data={globalUtilization.storage}
                    title={msg.storageTitle()}
                    unit='TiB'
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
                      <h3 className='heatmap-chart-title'>{msg.cpuTitle()}</h3>
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
                      <h3 className='heatmap-chart-title'>{msg.memoryTitle()}</h3>
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
                      <h3 className='heatmap-chart-title'>{msg.storageTitle()}</h3>
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
    volume: shape(AggregateStatusCard.dataShape),
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
  lastUpdated: instanceOf(Date),
  refreshData: func.isRequired
}

export default GlobalDashboard
