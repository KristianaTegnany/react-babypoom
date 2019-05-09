import React, { Component, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { defineMessages, injectIntl } from 'react-intl'

import { deleteMsg } from '../app/Actions'
import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'
import { flash } from '../../components/flash/Actions'

import useSlideshow from '../../hooks/slide-show'

import VisitorBookForm from '../visitorbook-form'
import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import Message from '../../components/message'
import Transition from '../../components/transition'

// Components
import Button from 'reactstrap/lib/Button'

// Lib
import Ahoy from '../../../lib/ahoy-custom'
import getPhoto from '../../../lib/get-photo'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'
import defaultPhoto from '../../images/default.jpeg'

// Icon
import FaPencil from 'react-icons/lib/fa/pencil'
import useToggle from '../../hooks/toggle'

let VisitorBook = ({
  bpoom,
  bpoom: { bp_visitorbook = {} },
  desktop,
  noNav,
  intl,
  loadSlideshow,
  openSlideshow,
  deleteMsg,
  flash,
}) => {
  let visitorbookMsgs = bp_visitorbook.bp_visitorbook_msgs || []

  useSlideshow(bpoom, loadSlideshow, () =>
    visitorbookMsgs.map(msg => ({
      src: [getPhoto(msg.photo, 'normal') || defaultPhoto, getPhoto(msg.photo, 'thumbnail') || defaultPhoto],
      title: msg.created_at ? `${formatDate(intl, msg.created_at)} - ${msg.name || ''}` : `${msg.name || ''}`,
      description: msg.message || '',
    })),
  )

  const form = useToggle(false)

  // Scroll to bottom
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const scrollableElt = useRef(null)
  useEffect(() => {
    if (scrollToBottom) {
      setScrollToBottom(false)
      let parent = scrollableElt.current.parentNode
      parent.scrollTop = parent.scrollHeight
    }
  }, [scrollToBottom])

  if (form.visible)
    return <VisitorBookForm onSave={() => (form.hide(), setScrollToBottom(true))} onCancel={form.hide} />

  let visitorId = Ahoy.getVisitorId()
  let photo = getPhoto(bpoom.photo, 'thumbnail')
  return (
    <div ref={scrollableElt} styleName="visitorbook-container">
      <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={photo}>
        {bp_visitorbook.message}
      </BubbleSay>
      <div styleName="button-container">
        <Button block color="app" onClick={form.show}>
          <i styleName="icon">
            <FaPencil />
          </i>{' '}
          {t(MSG.leave_message)}
        </Button>
      </div>
      <div styleName="visitorbook-msgs">
        {visitorbookMsgs.map((event, i) => {
          if (event.private && visitorId !== event.uuid) return ''
          return (
            <div key={i}>
              <Message
                imgSrc={getPhoto(event.photo, 'thumbnail') || defaultPhoto}
                message={event.message}
                date={formatDate(intl, event.created_at)}
                name={event.name}
                onClick={() => openSlideshow(i)}
                onDelete={
                  visitorId === event.uuid
                    ? () => {
                        if (window.confirm(intl.formatMessage(MSG.delete_message_confirm))) {
                          deleteMsg(event.id, event.uuid).then(dispatch => {
                            flash('info', MSG.message_deleted)
                            setScrollToBottom(true)
                          })
                        }
                      }
                    : null
                }
              />
            </div>
          )
        })}
      </div>
      {visitorbookMsgs.length > 2 ? (
        <Button block color="app" onClick={form.show}>
          <i styleName="icon">
            <FaPencil />
          </i>{' '}
          {t(MSG.leave_message)}
        </Button>
      ) : (
        ''
      )}
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
  )
}

export default injectIntl(
  connect(
    mapStateToProps,
    { loadSlideshow, openSlideshow, deleteMsg, flash },
  )(VisitorBook),
)

function formatDate(intl, date) {
  return date
    ? intl.formatDate(new Date(date), {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : ''
}

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
  leave_message: {
    id: 'visitorbook.leave_message',
    defaultMessage: 'Laisser un message',
  },
  message_deleted: {
    id: 'visitorbook.message_deleted',
    defaultMessage: 'Votre message a bien été supprimé',
  },
  delete_message_confirm: {
    id: 'visitorbook.delete_message_confirm',
    defaultMessage: 'Êtes-vous sûr de vouloir supprimer ce message ?',
  },
})
