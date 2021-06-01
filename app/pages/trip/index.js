import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import TruncatedMessage from '../../components/truncated-message'
import getPhoto from '../../../lib/get-photo'
import defaultPhoto from '../../images/default.jpeg'
import t from '../../i18n/i18n'
import { defineMessages, injectIntl } from 'react-intl'
import './styles.theme-BP_ALBUM_THEME.scss'

function groupBy(arr, n) {
  var group = []
  for (var i = 0, end = arr.length / n; i < end; ++i) group.push(arr.slice(i * n, (i + 1) * n))
  return group
}

class Trip extends Component {
  static pages(events) {
    return [events.splice(0, 2)].concat(groupBy(events, 4))
  }
  static cntPages(events) {
    if (this.pages(events.slice(0)).length == 1) {
      return 0
    }
    return this.pages(events.slice(0)).length
  }

  formatDate = (tripEvent) => {
    let { intl } = this.props
    let date = new Date(tripEvent.date_event)
    date = new Date(date.getTime() + new Date().getTimezoneOffset() * 60000)

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
          backgroundImage: `url(${getPhoto(tripEvent.photo_urls, this.props.params.hd) || defaultPhoto})`,
        }}
      />
      {tripEvent.message && <div styleName="quote"><TruncatedMessage message={tripEvent.message} /></div>}
      <div styleName="date">
        <time>{this.formatDate(tripEvent)}</time>
      </div>
    </div>
  )

  render() {
    let { bpoom: { trip_events = [] } = {} } = this.props
    if (!trip_events.length) return ''

    trip_events = trip_events.slice(0)
    let pages = this.constructor.pages(trip_events)

    return pages.map((pageEvents, index) => {
      let firstPage = 0 === index
      let lastPage = index === pages.length - 1
      return (
        <Page
          key={index}
          reverse={pages.length > 1 && lastPage}
          styleName={`page ${firstPage ? 'first-page' : ''} ${lastPage ? 'last-page' : ''} with-${
            pageEvents.length
          }-events`}
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
    })
  }
}

export default injectIntl(connect(mapStateToProps)(Trip))

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
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
