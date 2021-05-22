import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import getPhoto from '../../../lib/get-photo'
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'
import range from '../../../lib/range'
import parent1Default from '../../images/parent-1.svg'
import parent2Default from '../../images/parent-2.svg'
import './styles.scss'

const defaulPhotos = {
  1: parent1Default,
  2: parent2Default,
}

class ParentsAndStats extends Component {
  render() {
    let { bpoom, params } = this.props

    return (
      <React.Fragment>
        {(bpoom.parent_1_reaction || bpoom.parent_2_reaction) && (
          <Page>
            <PresentationPanel styleName="parents-presentation-panel">
              <Title label={t(MSG.parent_reactions)} />
            </PresentationPanel>
            <ContentPanel centered>
              {range(1, 2).map(index => {
                const reaction = bpoom[`parent_${index}_reaction`]
                const name = bpoom[`parent_${index}_name`]
                return (
                  <div key={index} styleName={`parents-reaction parent-${index}`}>
                    <div>
                      <div
                        style={{
                          backgroundImage: `url(${getPhoto(bpoom[`parent_${index}_photo_urls`], params.hd) ||
                            defaulPhotos[index]})`,
                        }}
                        styleName="image-container"
                      />
                      {reaction && (
                        <div styleName="quote-container">
                          <p styleName="quote">
                            {reaction}
                            {name && (
                              <React.Fragment>
                                <br />-<br />
                                {name}
                              </React.Fragment>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </ContentPanel>
          </Page>
        )}
        <Page>
          <PresentationPanel styleName="stat-presentation-panel">
            <Title label={t(MSG.babypoom_results)} />
          </PresentationPanel>
          <ContentPanel background centered>
            <ul styleName="list">
              {[
                ['tries', bpoom.game_tries_avg, t(MSG.stat_tries)],
                ['time', t(MSG.time_in_sec, { seconds: (bpoom.game_time_avg) }), t(MSG.stat_time)],
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
      </React.Fragment>
    )
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
