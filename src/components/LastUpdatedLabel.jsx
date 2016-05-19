import React, { PropTypes } from 'react'
const { instanceOf } = PropTypes
import { msg } from '../intl_messages'
import { formatDateTime } from '../utils/intl'

function LastUpdatedLabel ({ date }) {
  return (
    <span>
      <span className='fa fa-clock-o' /> <b>{msg.lastUpdated()}</b> {formatDateTime(date)}
    </span>
  )
}

LastUpdatedLabel.propTypes = {
  date: instanceOf(Date).isRequired
}

export default LastUpdatedLabel
