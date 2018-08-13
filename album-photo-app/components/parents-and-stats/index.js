import React, { Component } from 'react'
import { connect } from 'react-redux'

// i18n
import t from '../../i18n/i18n'
import { defineMessages, FormattedDate } from 'react-intl'

import styles from './styles.scss'
import page from '../../../config/styles/page.scss'

@connect(mapStateToProps)
class ParentsAndStats extends Component {
  render() {
    let { bpoom } = this.props

    return (
      <section styleName="styles.section">
        {(bpoom.reaction_mum || bpoom.reaction_dad) && (
          <div styleName="page.page">
            <aside styleName="page.page-presentation styles.parents-reaction-page-presentation">
              <div styleName="page.page-title-container">
                <h1 styleName="page.page-title">{t(MSG.parent_reactions)}</h1>
              </div>
            </aside>

            <main styleName="page.page-content styles.parents-reaction-page-content">
              <div styleName="styles.parents-reaction styles.parents-reaction-mum">
                <div
                  style={{
                    backgroundImage: bpoom.photo_mum ? `url(${bpoom.photo_mum})` : '',
                  }}
                  styleName="page.image-container styles.parents-reaction-img styles.mum-img"
                />
                {bpoom.reaction_mum && (
                  <div styleName="styles.parents-reaction-quote-container styles.parents-reaction-mum-quote">
                    <p styleName="styles.parents-reaction-quote styles.mum-quote">
                      {bpoom.reaction_mum}
                      <br />-<br />
                      {bpoom.name_mum}
                    </p>
                  </div>
                )}
              </div>

              <div styleName="styles.parents-reaction styles.parents-reaction-dad">
                {bpoom.reaction_dad && (
                  <div styleName="styles.parents-reaction-quote-container styles.parents-reaction-dad-quote">
                    <p styleName="styles.parents-reaction-quote styles.dad-quote">
                      {bpoom.reaction_dad}
                      <br />-<br />
                      {bpoom.name_dad}
                    </p>
                  </div>
                )}
                <div
                  style={{
                    backgroundImage: bpoom.photo_dad ? `url(${bpoom.photo_dad})` : '',
                  }}
                  styleName="page.image-container styles.parents-reaction-img styles.dad-img"
                />
              </div>
            </main>
          </div>
        )}

        <div styleName="styles.page">
          <aside styleName="page.page-presentation styles.statistics-page-presentation">
            <div styleName="page.page-title-container">
              <h1 styleName="page.page-title">{t(MSG.babypoom_results)}</h1>
            </div>
          </aside>

          <main styleName="page.page-content page.centered-page page.page-with-bg styles.statistics-page-content">
            <ul styleName="styles.statistics-page-list">
              <li>
                <i styleName="styles.middle-game-trials-icon" />
                <span styleName="styles.statistic-result styles.middle-game-trials">{bpoom.game_tries_avg}</span>
                <span styleName="styles.statistic-desc">{t(MSG.stat_tries)}</span>
              </li>
              <li>
                <i styleName="styles.middle-win-time-icon" />
                <span styleName="styles.statistic-result styles.middle-win-time">
                  {t({
                    ...MSG.time_in_sec,
                    values: { seconds: bpoom.game_time_avg },
                  })}
                </span>
                <span styleName="styles.statistic-desc">{t(MSG.stat_time)}</span>
              </li>
              <li>
                <i styleName="styles.middle-visits-number-icon" />
                <span styleName="styles.statistic-result styles.middle-visits-number">{bpoom.visit_count}</span>
                <span styleName="styles.statistic-desc">{t(MSG.stat_visits)}</span>
              </li>
              <li>
                <i styleName="styles.messages-total-icon" />
                <span styleName="styles.statistic-result styles.messages-total">{bpoom.message_count}</span>
                <span styleName="styles.statistic-desc">{t(MSG.stat_messages)}</span>
              </li>
            </ul>
          </main>
        </div>
      </section>
    )
  }
}

export default ParentsAndStats

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
}

const MSG = defineMessages({
  parent_reactions: {
    id: 'parents_stats.parent_reactions',
    defaultMessage: `Réactions parents`,
  },
  babypoom_results: {
    id: 'parents_stats.babypoom_results',
    defaultMessage: `Résultats Babypoom`,
  },
  time_in_sec: {
    id: 'datetime.in_sec',
    defaultMessage: '{seconds} sec',
  },
  stat_tries: {
    id: 'parents_stats.stat_tries',
    defaultMessage: `Nombre moyen d’essais pour trouver le prenom`,
  },
  stat_time: {
    id: 'parents_stats.stat_time',
    defaultMessage: `Temps moyen pour trouver le prenom`,
  },
  stat_visits: {
    id: 'parents_stats.stat_visits',
    defaultMessage: `Nombre de visites`,
  },
  stat_messages: {
    id: 'parents_stats.stat_messages',
    defaultMessage: `Messages sur le livre d’or`,
  },
})
