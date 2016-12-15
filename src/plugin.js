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
  },

  SystemTreeSelectionChange (selectedItem) {
    // selecting anything other than 'System' (root node) hides the main tab
    const rootNodeSelected = selectedItem.type === 'System'
    getPluginApi().setTabAccessible(mainTabToken, rootNodeSelected)
  },

  TagActivationChange (...activeTagList) {
    // check if the active tag list is empty or not, if not empty hide the main tab
    getPluginApi().setTabAccessible(mainTabToken, activeTagList.length === 0)
  }
})

appInit.run().then(() => {
  // proceed with plugin initialization (UiInit)
  getPluginApi().ready()
})
