import React from 'react'
import { render } from 'react-dom'
import { msg } from './intl-messages'
import { initLocale, currentLocale } from './utils/intl'
import DashboardIntlProvider from './components/DashboardIntlProvider'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

initLocale()

const loadingPlaceholder = (
  <div className='text-center'>
    <h2>{msg.dataLoading()}</h2>
    <div className='spinner spinner-lg'></div>
  </div>
)

const errorPlaceholder = (
  <div className='text-center'>
    <h2>{msg.dataError()}</h2>
    <span style={{ fontSize: 15 }}>
      {msg.dataErrorDetail()}
    </span>
  </div>
)

render(
  <DashboardIntlProvider locale={currentLocale()}>
    <DashboardDataProvider loading={loadingPlaceholder} error={errorPlaceholder}>
      <GlobalDashboard />
    </DashboardDataProvider>
  </DashboardIntlProvider>,
  document.getElementById('app')
)
