import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'

import availableLocales from '../../../available-locales'

function mapStateToProps({ i18n: { locale, localeData, messages } }) {
  return {
    locale,
    messages,
    defaultLocale: availableLocales.defaultLocale,
  }
}

export default connect(mapStateToProps)(IntlProvider)
