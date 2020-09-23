import React, { Component, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { defineMessages, injectIntl } from 'react-intl'
import { deleteMsg } from '../app/Actions'
import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'
import { flash } from '../../components/flash/Actions'
import useSlideshow from '../../hooks/slide-show'
import GuestBookForm from '../guest-book-form'
import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import Message from '../../components/message'
import Transition from '../../components/transition'
import Button from 'reactstrap/lib/Button'
import Ahoy from '../../../lib/ahoy-custom'
import getPhoto from '../../../lib/get-photo'
import t from '../../i18n/i18n'
import FaPencil from 'react-icons/lib/fa/pencil'
import useToggle from '../../hooks/toggle'
import imgPath from '../../../lib/img-path'
import BABY_IMAGES from '../../../lib/baby-img'

import styles from './styles.scss'

const defaultPhoto = imgPath('/avatars/default.png')

let GuestBook = ({ bpoom, desktop, noNav, intl, loadSlideshow, openSlideshow, deleteMsg, flash }) => {
  let guestBookMsgs = bpoom.guest_book_msgs || []

  useSlideshow(bpoom, loadSlideshow, () =>
    guestBookMsgs.map((msg) => ({
      src: [getPhoto(msg.photo_urls, 'normal') || defaultPhoto, getPhoto(msg.photo_urls, 'thumbnail') || defaultPhoto],
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

  if (form.visible) return <GuestBookForm onSave={() => (form.hide(), setScrollToBottom(true))} onCancel={form.hide} />

  let visitorId = Ahoy.getVisitorId()
  let photo = getPhoto(bpoom.photo_urls, 'thumbnail')
  return (
    <div ref={scrollableElt} styleName="guest-book-container">
      <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={photo}>
        {bpoom.guest_book_message}
      </BubbleSay>
      <div styleName="button-container">
        <Button block color="app" onClick={form.show}>
          <i styleName="icon">
            <FaPencil />
          </i>{' '}
          {t(MSG.leave_message)}
        </Button>
      </div>
      <div styleName="guest-book-msgs">
        {guestBookMsgs.map((msg, i) => {
          if (msg.private && visitorId !== msg.uuid) return ''
          return (
            <div key={i}>
              <Message
                imgSrc={getPhoto(msg.photo_urls, 'thumbnail') || defaultPhoto}
                message={msg.message}
                date={formatDate(intl, msg.created_at)}
                name={msg.name}
                onClick={() => openSlideshow(i)}
                onDelete={
                  visitorId === msg.uuid
                    ? () => {
                        if (window.confirm(intl.formatMessage(MSG.delete_message_confirm))) {
                          deleteMsg(msg.id, msg.uuid).then((dispatch) => {
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
      {guestBookMsgs.length > 2 ? (
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

export default injectIntl(connect(mapStateToProps, { loadSlideshow, openSlideshow, deleteMsg, flash })(GuestBook))

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
    id: 'guest_book.leave_message',
    defaultMessage: 'Laisser un message',
  },
  message_deleted: {
    id: 'guest_book.message_deleted',
    defaultMessage: 'Votre message a bien été supprimé',
  },
  delete_message_confirm: {
    id: 'guest_book.delete_message_confirm',
    defaultMessage: 'Êtes-vous sûr de vouloir supprimer ce message ?',
  },
})
