import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'
import page from '../../../config/styles/page.scss'

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

  renderTripEvent = (tripEvent, index) => {
    return (
      <div key={`trip-event-${index}`} styleName="styles.trip-event">
        <div
          styleName="page.image-container styles.trip-event-image-container"
          style={{
            backgroundImage: tripEvent.photo ? `url(${tripEvent.photo})` : '',
          }}
        />
        <div styleName="styles.trip-event-quote">{tripEvent.message}</div>
        <div styleName="styles.trip-event-date">
          <time>{this.formatDate(tripEvent)}</time>
        </div>
      </div>
    )
  }

  render() {
    let {
      bpoom: { bp_trip: { bp_trip_events = [] } = {} },
    } = this.props
    if (!bp_trip_events.length) return ''

    let firstPageEvents = bp_trip_events.splice(0, 2)
    let pages = this.groupBy(bp_trip_events, 4)
    let lastPageEvents = pages.pop() || []

    return (
      <section styleName="styles.section">
        <div
          styleName={`page.page styles.trip-page styles.trip-page-intro ${
            bp_trip_events.length < 1 ? 'styles.only-1-page' : ''
          } styles.with-${firstPageEvents.length}-events`}
        >
          <main styleName="page.page-content styles.trip-page-content">
            <div styleName="styles.trip-events-container">{firstPageEvents.map(this.renderTripEvent)}</div>
          </main>
          <aside styleName="page.page-presentation styles.trip-page-presentation">
            <div styleName="page.page-title-container">
              <h1 styleName="page.page-title">{t(MSG.title)}</h1>
              <div styleName="page.page-desc page.border-with-bg">
                <p styleName="page.page-desc-content">{t(MSG.description)}</p>
              </div>
            </div>
          </aside>
        </div>
        {pages.map((pageEvents, index) => {
          return (
            <div key={index} styleName={`page.page styles.trip-page styles.trip-page-${index % 2 ? 'left' : 'right'}`}>
              <div styleName="styles.trip-events-container">{pageEvents.map(this.renderTripEvent)}</div>
            </div>
          )
        })}
        {lastPageEvents.length && (
          <div
            styleName={`page.page styles.trip-page styles.trip-page-ending styles.with-${lastPageEvents.length}-events`}
          >
            <main styleName={lastPageEvents.length < 3 ? 'page.page-content styles.trip-page-content' : ''}>
              <div styleName="styles.trip-events-container">{lastPageEvents.map(this.renderTripEvent)}</div>
            </main>
            {lastPageEvents.length < 3 && <aside styleName="page.page-presentation styles.trip-page-presentation" />}
          </div>
        )}
      </section>
    )
  }
}

export default injectIntl(Trip)

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
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
