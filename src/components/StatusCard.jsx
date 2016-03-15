import React, { PropTypes } from 'react'
const { string, number, shape } = PropTypes

function StatusCard ({ data: { count, up, down, error }, title, iconClass }) {
  return (
    <div className='card-pf card-pf-aggregate-status card-pf-accented'>

      {/* title */}
      <h2 className='card-pf-title'>
        <a href='#'>
          <span className={iconClass} />
          <span className='card-pf-aggregate-status-count'>{count}</span>
          {' '}
          <span className='card-pf-aggregate-status-title'>{title}</span>
        </a>
      </h2>

      {/* status icons */}
      <div className='card-pf-body'>
        <p className='card-pf-aggregate-status-notifications'>
          {up > 0 &&
            <span className='card-pf-aggregate-status-notification'>
              <span><span className='fa fa-arrow-circle-o-up' />{up}</span>
            </span>}
          {down > 0 &&
            <span className='card-pf-aggregate-status-notification'>
              <span><span className='fa fa-arrow-circle-o-down' />{down}</span>
            </span>}
          {error > 0 &&
            <span className='card-pf-aggregate-status-notification'>
              <span><span className='pficon pficon-error-circle-o' />{error}</span>
            </span>}
          {up === 0 && down === 0 && error === 0 &&
            <span className='card-pf-aggregate-status-notification'>
              <span className='pficon pficon-ok' />
            </span>}
        </p>
      </div>

    </div>
  )
}

const dataShape = StatusCard.dataShape = {
  count: number,
  up: number,
  down: number,
  error: number
}

StatusCard.propTypes = {
  data: shape(dataShape).isRequired,
  title: string.isRequired,
  iconClass: string.isRequired
}

export default StatusCard
