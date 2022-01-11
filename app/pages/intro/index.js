import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import BorderBgBox from '../../components/border-bg-box'
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'
import './styles.theme-BP_ALBUM_THEME.scss'

class Intro extends Component {
  render() {
    let { bpoom } = this.props
    let { bpoom: { trip_events = [] } = {} } = this.props

    return (
      <>
        <Page key="intro-blank" />
        <Page key="intro" styleName="page">
          <PresentationPanel styleName="presentation-panel">
            <Title general label={t(MSG.my_photo_album)} styleName="titleColor" />
          </PresentationPanel>
          <ContentPanel styleName="content-panel">
            <BorderBgBox styleName="border-box">
              <div styleName="content">
                <p styleName="description">{t(MSG.my_photo_album_desc)}</p>
                <ol styleName="list">
                  <li>{t(MSG.arrival)}</li>
                  {trip_events.length && <li>{t(MSG.trip)}</li>}
                  <li>{t(MSG.souvenir)}</li>
                  {bpoom.firstname_infos && <li>{t(MSG.firstname)}</li>}
                  <li>{t(MSG.guestbook)}</li>
                  <li>{t(MSG.reaction)}</li>
                  <li>{t(MSG.results)}</li>
                </ol>
              </div>
            </BorderBgBox>
          </ContentPanel>
        </Page>
      </>
    )
  }
}

export default connect(mapStateToProps)(Intro)

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
}

const MSG = defineMessages({
  my_photo_album: {
    id: 'intro.my_photo_album',
    defaultMessage: `Mon album Babypoom`,
  },
  my_photo_album_desc: {
    id: 'intro.my_photo_album_desc',
    defaultMessage: `Voici mon joli album de naissance à
parcourir avec le sourire ! Tu y trouveras
tous les petits évènements qui ont
marqué mon arrivée dans notre monde.`,
  },
  arrival: {
    id: 'intro.arrival',
    defaultMessage: `Mon arrivée`,
  },
  trip: {
    id: 'intro.trip',
    defaultMessage: `Mon voyage`,
  },
  souvenir: {
    id: 'intro.souvenir',
    defaultMessage: `Mon faire-part`,
  },
  firstname: {
    id: 'intro.fistname',
    defaultMessage: `Mon prénom`,
  },
  guestbook: {
    id: 'intro.guestbook',
    defaultMessage: `Mon Livre d’or`,
  },
  reaction: {
    id: 'intro.reaction',
    defaultMessage: `Réactions de mes parents`,
  },
  results: {
    id: 'intro.results',
    defaultMessage: `Mes Résultats Babypoom`,
  },
})
