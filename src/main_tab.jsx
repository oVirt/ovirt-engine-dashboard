import React from 'react'
import { render } from 'react-dom'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

const loadingPlaceholder = (
  <div>
    <h2 className='text-center'>Loading...</h2>
    <div className='spinner spinner-lg'></div>
  </div>
)

render(
  <DashboardDataProvider loading={loadingPlaceholder}>
    <GlobalDashboard />
  </DashboardDataProvider>,
  document.getElementById('app')
)
