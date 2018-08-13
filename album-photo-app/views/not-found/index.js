import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import { Route } from 'react-router'

import config from '../../../config/application'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

export default class NotFound extends Component {
  render() {
    let props = this.props
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) {
            staticContext.status = 404
          }
          return (
            <main>
              <div styleName="container">
                <div styleName="wrapper">
                  <span styleName="html-code">404</span>
                  {t(MSG.not_found)}
                </div>
              </div>
            </main>
          )
        }}
      />
    )
  }
}

const MSG = defineMessages({
  not_found: {
    id: 'app.not_found',
    defaultMessage: "Désolé, cette page n'existe pas.",
  },
})
