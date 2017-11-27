// Let webpack handle integrating required css (plus assets referenced in the css)
import 'patternfly/dist/css/patternfly.min.css'
import 'patternfly/dist/css/patternfly-additions.min.css'

// TODO(sd): repackage the dashboard css nicely on top of patternfly's css and the
//           vestigal references to angular should be removed
import '../static/css/angular-patternfly.css' // npm module includes angular - don't want that
import '../static/css/angular-app.css'
import '../static/css/dashboard.css'

require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

// NOTE: Bootstrap ^3.3.7 has a bug in tooltip placement. This override,
//       which must be referenced after bootstrap itself, fixes the problem.
require('../static/js/tooltip-position-override')

import React from 'react'
import ReactDOM from 'react-dom'
import { msg } from './intl-messages'
import appInit from './services/app-init'
import { currentLocale } from './utils/intl'
import DashboardIntlProvider from './components/DashboardIntlProvider'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

appInit.run().then(() => {
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

  ReactDOM.render(
    <DashboardIntlProvider locale={currentLocale()}>
      <DashboardDataProvider loading={loadingPlaceholder} error={errorPlaceholder}>
        <GlobalDashboard />
      </DashboardDataProvider>
    </DashboardIntlProvider>,
    document.getElementById('app')
  )
})
