import React, { PropTypes } from 'react'
const { string, number, shape, arrayOf, func } = PropTypes
import { formatNumber0D } from '../utils/formatting'
import Tooltip from './bootstrap/Tooltip'

// PatternFly reference:
//  https://www.patternfly.org/patterns/aggregate-status-card/

// TODO(vs) extract the generic bits into reusable component

function AggregateStatusCard ({
    data: { totalCount, statuses },
    title, mainIconClass, statusTypeToText, statusTypeToIconClass,
    noStatusText, noStatusIconClass, onTotalCountClick, onStatusCountClick
  }) {
  function getStatusItemTooltip (statusItem) {
    return `${statusTypeToText(statusItem.type)}: ${formatNumber0D(statusItem.count)}`
  }

  return (
    <div className='card-pf card-pf-aggregate-status card-pf-accented'>

      {/* header */}
      <h2 className='card-pf-title'>
        <span className={mainIconClass} />
        <a href='#' onClick={(event) => {
          event.preventDefault()
          onTotalCountClick()
        }}>
          <span className='card-pf-aggregate-status-count'>{formatNumber0D(totalCount)}</span>
          {' '}
          <span className='card-pf-aggregate-status-title'>{title.toUpperCase()}</span>
        </a>
      </h2>

      {/* status icons */}
      <div className='card-pf-body'>
        <p className='card-pf-aggregate-status-notifications'>

          {statuses.map((statusItem) => (
            <span className='card-pf-aggregate-status-notification' key={statusItem.type}>
              <span className={statusTypeToIconClass(statusItem.type)} />
              <Tooltip text={getStatusItemTooltip(statusItem)}>
                <a href='#' onClick={(event) => {
                  event.preventDefault()
                  onStatusCountClick(statusItem)
                }}>{formatNumber0D(statusItem.count)}</a>
              </Tooltip>
            </span>
          ))}

          {statuses.length === 0 &&
            <span className='card-pf-aggregate-status-notification'>
              {noStatusIconClass && <span className={noStatusIconClass} />}
              {noStatusText}
            </span>
          }

        </p>
      </div>

    </div>
  )
}

const statusTypeInfo = {
  up: {
    text: 'Up',
    iconClass: 'fa fa-arrow-circle-o-up'
  },
  down: {
    text: 'Down',
    iconClass: 'fa fa-arrow-circle-o-down'
  },
  error: {
    text: 'Error',
    iconClass: 'pficon pficon-error-circle-o'
  },
  warning: {
    text: 'Warning',
    iconClass: 'pficon pficon-warning-triangle-o'
  },
  alert: {
    text: 'Alert',
    iconClass: 'fa fa-bell'
  }
}

const dataShape = AggregateStatusCard.dataShape = {
  totalCount: number,
  statuses: arrayOf(shape({
    type: string, // should be unique within the array
    count: number
  }))
}

AggregateStatusCard.propTypes = {
  data: shape(dataShape).isRequired,
  title: string.isRequired,
  mainIconClass: string.isRequired,
  statusTypeToText: func,      // (statusType:string) => string
  statusTypeToIconClass: func, // (statusType:string) => string
  noStatusText: string,
  noStatusIconClass: string,
  onTotalCountClick: func,     // () => void
  onStatusCountClick: func     // (statusItem:object) => void
}

AggregateStatusCard.defaultProps = {
  statusTypeToText (statusType) {
    return statusTypeInfo[statusType] ? statusTypeInfo[statusType].text : 'Unknown status'
  },
  statusTypeToIconClass (statusType) {
    return statusTypeInfo[statusType] ? statusTypeInfo[statusType].iconClass : 'fa fa-question'
  },
  noStatusText: '',
  noStatusIconClass: 'pficon pficon-ok',
  onTotalCountClick () {},
  onStatusCountClick () {}
}

export default AggregateStatusCard
