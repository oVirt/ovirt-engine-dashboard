import React, { PropTypes } from 'react'
const { shape, instanceOf } = PropTypes
import LastUpdatedLabel from './LastUpdatedLabel'
import AggregateStatusCard from './AggregateStatusCard'
import UtilizationTrendCard from './UtilizationTrendCard'
import HeatMap from './patternfly/HeatMap'
import HeatMapLegend from './patternfly/HeatMapLegend'

function GlobalDashboard ({ data: { inventory, globalUtilization, heatMapData }, lastUpdated }) {
  const heatMapThresholds = Object.assign({}, HeatMap.defaultProps.thresholds, {
    domain: [0.65, 0.75, 0.9]
  })

  const heatMapLegendLabels = ['< 65%', '65-75%', '75-90%', '> 90%']

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
            title='Data Centers'
            mainIconClass='fa fa-globe' />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.cluster}
            title='Clusters'
            mainIconClass='pficon pficon-cluster'
            noStatusText='N/A'
            noStatusIconClass='' />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.host}
            title='Hosts'
            mainIconClass='pficon pficon-screen' />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.storage}
            title='Storage Domains'
            mainIconClass='pficon pficon-storage-domain' />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.vm}
            title='VMs'
            mainIconClass='pficon pficon-virtual-machine' />
        </div>

        <div className='col-xs-4 col-sm-4 col-md-2'>
          <AggregateStatusCard
            data={inventory.event}
            title='Events'
            mainIconClass='pficon pficon-flag' />
        </div>

      </div>

      {/* utilization cards */}
      <div className='row row-tile-pf'>
        <div className='col-md-12'>
          <div className='card-pf'>
            <div className='card-pf-heading'>
              <h2 className='card-pf-title'>Global Utilization</h2>
            </div>
            <div className='card-pf-body'>
              <div className='row'>

                <div className='col-xs-12 col-sm-4 col-md-4'>
                  <UtilizationTrendCard
                    data={globalUtilization.cpu}
                    title='CPU'
                    unit=''
                    utilizationDialogTitle='Top Utilized Resources (CPU)'
                    showValueAsPercentage
                    donutCenterLabel='percent'
                    sparklineTooltipType='percentPerDate'
                    utilizationBarFooterLabelFormat='percent' />
                </div>

                <div className='col-xs-12 col-sm-4 col-md-4'>
                  <UtilizationTrendCard
                    data={globalUtilization.memory}
                    title='Memory'
                    unit='GB'
                    utilizationDialogTitle='Top Utilized Resources (Memory)'
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate'
                    utilizationBarFooterLabelFormat='actual' />
                </div>

                <div className='col-xs-12 col-sm-4 col-md-4'>
                  <UtilizationTrendCard
                    data={globalUtilization.storage}
                    title='Storage'
                    unit='TB'
                    utilizationDialogTitle='Top Utilized Resources (Storage)'
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate'
                    utilizationBarFooterLabelFormat='actual' />
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
                <h2 className='card-pf-title'>Cluster Utilization</h2>
              </div>
              <div className='card-pf-body'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-12 col-md-12 card-heatmap-body'>

                    <div className='col-xs-12 col-sm-6 col-md-6 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>CPU</span>
                      <HeatMap
                        data={heatMapData.cpu}
                        thresholds={heatMapThresholds} />
                    </div>

                    <div className='col-xs-12 col-sm-6 col-md-6 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>Memory</span>
                      <HeatMap
                        data={heatMapData.memory}
                        thresholds={heatMapThresholds} />
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
                <h2 className='card-pf-title'>Storage Utilization</h2>
              </div>
              <div className='card-pf-body'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-12 col-md-12 card-heatmap-body'>

                    <div className='col-xs-12 col-sm-12 col-md-12 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>Storage</span>
                      <HeatMap
                        data={heatMapData.storage}
                        thresholds={heatMapThresholds} />
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
