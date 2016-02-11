const api = parent.pluginApi('dashboard')

api.register({
  UiInit: () => {
    api.addMainTab('Dashboard', 'dashboard-main', 'plugin/dashboard/main_tab.html')
    api.revealPlace('dashboard-main')
  }
})

api.ready()
