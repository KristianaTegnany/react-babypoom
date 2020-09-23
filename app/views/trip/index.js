import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'
import useSlideshow from '../../hooks/slide-show'
import Bubble from '../../components/bubble'
import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import BpoomImg from '../../components/bpoom-img'
import Transition from '../../components/transition'
import getPhoto from '../../../lib/get-photo'
import imgPath from '../../../lib/img-path'
import BABY_IMAGES from '../../../lib/baby-img'
import './styles.scss'

const defaultPhoto = imgPath('/avatars/default.png')

let Trip = ({ bpoom, desktop, noNav, intl, loadSlideshow, openSlideshow }) => {
  let tripEvents = bpoom.trip_events || []

  useSlideshow(bpoom, loadSlideshow, () =>
    tripEvents.map((event) => ({
      src: [
        getPhoto(event.photo_urls, 'normal') || defaultPhoto,
        getPhoto(event.photo_urls, 'thumbnail') || defaultPhoto,
      ],
      title: formatDate(intl, event),
      description: event.message || '',
    })),
  )

  let photo = getPhoto(bpoom.photo_urls, 'thumbnail')
  return (
    <div>
      <div>
        <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={photo}>
          {bpoom.trip_message}
        </BubbleSay>
      </div>
      <div styleName="trip-events">
        {tripEvents.map((event, i) => {
          return (
            <div key={i} styleName={i % 2 ? 'odd' : 'even'}>
              <div />
              <div styleName="img">
                <BpoomImg
                  imgSrc={getPhoto(event.photo_urls, 'thumbnail') || defaultPhoto}
                  imgText={formatDate(intl, event)}
                  onClick={() => openSlideshow(i)}
                />
              </div>
              <div styleName="bubble">
                <Bubble speechDir={desktop ? (i % 2 ? 'right' : 'left') : null}>{event.message}</Bubble>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        {noNav ? (
          ''
        ) : desktop ? (
          <BubbleSay speechDir="left" imgSrc={photo}>
            <Transition />
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={photo}>
            <Transition />
          </BubblePic>
        )}
      </div>
    </div>
  )
}

export default injectIntl(connect(mapStateToProps, { loadSlideshow, openSlideshow })(Trip))

function formatDate(intl, tripEvent) {
  let date = new Date(tripEvent.date_event)
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
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
