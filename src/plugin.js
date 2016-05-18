import { PLUGIN_NAME, PLUGIN_API as api } from './constants'

const mainTabToken = 'dashboard-main'

api.register({

  UiInit () {
    api.addMainTab('Dashboard', mainTabToken, `plugin/${PLUGIN_NAME}/main_tab.html`, {
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
