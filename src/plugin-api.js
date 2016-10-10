import { pluginName } from './constants'

let api

const getPluginApi = () => {
  api = api || window.top.pluginApi(pluginName)
  return api
}

function resetApi () {
  api = undefined
}

export { getPluginApi as default, resetApi }
