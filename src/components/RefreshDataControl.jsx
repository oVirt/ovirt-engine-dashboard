import React, { PropTypes } from 'react'
const { func } = PropTypes
import { msg } from '../intl-messages'
import Tooltip from './bootstrap/Tooltip'

function RefreshDataControl ({ onRefresh }) {
  return (
    <Tooltip text={msg.refreshButtonTooltip()} placement='bottom' hideOnClick>
      <div className='btn-group'>
        <button type='button' className='btn btn-default' onClick={(event) => {
          event.preventDefault()
          onRefresh()
        }}>
          <i className='fa fa-refresh'></i>
        </button>

        {/* refresh configuration drop down menu would go here */}
      </div>
    </Tooltip>
  )
}

RefreshDataControl.propTypes = {
  onRefresh: func.isRequired
}

export default RefreshDataControl
