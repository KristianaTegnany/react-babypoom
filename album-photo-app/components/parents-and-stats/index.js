import React, { Component } from 'react'
import { connect } from 'react-redux'

import Page from '../page'
import Title from '../title'
import PresentationPanel from '../presentation-panel'
import ContentPanel from '../content-panel'

// i18n
import t from '../../i18n/i18n'
import { defineMessages, FormattedDate } from 'react-intl'

import styles from './styles.scss'

@connect(mapStateToProps)
class ParentsAndStats extends Component {
  render() {
    let { bpoom } = this.props

    return (
      <div>
        <Page>
          <PresentationPanel styleName="parents-presentation-panel">
            <Title label={t(MSG.parent_reactions)} />
          </PresentationPanel>
          <ContentPanel centered>
            {['mum', 'dad'].map(parent => (
              <div key={parent} styleName={`parents-reaction ${parent}`}>
                <div>
                  <div
                    style={{
                      backgroundImage: bpoom[`photo_${parent}`] ? `url(${bpoom[`photo_${parent}`]})` : '',
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
        </Page>
        <Page>
          <PresentationPanel styleName="stat-presentation-panel">
            <Title label={t(MSG.babypoom_results)} />
          </PresentationPanel>
          <ContentPanel background centered>
            <ul styleName="list">
              {[
                ['tries', bpoom.game_tries_avg, t(MSG.stat_tries)],
                ['time', bpoom.game_time_avg, t(MSG.stat_time)],
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
        </Page>
      </div>
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
