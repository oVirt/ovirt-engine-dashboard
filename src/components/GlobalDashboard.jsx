import React, { PropTypes } from 'react'
const { number, shape, objectOf } = PropTypes
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
            count={inventory.dc.count}
            errors={inventory.dc.errors}
            warnings={inventory.dc.warnings} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-cubes'
            title='Clusters'
            count={inventory.cluster.count}
            errors={inventory.cluster.errors}
            warnings={inventory.cluster.warnings} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-desktop'
            title='Hosts'
            count={inventory.host.count}
            errors={inventory.host.errors}
            warnings={inventory.host.warnings} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-database'
            title='Storage Domains'
            count={inventory.storage.count}
            errors={inventory.storage.errors}
            warnings={inventory.storage.warnings} />
        </div>

        <div className='col-xs-6 col-sm-6 col-md-2'>
          <StatusCard
            iconClass='fa fa-laptop'
            title='VMs'
            count={inventory.vm.count}
            errors={inventory.vm.errors}
            warnings={inventory.vm.warnings} />
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
                    overcommit={utilization.cpu.overcommit}
                    allocated={utilization.cpu.allocated}
                    used={utilization.cpu.used}
                    total={utilization.cpu.total}
                    history={utilization.cpu.history}
                    donutCenterLabel='percentWithoutUnit'
                    sparklineTooltipType='percent' />
                </div>

                <div className='col-xs-12 col-sm-6 col-md-3'>
                  <UtilizationCard
                    title='Memory'
                    overcommit={utilization.memory.overcommit}
                    allocated={utilization.memory.allocated}
                    used={utilization.memory.used}
                    total={utilization.memory.total}
                    history={utilization.memory.history}
                    unit='GB'
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate' />
                </div>

                <div className='col-xs-12 col-sm-6 col-md-3'>
                  <UtilizationCard
                    title='Storage'
                    overcommit={utilization.storage.overcommit}
                    allocated={utilization.storage.allocated}
                    used={utilization.storage.used}
                    total={utilization.storage.total}
                    history={utilization.storage.history}
                    unit='TB'
                    donutCenterLabel='used'
                    sparklineTooltipType='valuePerDate' />
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

GlobalDashboard.propTypes = {
  data: shape({
    inventory: objectOf(shape({
      count: number,
      errors: number,
      warnings: number
    })).isRequired,
    utilization: objectOf(shape({
      used: number,
      total: number,
      nodes: HeatMap.propTypes.data
    })).isRequired
  })
}

export default GlobalDashboard
