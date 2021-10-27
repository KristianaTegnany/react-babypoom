import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import getPhoto from '../../../lib/get-photo'
import defaultPhoto from '../../images/default.jpeg'
import t from '../../i18n/i18n'
import { defineMessages, injectIntl } from 'react-intl'
import TruncatedMessage from '../../components/truncated-message'
import './styles.theme-BP_ALBUM_THEME.scss'

class Guestbook extends Component {
  static pages(arr) {
    var group = []
    while (arr.length) {
      group.push(arr.splice(0, group.length % 2 ? 3 : 2))
    }
    return group
  }
  static cntPages(events) {
    events = events.slice(0)
    return events.length > 2 ? 1 + this.pages(events.slice(2)).length : Math.min(1, events.length)
  }

  renderGuestbookMsg = (msg, index) => (
    <div key={index} styleName="message">
      <div
        styleName="image-container"
        style={{
          backgroundImage: `url(${getPhoto(msg.photo_urls, this.props.params.hd) || defaultPhoto})`,
        }}
      />
      <div styleName="quote-container">
        <p>
          <TruncatedMessage message={msg.message} />
          <br />-<br />
          {msg.name}
        </p>
      </div>
    </div>
  )

  render() {
    let { bpoom: { guest_book_msgs = [] } = {} } = this.props
    if (!guest_book_msgs.length) return ''

    guest_book_msgs = guest_book_msgs.slice(0)

    let firstPageMsgs = guest_book_msgs.splice(0, 2)
    let pages = this.constructor.pages(guest_book_msgs)

    return [
      <Page key="guest-book-presentation" styleName="page first-page">
        <PresentationPanel styleName="presentation-panel">
          <Title label={t(MSG.title)} description={t(MSG.description)} boxClassName={"bg-decoration-2"}/>
        </PresentationPanel>
        <ContentPanel background centered styleName="content-panel">
          <div styleName="message-container">{firstPageMsgs.map(this.renderGuestbookMsg)}</div>
        </ContentPanel>
      </Page>,
      pages.map((messages, index) => {
        return index % 2 ? (
          <Page key={index} styleName="page">
            <ContentPanel background centered styleName="content-panel right-content-panel left-panel">
              <div styleName="message-container">
                <div styleName="left-container">{messages.slice(0, 2).map(this.renderGuestbookMsg)}</div>
                <div styleName="right-container">{messages.slice(2).map(this.renderGuestbookMsg)}</div>
              </div>
            </ContentPanel>
          </Page>
        ) : (
          <Page key={index} styleName="page">
            <ContentPanel styleName="content-panel right-panel">
              <div styleName="message-container">{messages.map(this.renderGuestbookMsg)}</div>
            </ContentPanel>
          </Page>
        )
      }),
    ]
  }
}

export default injectIntl(connect(mapStateToProps)(Guestbook))

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
}

const MSG = defineMessages({
  title: {
    id: 'guestbook.title',
    defaultMessage: `Mon Livre d’or`,
  },
  description: {
    id: 'guestbook.description',
    defaultMessage: `Voici les messages souvenirs de ma famille et de mes amis.`,
  },
})
