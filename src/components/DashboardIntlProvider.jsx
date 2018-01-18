import React from 'react'
import { string, node } from 'prop-types'
import { addLocaleData, IntlProvider } from 'react-intl'
import { defaultLocale } from '../constants'
import translatedMessages from '../../intl/translations.json'

// TODO(vs) get rid of react-intl as we already use IntlMessageFormat
// 1, replace babel-plugin-react-intl + react-intl-po with script
//    that implements `intl:extract` + `intl:apply` build tasks
// 2, remove react-intl dependency and related code (DashboardIntlProvider)

// TODO(vs) using English locale data only, no impact since we don't use react-intl components
import en from 'react-intl/locale-data/en'
addLocaleData(en)

function DashboardIntlProvider ({ children, locale }) {
  return (
    <IntlProvider locale={locale} messages={translatedMessages[locale]} defaultLocale={defaultLocale}>
      {children}
    </IntlProvider>
  )
}

DashboardIntlProvider.propTypes = {
  children: node,
  locale: string.isRequired
}

export default DashboardIntlProvider
