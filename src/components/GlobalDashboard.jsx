import React from 'react'
import StatusCard from './StatusCard'
import UtilizationCard from './UtilizationCard'

const data = {
  inventory: {
    dc: {
      count: 2,
      errors: 1,
      warnings: 0
    },
    cluster: {
      count: 10,
      errors: 1,
      warnings: 0
    },
    host: {
      count: 75,
      errors: 1,
      warnings: 15
    },
    storage: {
      count: 10,
      errors: 1,
      warnings: 0
    },
    vm: {
      count: 200,
      errors: 0,
      warnings: 0
    },
    network: {
      count: 2500,
      errors: 1,
      warnings: 0
    }
  },
  utilization: {
    cpu: {
      used: 11,
      total: 12
    },
    memory: {
      used: 176,
      total: 432
    },
    network: {
      used: 1100,
      total: 1300
    },
    storage: {
      used: 1.1,
      total: 1.6
    }
  }
}

export default function () {
  return (
    <div className="container-fluid container-tiles-pf containers-dashboard">

      {/* inventory */}
      <div className="row row-tile-pf">
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-globe" title="Data Centers" count={data.inventory.dc.count}
                      errors={data.inventory.dc.errors} warnings={data.inventory.dc.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-cubes" title="Clusters" count={data.inventory.cluster.count}
                      errors={data.inventory.cluster.errors} warnings={data.inventory.cluster.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-desktop" title="Hosts" count={data.inventory.host.count}
                      errors={data.inventory.host.errors} warnings={data.inventory.host.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-database" title="Storage Domains" count={data.inventory.storage.count}
                      errors={data.inventory.storage.errors} warnings={data.inventory.storage.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="fa fa-laptop" title="VMs" count={data.inventory.vm.count}
                      errors={data.inventory.vm.errors} warnings={data.inventory.vm.warnings} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-2">
          <StatusCard iconClass="pficon pficon-service" title="Networks" count={data.inventory.network.count}
                      errors={data.inventory.network.errors} warnings={data.inventory.network.warnings} />
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
                  <UtilizationCard title="CPU" unit="Cores"
                                   used={data.utilization.cpu.used} total={data.utilization.cpu.total} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <UtilizationCard title="Memory" unit="GB"
                                   used={data.utilization.memory.used} total={data.utilization.memory.total} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <UtilizationCard title="Network" unit="Gbps"
                                   used={data.utilization.network.used} total={data.utilization.network.total} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <UtilizationCard title="Storage" unit="TB"
                                   used={data.utilization.storage.used} total={data.utilization.storage.total} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
