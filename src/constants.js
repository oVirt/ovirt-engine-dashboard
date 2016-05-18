export const PLUGIN_NAME = 'dashboard'
export const PLUGIN_API = window.parent.pluginApi(PLUGIN_NAME)

export const SEARCH_PREFIXES = {
  dc: 'DataCenter',
  cluster: 'Cluster',
  host: 'Host',
  storage: 'Storage',
  vm: 'Vm',
  event: 'Event'
}

export const SEARCH_FIELDS = {
  name: 'name',
  status: 'status',
  severity: 'severity',
  time: 'time',
  cluster: 'cluster'
}

export const HEATMAP_THRESHOLDS = {
  domain: [0.65, 0.75, 0.9]
}

export const HEATMAP_LEGEND_LABELS = ['< 65%', '65-75%', '75-90%', '> 90%']

export const STORAGE_UNIT_TABLE = [
  { unit: 'TiB' },
  { unit: 'GiB', factor: 1024 },
  { unit: 'MiB', factor: 1024 }
]
