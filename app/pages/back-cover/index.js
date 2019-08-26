import React, { Component } from 'react'

import Page from '../../components/page'
import ContentPanel from '../../components/content-panel'

import './styles.scss'

// i18n
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'

import logo from '../../images/logo-bp.png'

class BackCover extends Component {
  render() {
    return (
      <Page>
        <ContentPanel background centered styleName="panel">
          <div styleName="box">
            <img styleName="logo" src={logo} alt="Logo Babypoom" />
            <p styleName="text">{t(MSG.made_with_love)}</p>
          </div>
        </ContentPanel>
      </Page>
    )
  }
}

export default BackCover

const MSG = defineMessages({
  made_with_love: {
    id: 'back_cover.made_with_love',
    defaultMessage: `Créé avec émotions
sur Babypoom.com`,
  },
})
