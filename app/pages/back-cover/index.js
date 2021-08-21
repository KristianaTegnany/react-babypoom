import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page'
import ContentPanel from '../../components/content-panel'
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'
import logo from '../../images/logo-bp.png'
import './styles.theme-BP_ALBUM_THEME.scss'

class BackCover extends Component {
  render() {
    let { bpoom } = this.props
    return (
      <Page>
        <ContentPanel background centered styleName="panel">
          <div styleName="box">
            <img styleName="logo" src={logo} alt="Logo Babypoom" />
            <p styleName="text">{bpoom.album_booking_donor_name ? t(MSG.offer_by, {donorName: bpoom.album_booking_donor_name}) : t(MSG.made_with_love)}</p>
          </div>
        </ContentPanel>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(BackCover)

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
  offer_by: {
    id: 'back_cover.offer_by',
    defaultMessage: `Offert avec amour par {donorName}`,
  },
})

