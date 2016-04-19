import React from 'react'
import { render } from 'react-dom'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

const loadingPlaceholder = (
  <div className='text-center'>
    <h2>Loading...</h2>
    <div className='spinner spinner-lg'></div>
  </div>
)

const errorPlaceholder = (
  <div className='text-center'>
    <h2>Error!</h2>
    <span style={{ fontSize: 15 }}>
      Could not fetch dashboard data.
      Please ensure that data warehouse is properly installed and configured.
    </span>
  </div>
)

render(
  <DashboardDataProvider loading={loadingPlaceholder} error={errorPlaceholder}>
    <GlobalDashboard />
  </DashboardDataProvider>,
  document.getElementById('app')
)
