import React from 'react'
import { render } from 'react-dom'
import GlobalDashboard from './components/GlobalDashboard'
import data from './mock_data/data'

require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

render(
  <GlobalDashboard data={data} />,
  document.getElementById('app')
)
