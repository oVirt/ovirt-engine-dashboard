import { PLUGIN_NAME, PLUGIN_API as api } from './constants'

api.register({

  UiInit () {
    api.addMainTab('Dashboard', 'dashboard-main', `plugin/${PLUGIN_NAME}/main_tab.html`, {
      // position this tab before any standard ones
      priority: -1,
      // customize the prefix displayed in search bar
      searchPrefix: 'Dashboard'
    })

    // switch to Dashboard main tab
    api.revealPlace('dashboard-main')
  }

})

api.ready()
