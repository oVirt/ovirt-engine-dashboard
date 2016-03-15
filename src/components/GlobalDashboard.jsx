import React, { PropTypes } from 'react'
const { shape } = PropTypes
import StatusCard from './StatusCard'
import UtilizationCard from './UtilizationCard'
import HeatMap from './patternfly/HeatMap'
import HeatMapLegend from './patternfly/HeatMapLegend'

function GlobalDashboard ({ data: { inventory, utilization } }) {
  return (
    <div className='container-fluid container-tiles-pf containers-dashboard'>

      {/* inventory cards */}
      <div className='row row-tile-pf'>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-globe'
            title='Data Centers'
            data={inventory.dc} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-cubes'
            title='Clusters'
            data={inventory.cluster} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-desktop'
            title='Hosts'
            data={inventory.host} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-database'
            title='Storage Domains'
            data={inventory.storage} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-laptop'
            title='VMs'
            data={inventory.vm} />
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

                <div className='col-xs-12 col-sm-6 col-md-3'>
                  <UtilizationCard
                    title='CPU'
                    unit=''
                    donutCenterLabel='percentUsed'
                    sparklineTooltipType='percent'
                    data={utilization.cpu} />
                </div>

                <div className='col-xs-12 col-sm-6 col-md-3'>
                  <UtilizationCard
                    title='Memory'
                    unit='GB'
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate'
                    data={utilization.memory} />
                </div>

                <div className='col-xs-12 col-sm-6 col-md-3'>
                  <UtilizationCard
                    title='Storage'
                    unit='TB'
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate'
                    data={utilization.storage} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* utilization heat maps */}
      <div className='row row-tile-pf row-tile-pf-last'>
        <div className='col-md-12'>
          <div className='heatmap-card'>
            <div className='card-pf'>
              <div className='card-pf-heading'>
                <h2 className='card-pf-title'>Cluster Utilization</h2>
              </div>
              <div className='card-pf-body'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-12 col-md-12 card-heatmap-body'>

                    <div className='col-xs-6 col-sm-6 col-md-3 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>CPU</span>
                      <HeatMap
                        data={utilization.cpu.blocks} />
                    </div>

                    <div className='col-xs-6 col-sm-6 col-md-3 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>Memory</span>
                      <HeatMap
                        data={utilization.memory.blocks} />
                    </div>

                    <div className='col-xs-6 col-sm-6 col-md-3 container-heatmap-tile'>
                      <span className='h3 heatmap-chart-title'>Storage</span>
                      <HeatMap
                        data={utilization.storage.blocks} />
                    </div>

                    <div className='col-xs-16 col-sm-8 col-md-8'>
                      <HeatMapLegend />
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

const utilizationItemDataShape = Object.assign({}, UtilizationCard.dataShape, {
  blocks: HeatMap.propTypes.data
})

const dataShape = {
  inventory: shape({
    dc: shape(StatusCard.dataShape),
    cluster: shape(StatusCard.dataShape),
    host: shape(StatusCard.dataShape),
    storage: shape(StatusCard.dataShape),
    vm: shape(StatusCard.dataShape)
  }),
  utilization: shape({
    cpu: shape(utilizationItemDataShape),
    memory: shape(utilizationItemDataShape),
    storage: shape(utilizationItemDataShape)
  })
}

GlobalDashboard.propTypes = {
  data: shape(dataShape).isRequired
}

export default GlobalDashboard
