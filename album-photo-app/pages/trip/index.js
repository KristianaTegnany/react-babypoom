import React, { Component } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import BorderBgBox from '../../components/border-bg-box'

import getPhoto from '../../../lib/get-photo'

import styles from './styles.scss'
import defaultPhoto from '../../images/default.jpeg'

// i18n
import t from '../../i18n/i18n'
import { defineMessages, injectIntl } from 'react-intl'

import logo from '../../images/logo-bp.png'

@connect(mapStateToProps)
class Trip extends Component {
  groupBy = (arr, n) => {
    var group = []
    for (var i = 0, end = arr.length / n; i < end; ++i) group.push(arr.slice(i * n, (i + 1) * n))
    return group
  }

  formatDate = tripEvent => {
    let { intl } = this.props
    if (!tripEvent.date_event) {
      return tripEvent.period || ''
    }
    let date = new Date(tripEvent.date_event)
    date = new Date(date.getTime() + new Date().getTimezoneOffset() * 60000)

    // TODO: migrate all the data and remove this:
    if (null == tripEvent.period_type) {
      return intl.formatDate(date, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
    return intl.formatMessage(MSG[`type_period_${tripEvent.period_type}`], {
      month: intl.formatDate(date, { month: 'short' }),
      year: date.getFullYear(),
    })
  }

  renderTripEvent = (tripEvent, index) => (
    <div key={index} styleName="trip-event">
      <div
        styleName="image-container"
        style={{
          backgroundImage: `url(${getPhoto(tripEvent, 'photo', this.props.media) || defaultPhoto})`,
        }}
      />
      <div styleName="quote">{tripEvent.message}</div>
      <div styleName="date">
        <time>{this.formatDate(tripEvent)}</time>
      </div>
    </div>
  )

  render() {
    let {
      bpoom: { bp_trip: { bp_trip_events = [] } = {} },
    } = this.props
    if (!bp_trip_events.length) return ''

    bp_trip_events = bp_trip_events.slice(0)
    let pages = [bp_trip_events.splice(0, 2)].concat(this.groupBy(bp_trip_events, 4))

    return (
      <div>
        {pages.map((pageEvents, index) => {
          let firstPage = 0 === index
          let lastPage = index === pages.length - 1
          return (
            <Page
              key={index}
              reverse={pages.length > 1 && lastPage}
              styleName={`page with-${pageEvents.length}-events`}
            >
              {pageEvents.length < 3 && (
                <PresentationPanel styleName="presentation-panel">
                  {firstPage && <Title label={t(MSG.title)} description={t(MSG.description)} />}
                </PresentationPanel>
              )}
              <ContentPanel styleName="content-panel">
                <div styleName="trip-events-container">{pageEvents.map(this.renderTripEvent)}</div>
              </ContentPanel>
            </Page>
          )
        })}
      </div>
    )
  }
}

export default injectIntl(Trip)

function mapStateToProps(state) {
  const {
    app: { bpoom, media },
  } = state
  return { bpoom, media }
}

const MSG = defineMessages({
  title: {
    id: 'trip.title',
    defaultMessage: `Mon voyage`,
  },
  description: {
    id: 'trip.description',
    defaultMessage: `Un petit retour en images sur le chemin parcouru jusqu’ici.`,
  },
  type_period_early: {
    id: 'trip.type_period_early',
    defaultMessage: 'Début {month} {year}',
  },
  type_period_mid: {
    id: 'trip.type_period_mid',
    defaultMessage: 'Mi-{month} {year}',
  },
  type_period_late: {
    id: 'trip.type_period_late',
    defaultMessage: 'Fin {month} {year}',
  },
})
