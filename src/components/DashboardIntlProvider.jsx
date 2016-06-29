import React, { PropTypes } from 'react'
const { string, node } = PropTypes
import { addLocaleData, IntlProvider } from 'react-intl'
import translatedMessages from '../../intl/translations.json'

// register supported locales with react-intl
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
;[en, de].forEach(addLocaleData)

function DashboardIntlProvider ({ children, locale }) {
  return (
    <IntlProvider locale={locale} messages={translatedMessages[locale]} defaultLocale='en-US'>
      {children}
    </IntlProvider>
  )
}

DashboardIntlProvider.propTypes = {
  children: node,
  locale: string.isRequired
}

export default DashboardIntlProvider
