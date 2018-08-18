import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'

import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'

import Bubble from '../../components/bubble/Component'
import BubblePic from '../../components/bubble-pic/Component'
import BubbleSay from '../../components/bubble-say/Component'
import BpoomImg from '../../components/bpoom-img/Component'
import Transition from '../../components/transition/Component'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'
import defaultPhoto from '../../images/default.jpeg'
@connect(
  mapStateToProps,
  { loadSlideshow, openSlideshow },
)
class Trip extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    let trip = nextProps.bpoom.bp_trip
    if (trip && trip.bp_trip_events && trip.bp_trip_events.length) {
      nextProps.loadSlideshow({
        items: trip.bp_trip_events.map(event => {
          return {
            src: event.photo.normal || defaultPhoto,
            title: formatDate(nextProps.intl, event),
            description: event.message || '',
          }
        }),
      })
    }
    return null
  }

  render() {
    let props = this.props

    let bpoom = props.bpoom
    let trip = bpoom.bp_trip || {}

    return (
      <div>
        <div>
          <BubbleSay speechDir={props.desktop ? 'left' : 'top'} imgSrc={bpoom.photo.thumbnail}>
            {trip.message}
          </BubbleSay>
        </div>
        <div styleName="trip-events">
          {(trip.bp_trip_events || []).map((event, i) => {
            return (
              <div key={i} styleName={i % 2 ? 'odd' : 'even'}>
                <div />
                <div styleName="img">
                  <BpoomImg
                    imgSrc={event.photo.thumbnail || defaultPhoto}
                    imgText={formatDate(props.intl, event)}
                    onClick={() => props.openSlideshow(i)}
                  />
                </div>
                <div styleName="bubble">
                  <Bubble speechDir={props.desktop ? (i % 2 ? 'right' : 'left') : null}>{event.message}</Bubble>
                </div>
              </div>
            )
          })}
        </div>
        <div>
          {props.noNav ? (
            ''
          ) : props.desktop ? (
            <BubbleSay speechDir="left" imgSrc={bpoom.photo.thumbnail}>
              <Transition />
            </BubbleSay>
          ) : (
            <BubblePic imgSrc={bpoom.photo.thumbnail}>
              <Transition />
            </BubblePic>
          )}
        </div>
      </div>
    )
  }
}

export default injectIntl(Trip)

function formatDate(intl, tripEvent) {
  if (!tripEvent.date_event) {
    return tripEvent.period || ''
  }
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

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
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
