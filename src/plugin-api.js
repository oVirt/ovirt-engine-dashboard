import { pluginName } from './constants'

let api

const getPluginApi = () => {
  api = api || window.top.pluginApi(pluginName)
  return api
}

export default getPluginApi
