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
import Bubble from '../../components/bubble'
import Message from '../../components/message'
import Transition from '../../components/transition'
import Button from 'reactstrap/lib/Button'
import Ahoy from '../../../lib/ahoy-custom'
import getPhoto from '../../../lib/get-photo'
import t from '../../i18n/i18n'
import FaPencil from 'react-icons/lib/fa/pencil'
import useToggle from '../../hooks/toggle'
import imgPath from '../../../lib/img-path'
import config from '../../../config'
import { hasParam } from '../../../lib/url-params'
import Tracking from '../../../lib/tracking'
import './styles.scss'

const DEFAULT_PHOTO = imgPath('/avatars/default.png' + config.avatarBackgroundQuerystring)
const DEFAULT_PHOTO_PARENT_1 = imgPath('/avatars/parent-1.svg' + config.avatarBackgroundQuerystring)
const DEFAULT_PHOTO_PARENT_2 = imgPath('/avatars/parent-2.svg' + config.avatarBackgroundQuerystring)

let GuestBook = ({ bpoom, desktop, noNav, steps, intl, loadSlideshow, openSlideshow, deleteMsg, flash }) => {
  const [msgId, setMsgId] = useState()
  let guestBookMsgs = bpoom.guest_book_msgs || []

  let all_imgs = guestBookMsgs.map((msg) => ({
    src: [getPhoto(msg.photo_urls, 'normal'), getPhoto(msg.photo_urls, 'thumbnail')],
    title: msg.created_at ? `${formatDate(intl, msg.created_at)} - ${msg.name || ''}` : `${msg.name || ''}`,
    description: msg.message || '',
  }))

  function getByValue(arr, value) {
    for (var i=0, iLen=arr.length; i<iLen; i++) {
      if (arr[i].id == value) return arr[i];
    }
  }

  let friendName = ''
  if (window.localStorage && window.localStorage.friendName) {
    friendName = window.localStorage.friendName
  }

  let giftLink = `https://album.babypoom.com/${bpoom.uuid}/gift?donor=${friendName}&utm_source=bp`

  function goToAlbumOffer() {
    Tracking.track("FriendAlbumOfferBt_Clicked", {bpoom_id: bpoom.id})
    window.open(giftLink)
  }

  if (bpoom.parent_2_reaction) {
    all_imgs.unshift({
      src: [
        getPhoto(bpoom.parent_2_photo_urls, 'normal') || DEFAULT_PHOTO_PARENT_2,
        getPhoto(bpoom.parent_2_photo_urls, 'thumbnail') || DEFAULT_PHOTO_PARENT_2,
      ],
      description: bpoom.parent_2_reaction,
    })
  }
  if (bpoom.parent_1_reaction) {
    all_imgs.unshift({
      src: [
        getPhoto(bpoom.parent_1_photo_urls, 'normal') || DEFAULT_PHOTO_PARENT_1,
        getPhoto(bpoom.parent_1_photo_urls, 'thumbnail') || DEFAULT_PHOTO_PARENT_1,
      ],
      description: bpoom.parent_1_reaction,
    })
  }
  useSlideshow(bpoom, loadSlideshow, () => all_imgs)

  function showPhoto(index) {
    if (bpoom.parent_1_reaction && bpoom.parent_2_reaction) {
      openSlideshow(index + 2)
    } else if (
      (bpoom.parent_1_reaction && !bpoom.parent_2_reaction) ||
      (!bpoom.parent_1_reaction && bpoom.parent_2_reaction)
    ) {
      openSlideshow(index + 1)
    } else {
      openSlideshow(index)
    }
  }

  function validateMsg() {
    if (hasParam(location.search, "msg")){
      alert(intl.formatMessage(MSG.message_updated))
      // TODO Durty method to update the message list page without complexity of redux (only for updated message)
      window.location.assign(window.location.href.split("?")[0])
    }else{
      form.hide()
      setScrollToBottom(true)
    }
  }

  const form = useToggle(false)

  useEffect(() => {
    let url= window.location.href
    if (hasParam(location.search, "msg")){
      setMsgId(/msg=([^&]+)/.exec(url)[1])
      form.show()
    }
  }, [])

  // Scroll to bottom
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const scrollableElt = useRef(null)
  useEffect(() => {
    if (scrollToBottom) {
      setScrollToBottom(false)
      let parent = scrollableElt.current.parentNode
      parent.scrollTop = parent.scrollHeight
    }
    //setMsgId(166)
  }, [scrollToBottom])

  if (form.visible) return <GuestBookForm onSave={() => (validateMsg())} onCancel={form.hide} msg={getByValue(guestBookMsgs,msgId)} />

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
        {bpoom.parent_1_reaction && (
          <div key="parent_1_reaction">
            <Message
              imgSrc={getPhoto(bpoom.parent_1_photo_urls, 'thumbnail') || DEFAULT_PHOTO}
              message={bpoom.parent_1_reaction}
              date={formatDate(intl, bpoom.created_at)}
              name={bpoom.parent_1_name}
              onClick={() => openSlideshow(0)}
            />
          </div>
        )}
        {bpoom.parent_2_reaction && (
          <div key="parent_2_reaction">
            <Message
              imgSrc={getPhoto(bpoom.parent_2_photo_urls, 'thumbnail') || DEFAULT_PHOTO}
              message={bpoom.parent_2_reaction}
              date={formatDate(intl, bpoom.created_at)}
              name={bpoom.parent_2_name}
              onClick={() => openSlideshow(1)}
            />
          </div>
        )}
        {guestBookMsgs.map((msg, i) => {
          if (msg.private && visitorId !== msg.uuid) return ''
          return (
            <div key={i}>
              <Message
                imgSrc={getPhoto(msg.photo_urls, 'thumbnail') || DEFAULT_PHOTO}
                message={msg.message}
                date={formatDate(intl, msg.created_at)}
                name={msg.name}
                onClick={() => showPhoto(i)}
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
                onGift={(bpoom.shared_by_visits && !bpoom.album_paid && visitorId === msg.uuid)
                  ? () => goToAlbumOffer()
                  : null
                }
              />
            </div>
          )
        })}
      </div>
      {guestBookMsgs.length > 2 ? (
        <div styleName="fixed-btn">
          <Button block color="app" onClick={form.show}>
            <i styleName="icon">
              <FaPencil />
            </i>{' '}
            {t(MSG.leave_message)}
          </Button>
        </div>
      ) : (
        ''
      )}
      {noNav ? (
        ''
      ) : steps.ok && steps.next ? (
        <BubblePic speechDir={desktop ? 'left' : null} imgSrc={photo}>
          <Transition />
        </BubblePic>
      ) : (
        <div styleName="mascot-direction">
          <Bubble dir={desktop ? 'left' : null}>
            <Transition />
          </Bubble>
        </div>
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
    app: { bpoom, noNav, steps },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, steps, desktop }
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
  message_updated: {
    id: 'guest_book.message_updated',
    defaultMessage: 'Votre message a bien été modifié ;)',
  },
  delete_message_confirm: {
    id: 'guest_book.delete_message_confirm',
    defaultMessage: 'Êtes-vous sûr de vouloir supprimer ce message ?',
  },
})
