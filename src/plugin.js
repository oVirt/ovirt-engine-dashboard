import { PLUGIN_NAME, PLUGIN_API as api } from './constants'
import { msg } from './intl_messages'
import { initLocale } from './utils/intl'

const mainTabToken = 'dashboard-main'

api.register({

  UiInit () {
    initLocale()

    // add Dashboard main tab
    api.addMainTab(msg.mainTabTitle(), mainTabToken, `plugin/${PLUGIN_NAME}/main_tab.html`, {
      // position this tab before any standard ones
      priority: -1,
      // customize the prefix displayed in search bar
      searchPrefix: 'Dashboard'
    })

    // switch to Dashboard main tab
    api.revealPlace(mainTabToken)
  },

  SystemTreeSelectionChange (selectedItem) {
    // selecting anything other than 'System' (root node) hides the main tab
    const rootNodeSelected = selectedItem.type === 'System'
    api.setTabAccessible(mainTabToken, rootNodeSelected)
  }

})

api.ready()
