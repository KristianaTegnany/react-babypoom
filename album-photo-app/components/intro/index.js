import React from 'react'

// i18n
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'

import styles from './styles.scss'
import page from '../../../config/styles/page.scss'

let Intro = () => (
  <section styleName="styles.section">
    <div styleName="page.page" />
    {/* Blank page */}

    <div styleName="page.page styles.summary-page">
      <aside styleName="page.page-presentation styles.summary-page-presentation">
        <h1 styleName="page.page-title">{t(MSG.my_photo_album)}</h1>
      </aside>

      <main styleName="page.page-content styles.summary-page-content">
        <div styleName="page.border-with-bg">
          <div styleName="styles.summary-content">
            <p styleName="styles.baby-summary-desc">{t(MSG.my_photo_album_desc)}</p>
            <ol styleName="styles.baby-summary-list">
              <li>{t(MSG.arrival)}</li>
              <li>{t(MSG.trip)}</li>
              <li>{t(MSG.guestbook)}</li>
              <li>{t(MSG.reaction)}</li>
              <li>{t(MSG.results)}</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  </section>
)

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
marqués mon arrivée dans notre monde.`,
  },
  arrival: {
    id: 'intro.arrival',
    defaultMessage: `Mon arrivée`,
  },
  trip: {
    id: 'intro.trip',
    defaultMessage: `Mon voyage`,
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
