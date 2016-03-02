import React from 'react'
import { render } from 'react-dom'
import { ENGINE_DATA_URL } from './constants'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

const loadingPlaceholder = (
  <div>Loading...</div>
)

render(
  (
    <DashboardDataProvider
      url={ENGINE_DATA_URL}
      loading={loadingPlaceholder}>
      <GlobalDashboard />
    </DashboardDataProvider>
  ),
  document.getElementById('app')
)
