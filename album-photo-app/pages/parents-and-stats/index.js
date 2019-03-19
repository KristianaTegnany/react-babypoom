import React, { Component } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'

import getPhoto from '../../../lib/get-photo'
import defaultPhoto from '../../images/default.jpeg'

// i18n
import t from '../../i18n/i18n'
import { defineMessages, FormattedDate } from 'react-intl'

import styles from './styles.scss'

class ParentsAndStats extends Component {
  render() {
    let { bpoom, params } = this.props

    return [
      <Page key="parents">
        <PresentationPanel styleName="parents-presentation-panel">
          <Title label={t(MSG.parent_reactions)} />
        </PresentationPanel>
        <ContentPanel centered>
          {['mum', 'dad'].map(parent => (
            <div key={parent} styleName={`parents-reaction ${parent}`}>
              <div>
                <div
                  style={{
                    backgroundImage: `url(${getPhoto(bpoom, `photo_${parent}`, params.hd) || defaultPhoto})`,
                  }}
                  styleName="image-container"
                />
                {bpoom[`reaction_${parent}`] && (
                  <div styleName="quote-container">
                    <p styleName="quote">
                      {bpoom[`reaction_${parent}`]}
                      <br />-<br />
                      {bpoom[`name_${parent}`]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </ContentPanel>
      </Page>,
      <Page key="stats">
        <PresentationPanel styleName="stat-presentation-panel">
          <Title label={t(MSG.babypoom_results)} />
        </PresentationPanel>
        <ContentPanel background centered>
          <ul styleName="list">
            {[
              ['tries', bpoom.game_tries_avg, t(MSG.stat_tries)],
              ['time', t({ ...MSG.time_in_sec, values: { seconds: bpoom.game_time_avg } }), t(MSG.stat_time)],
              ['visits', bpoom.visit_count, t(MSG.stat_visits)],
              ['messages', bpoom.message_count, t(MSG.stat_messages)],
            ].map(([type, metric, text]) => (
              <li key={type}>
                <i styleName={`${type}-icon`} />
                <span styleName="result">{metric}</span>
                <span styleName="desc">{text}</span>
              </li>
            ))}
          </ul>
        </ContentPanel>
      </Page>,
    ]
  }
}

export default connect(mapStateToProps)(ParentsAndStats)

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
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
