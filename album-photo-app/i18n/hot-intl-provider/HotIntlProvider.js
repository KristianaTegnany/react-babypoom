import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'

import { messages } from '../messages'
import availableLocales from '../../../available-locales'

function mapStateToProps(state) {
  const locale = state.i18n.locale
  return {
    locale,
    messages: messages[locale],
    defaultLocale: availableLocales.defaultLocale,
  }
}

export default connect(mapStateToProps)(IntlProvider)
