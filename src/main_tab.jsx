import React from 'react'
import { render } from 'react-dom'
import GlobalDashboard from './components/GlobalDashboard'
import data from './dashboard_data'

render(
  <GlobalDashboard data={data} />,
  document.getElementById('app')
)
