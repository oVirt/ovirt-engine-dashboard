import { PLUGIN_NAME, PLUGIN_API as api } from './constants'

api.register({

  UiInit () {
    api.addMainTab('Dashboard', 'dashboard-main', `plugin/${PLUGIN_NAME}/main_tab.html`, {
      priority: -1
    })
    api.revealPlace('dashboard-main')
  }

})

api.ready()
