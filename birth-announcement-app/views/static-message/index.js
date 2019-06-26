import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import { Route } from 'react-router-dom'
import config from '../../../config/application'
import computeThemeColors from '../../../lib/theme'
import CSSVariableApplicator from '../../components/css-var'
import BubbleSay from '../../components/bubble-say'
import MediaQueries from '../../components/media-queries'
import t from '../../i18n/i18n'
import appStyles from '../app/styles.scss'
import styles from './styles.scss'
import imgPath from '../../../lib/img-path'

let StaticMessage = ({ desktop, msg }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = 404
      return (
        <CSSVariableApplicator data-variables={computeThemeColors(config.theme_color_1, config.theme_color_2)}>
          <main>
            <div styleName="styles.container">
              <div styleName="styles.wrapper">
                <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={imgPath('/mascot/says.png')}>
                  {t(MSG[msg || 'not_found'])}
                </BubbleSay>
              </div>
            </div>
          </main>
          <MediaQueries />
        </CSSVariableApplicator>
      )
    }}
  />
)

export default connect(mapStateToProps)(StaticMessage)

function mapStateToProps(state) {
  const {
    mediaQueries: { desktop },
  } = state
  return { desktop }
}

const MSG = defineMessages({
  not_found: {
    id: 'app.not_found',
    defaultMessage: "Désolé, cette page n'existe pas.",
  },
  disabled: {
    id: 'app.disabled',
    defaultMessage: 'Désolé, ce babypoom a été désactivé.',
  },
})
