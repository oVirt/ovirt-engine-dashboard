import React from 'react'
import ReactDOM from 'react-dom'
import { dashboardPlaceToken } from './constants'
import getPluginApi from './plugin-api'
import { msg } from './intl-messages'
import appInit from './services/app-init'
import DashboardDataProvider from './components/DashboardDataProvider'
import GlobalDashboard from './components/GlobalDashboard'

// Let webpack handle integrating required css (plus assets referenced in the css)
import 'patternfly/dist/css/patternfly.min.css'
import 'patternfly/dist/css/patternfly-additions.min.css'

// TODO(sd): repackage the dashboard css nicely on top of patternfly's css,
//           start using patternfly-react components (based on react-bootstrap)
//           which are self-contained (eventually, remove patternfly dependency)
import '../static/css/patternfly-overrides.css'
import '../static/css/patternfly-app.css'
import '../static/css/dashboard.css'

// TODO(vs): start using patternfly-react components in order to remove dependency
//           on jQuery and Bootstrap specific jQuery plugins (note that jQuery is
//           loaded automatically for each module through webpack ProvidePlugin)
import 'bootstrap'

// NOTE: Bootstrap 3.3.7 Tooltip.getPosition() function has a bug. This override,
//       which must be referenced after Bootstrap itself, fixes the problem.
import '../static/js/bootstrap-tooltip-override'

const appRoot = document.getElementById('app')

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
    <DashboardDataProvider loading={loadingPlaceholder} error={errorPlaceholder}>
      <GlobalDashboard data={{}} lastUpdated={new Date(0)} />
    </DashboardDataProvider>,
    appRoot
  )
})

getPluginApi().setPlaceUnloadHandler(dashboardPlaceToken, function () {
  ReactDOM.unmountComponentAtNode(appRoot)
})
