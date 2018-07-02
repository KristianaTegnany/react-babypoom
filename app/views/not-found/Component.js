import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import { Route } from 'react-router'

import config from '../../../config/application'

import computeThemeColors from '../../../lib/theme'

import CSSVariableApplicator from '../../components/css-var/Component'
import BubbleSay from '../../components/bubble-say/Component'
import MediaQueries from '../../components/media-queries/Component'

// i18n
import t from '../../i18n/i18n'

// CSS
import appStyles from '../app/styles.scss'
import styles from './styles.scss'

// Images
import mascotSays from '../../images/mascot-says.png'

@connect(mapStateToProps)
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
            <CSSVariableApplicator
              data-variables={computeThemeColors(config.theme.defaultColor1, config.theme.defaultColor2)}
            >
              <main>
                <div styleName="styles.container">
                  <div styleName="styles.wrapper">
                    <BubbleSay speechDir={props.desktop ? 'left' : 'top'} imgSrc={mascotSays}>
                      {t(MSG.not_found)}
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
  }
}

function mapStateToProps(state) {
  const { mediaQueries: { desktop } } = state
  return { desktop }
}

const MSG = defineMessages({
  not_found: {
    id: 'app.not_found',
    defaultMessage: "Désolé, cette page n'existe pas.",
  },
})
