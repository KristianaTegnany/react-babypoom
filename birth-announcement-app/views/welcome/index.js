import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import Bubble from '../../components/bubble'
import Transition from '../../components/transition'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Img
import BABY_IMAGES from '../../../lib/baby-img'

let Welcome = ({ bpoom, desktop, noNav }) => (
  <div styleName="welcome-container">
    <div styleName="baby" style={{ backgroundImage: `url(${BABY_IMAGES[bpoom.baby_full_type]})` }} />
    <div styleName="wrapper">
      <Bubble speechDir={desktop ? 'left' : 'bottom'} scrollable>
        {bpoom.welcome_message ? (
          <span>
            {bpoom.welcome_message}
            {noNav ? '' : '\n\n'}
            {noNav ? '' : <Transition />}
          </span>
        ) : (
          t(MSG.welcome)
        )}
      </Bubble>
    </div>
  </div>
)

export default connect(mapStateToProps)(Welcome)

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
  welcome: {
    id: 'welcome',
    defaultMessage: `Coucou toi !

Patiente quelques instants, j'ai une grande nouvelle à t'annoncer...`,
  },
})
