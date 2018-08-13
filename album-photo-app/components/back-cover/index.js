import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'
import page from '../../../config/styles/page.scss'

// i18n
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'

import logo from '../../images/logo-bp.png'

@connect(mapStateToProps)
class BackCover extends Component {
  render() {
    let { bpoom } = this.props
    return (
      <section styleName="styles.section">
        <div styleName="page.page page.centered-page page.page-with-bg">
          <div styleName="styles.back-cover-content">
            <img styleName="styles.back-cover-image-logo" src={logo} alt="Logo Babypoom" />
            <p styleName="styles.back-cover-ml">{t(MSG.made_with_love)}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default BackCover

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
}

const MSG = defineMessages({
  made_with_love: {
    id: 'back_cover.made_with_love',
    defaultMessage: `Créé avec émotions
sur Babypoom.com`,
  },
})
