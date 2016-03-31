import React, { PropTypes } from 'react'
const { instanceOf } = PropTypes
import { formatDateTime } from '../utils/formatting'

function LastUpdatedLabel ({ date }) {
  return (
    <span>
      <span className='fa fa-clock-o' /> <b>Last Updated</b> {formatDateTime(date)}
    </span>
  )
}

LastUpdatedLabel.propTypes = {
  date: instanceOf(Date).isRequired
}

export default LastUpdatedLabel
