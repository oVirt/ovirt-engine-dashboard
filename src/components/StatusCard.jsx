import React from 'react'

function StatusCard ({ iconClass, title, count, errors, warnings }) {
  return (
    <div className="card-pf card-pf-aggregate-status card-pf-accented">

      {/* title */}
      <h2 className="card-pf-title">
        <a href="#">
          <span className={iconClass}></span>
          <span className="card-pf-aggregate-status-count">{count}</span>
          &nbsp;
          <span className="card-pf-aggregate-status-title">{title}</span>
        </a>
      </h2>

      {/* status icons */}
      <div className="card-pf-body">
        <p className="card-pf-aggregate-status-notifications">
          {errors > 0 &&
            <span className="card-pf-aggregate-status-notification">
              <span><span className="pficon pficon-error-circle-o"></span>{errors}</span>
            </span>}
          {warnings > 0 &&
            <span className="card-pf-aggregate-status-notification">
              <span><span className="pficon pficon-warning-triangle-o"></span>{warnings}</span>
            </span>}
          {errors === 0 && warnings === 0 &&
            <span className="card-pf-aggregate-status-notification">
              <span className="pficon pficon-ok"></span>
            </span>}
        </p>
      </div>

    </div>
  )
}

StatusCard.propTypes = {
  iconClass: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  count: React.PropTypes.number.isRequired,
  errors: React.PropTypes.number.isRequired,
  warnings: React.PropTypes.number.isRequired
}

export default StatusCard
