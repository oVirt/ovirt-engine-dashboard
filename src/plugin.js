import { pluginName } from './constants'
import getPluginApi from './plugin-api'
import { msg } from './intl-messages'
import { initLocale } from './utils/intl'

const mainTabToken = 'dashboard-main'

getPluginApi().register({

  UiInit () {
    initLocale()

    // add Dashboard main tab
    getPluginApi().addMainTab(msg.mainTabTitle(), mainTabToken, `plugin/${pluginName}/main-tab.html`, {
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
  }

})

getPluginApi().ready()
