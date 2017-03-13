export const pluginName = 'dashboard'

export const pluginBasePath = `plugin/${pluginName}`

export const defaultLocale = 'en-US'

export const supportedLocales = [
  defaultLocale,
  'de-DE',
  'es-ES',
  'fr-FR',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'pt-BR',
  'zh-CN'
]

// per ECMA-402, undefined means "runtime's default time zone"
export const defaultTimeZone = undefined

// per ECMA-402, browsers only need to support undefined and 'UTC' so that's what is expected
export const supportedTimeZones = [
  undefined,
  'UTC'
]

export const searchPrefixes = {
  dc: 'DataCenter',
  cluster: 'Cluster',
  host: 'Host',
  storage: 'Storage',
  vm: 'Vm',
  event: 'Event',
  volume: 'Volume'
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

// number of characters before giving more space to bar chart labels
export const utilizationListGridNameThreshold = 30
