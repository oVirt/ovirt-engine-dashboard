import React from 'react'
import { render } from 'react-dom'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

// TODO(vs) use a better looking placeholder
const loadingPlaceholder = (
  <h1>Loading...</h1>
)

render(
  <DashboardDataProvider loading={loadingPlaceholder}>
    <GlobalDashboard />
  </DashboardDataProvider>,
  document.getElementById('app')
)
