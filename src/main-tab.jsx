require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

import React from 'react'
import ReactDOM from 'react-dom'
import { msg } from './intl-messages'
import appInit from './services/app-init'
import { currentLocale } from './utils/intl'
import DashboardIntlProvider from './components/DashboardIntlProvider'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

const loadingPlaceholder = (
  <div className='text-center'>
    <h2>{msg.dataLoading()}</h2>
    <div className='spinner spinner-lg' />
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

appInit.run().then(() => {
  ReactDOM.render(
    <DashboardIntlProvider locale={currentLocale()}>
      <DashboardDataProvider loading={loadingPlaceholder} error={errorPlaceholder}>
        <GlobalDashboard />
      </DashboardDataProvider>
    </DashboardIntlProvider>,
    document.getElementById('app')
  )
})
