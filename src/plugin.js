import { pluginBasePath } from './constants'
import getPluginApi from './plugin-api'
import { msg } from './intl-messages'
import appInit from './services/app-init'

const mainTabToken = 'dashboard-main'

// register event handlers
getPluginApi().register({

  UiInit () {
    // add Dashboard main tab
    getPluginApi().addMainTab(msg.mainTabTitle(), mainTabToken, `${pluginBasePath}/main-tab.html`, {
      // position this tab before any standard ones
      priority: -1,
      // customize the prefix displayed in search bar
      searchPrefix: 'Dashboard'
    })

    // switch to Dashboard main tab
    getPluginApi().revealPlace(mainTabToken)
  }

})

appInit.run().then(() => {
  // proceed with plugin initialization (UiInit)
  getPluginApi().ready()
})
