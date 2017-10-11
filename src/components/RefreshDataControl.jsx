import React, { PropTypes } from 'react'
const { func } = PropTypes
import { msg } from '../intl-messages'
import Tooltip from './bootstrap/Tooltip'

function RefreshDataControl ({ onRefresh }) {
  return (
    <Tooltip text={msg.refreshButtonTooltip()} placement='bottom'>
      <div className='btn-group'>
        <button type='button' className='btn btn-default' onClick={(event) => {
          event.preventDefault()
          onRefresh()
        }}>
          <i className='fa fa-refresh'></i>
        </button>

        <button className='btn btn-default dropdown-toggle' type='button' id='refreshIntervalDropdown' data-toggle='dropdown'>
          <span className='caret'></span>
        </button>
        <ul className='dropdown-menu' role='menu'>
          <li role='presentation' className='active'><a role='menuitem' tabIndex='-1' href='#'>Manual</a></li>
        </ul>
      </div>
    </Tooltip>
  )
}

RefreshDataControl.propTypes = {
  onRefresh: func.isRequired
}

export default RefreshDataControl
