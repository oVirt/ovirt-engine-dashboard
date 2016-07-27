import { supportedLocales } from '../constants'
import getPluginApi from '../plugin-api'
import { initLocale } from '../utils/intl'

// TODO(vs) fetch translations for given locale as part of application init

// polyfill Intl API (ECMA-402) if not natively supported
const polyfillIntl = new Promise((resolve) => {
  if (!global.Intl) {
    // use code splitting to fetch all required modules
    require.ensure([], (require) => {
      require('intl')
      require('intl/locale-data/jsonp/en')
      require('intl/locale-data/jsonp/de')
      require('intl/locale-data/jsonp/es')
      require('intl/locale-data/jsonp/fr')
      require('intl/locale-data/jsonp/it')
      require('intl/locale-data/jsonp/ja')
      require('intl/locale-data/jsonp/ko')
      require('intl/locale-data/jsonp/pt')
      require('intl/locale-data/jsonp/zh')
      resolve()
    }, 'intl-polyfill')
  } else {
    resolve()
  }
})

// determine and use current WebAdmin UI locale
const initApplicationLocale = new Promise((resolve, reject) => {
  const currentLocale = getPluginApi().currentLocale()

  if (supportedLocales.includes(currentLocale)) {
    initLocale(currentLocale)
    resolve()
  } else {
    reject(`Unsupported UI locale [${currentLocale}]`)
  }
})

export default {

  run () {
    return Promise.all([polyfillIntl, initApplicationLocale])
      .catch((error) => {
        console.error(`Application init failed: ${error}`)
      })
  }

}
