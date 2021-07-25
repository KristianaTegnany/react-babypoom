import React from 'react'
import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import BorderBgBox from '../../components/border-bg-box'
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'
import './styles.theme-BP_ALBUM_THEME.scss'

let Intro = () => [
  //<Page key="intro-blank" />, // Blank page
  <Page key="intro" styleName="page">
    <PresentationPanel styleName="presentation-panel">
      <Title general label={t(MSG.my_photo_album)} />
    </PresentationPanel>
    <ContentPanel styleName="content-panel">
      <BorderBgBox>
        <div styleName="content">
          <p styleName="description">{t(MSG.my_photo_album_desc)}</p>
          <ol styleName="list">
            <li>{t(MSG.arrival)}</li>
            <li>{t(MSG.trip)}</li>
            <li>{t(MSG.souvenir)}</li>
            <li>{t(MSG.guestbook)}</li>
            <li>{t(MSG.reaction)}</li>
            <li>{t(MSG.results)}</li>
          </ol>
        </div>
      </BorderBgBox>
    </ContentPanel>
  </Page>,
]

export default Intro

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
