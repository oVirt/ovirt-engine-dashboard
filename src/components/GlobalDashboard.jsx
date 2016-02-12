import React from 'react'

export default function GlobalDashboard () {
  return (
    <div className="container-fluid container-tiles-pf containers-dashboard">
      <div className="row row-tile-pf">
        <div className="col-xs-6 col-sm-6 col-md-2">

          {/* card component */}
          <div>
            <div className="card-pf card-pf-aggregate-status card-pf-accented">
              <h2 className="card-pf-title">
                <a href="#">
                  <span className="fa fa-desktop"></span>
                  <span className="card-pf-aggregate-status-count">75</span>
                  <span className="card-pf-aggregate-status-title">Hosts</span>
                </a>
              </h2>
              <div className="card-pf-body">
                <p className="card-pf-aggregate-status-notifications">
                  <span className="card-pf-aggregate-status-notification">
                    <span><span className="pficon pficon-error-circle-o"></span>1</span>
                  </span>
                  <span className="card-pf-aggregate-status-notification">
                    <span><span className="pficon pficon-warning-triangle-o"></span>15</span>
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
