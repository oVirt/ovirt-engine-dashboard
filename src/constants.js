export const pluginName = 'dashboard'
export const pluginApi = window.parent.pluginApi(pluginName)

export const searchPrefixes = {
  dc: 'DataCenter',
  cluster: 'Cluster',
  host: 'Host',
  storage: 'Storage',
  vm: 'Vm',
  event: 'Event'
}

export const searchFields = {
  name: 'name',
  status: 'status',
  severity: 'severity',
  time: 'time',
  cluster: 'cluster'
}

export const heatMapThresholds = {
  domain: [0.65, 0.75, 0.9],
  colors: ['#D4F0FA', '#F9D67A', '#EC7A08', '#CE0000']
}

export const heatMapLegendLabels = ['< 65%', '65-75%', '75-90%', '> 90%']

export const storageUnitTable = [
  { unit: 'TiB' },
  { unit: 'GiB', factor: 1024 },
  { unit: 'MiB', factor: 1024 }
]
