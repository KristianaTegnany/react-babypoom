import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import Bubble from '../../components/bubble/Component'
import Transition from '../../components/transition/Component'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Img
import BABY_IMAGES from '../../../lib/baby-img'

@connect(mapStateToProps)
export default class Welcome extends Component {
  render() {
    let props = this.props
    let bpoom = props.bpoom

    return (
      <div styleName="welcome-container">
        <div styleName="baby" style={{ backgroundImage: `url(${BABY_IMAGES[bpoom.baby_full_type]})` }}></div>
        <div styleName="wrapper">
          <Bubble speechDir={props.desktop ? 'left' : 'bottom'} scrollable>
            {bpoom.bp_welcome ? (
              <span>
                {bpoom.bp_welcome.message}
                {props.noNav ? '' : '\n\n'}
                {props.noNav ? '' : <Transition />}
              </span>
            ) : (
              t(MSG.welcome)
            )}
          </Bubble>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, noNav }, mediaQueries: { desktop } } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
  welcome: {
    id: 'welcome',
    defaultMessage: `Coucou toi !

Patiente quelques instants, j'ai une grande nouvelle à t'annoncer...`,
  },
})
