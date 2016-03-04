import React, { PropTypes } from 'react'
const { string, number } = PropTypes

function AggregateStatusCard ({ iconClass, title, count, errors, warnings }) {
  return (
    <div className='card-pf card-pf-aggregate-status card-pf-accented'>

      {/* title */}
      <h2 className='card-pf-title'>
        <a href='#'>
          <span className={iconClass} />
          <span className='card-pf-aggregate-status-count'>{count}</span>
          &nbsp;
          <span className='card-pf-aggregate-status-title'>{title}</span>
        </a>
      </h2>

      {/* status icons */}
      <div className='card-pf-body'>
        <p className='card-pf-aggregate-status-notifications'>
          {errors > 0 &&
            <span className='card-pf-aggregate-status-notification'>
              <span><span className='pficon pficon-error-circle-o' />{errors}</span>
            </span>}
          {warnings > 0 &&
            <span className='card-pf-aggregate-status-notification'>
              <span><span className='pficon pficon-warning-triangle-o' />{warnings}</span>
            </span>}
          {errors === 0 && warnings === 0 &&
            <span className='card-pf-aggregate-status-notification'>
              <span className='pficon pficon-ok' />
            </span>}
        </p>
      </div>

    </div>
  )
}

AggregateStatusCard.propTypes = {
  iconClass: string.isRequired,
  title: string.isRequired,
  count: number.isRequired,
  errors: number.isRequired,
  warnings: number.isRequired
}

export default AggregateStatusCard
