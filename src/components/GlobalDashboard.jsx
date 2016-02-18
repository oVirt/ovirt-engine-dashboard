import React from 'react'
import StatusCard from './StatusCard'
import UtilizationCard from './UtilizationCard'

function GlobalDashboard ({ data: { inventory, utilization } }) {
  return (
    <div className="container-fluid container-tiles-pf containers-dashboard">

      {/* inventory */}
      <div className="row row-tile-pf">
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-globe" title="Data Centers" count={inventory.dc.count}
                      errors={inventory.dc.errors} warnings={inventory.dc.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-cubes" title="Clusters" count={inventory.cluster.count}
                      errors={inventory.cluster.errors} warnings={inventory.cluster.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-desktop" title="Hosts" count={inventory.host.count}
                      errors={inventory.host.errors} warnings={inventory.host.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-database" title="Storage Domains" count={inventory.storage.count}
                      errors={inventory.storage.errors} warnings={inventory.storage.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-laptop" title="VMs" count={inventory.vm.count}
                      errors={inventory.vm.errors} warnings={inventory.vm.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="pficon pficon-service" title="Networks" count={inventory.network.count}
                      errors={inventory.network.errors} warnings={inventory.network.warnings} />
        </div>
      </div>

      {/* utilization */}
      <div className="row row-tile-pf">
        <div className="col-md-12">
          <div className="card-pf">
            <div className="card-pf-heading">
              <h2 className="card-pf-title">Global Utilization</h2>
            </div>
            <div className="card-pf-body">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <UtilizationCard title="CPU" unit="Cores" donutCenterLabel="used"
                                   used={utilization.cpu.used} total={utilization.cpu.total} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <UtilizationCard title="Memory" unit="GB" donutCenterLabel="used"
                                   used={utilization.memory.used} total={utilization.memory.total} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <UtilizationCard title="Network" unit="Gbps" donutCenterLabel="available"
                                   used={utilization.network.used} total={utilization.network.total} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <UtilizationCard title="Storage" unit="TB" donutCenterLabel="percent"
                                   used={utilization.storage.used} total={utilization.storage.total} />
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
  data: React.PropTypes.shape({
    inventory: React.PropTypes.objectOf(
      React.PropTypes.shape({
        count: React.PropTypes.number,
        errors: React.PropTypes.number,
        warnings: React.PropTypes.number
      })
    ),
    utilization: React.PropTypes.objectOf(
      React.PropTypes.shape({
        used: React.PropTypes.number,
        total: React.PropTypes.number
      })
    )
  })
}

export default GlobalDashboard
