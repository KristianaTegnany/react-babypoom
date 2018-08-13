import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'
import page from '../../../config/styles/page.scss'

// i18n
import t from '../../i18n/i18n'
import { defineMessages, injectIntl } from 'react-intl'

import logo from '../../images/logo-bp.png'

@connect(mapStateToProps)
class Guestbook extends Component {
  group = arr => {
    var group = []
    while (arr.length) {
      group.push(arr.splice(0, group.length % 2 ? 3 : 2))
    }
    return group
  }

  renderGuestbookMsg = (msg, index) => {
    return (
      <div key={`guestbook-message-${index}`} styleName="styles.guestbook-message">
        <div
          styleName="page.image-container styles.guestbook-message-image-container"
          style={{
            backgroundImage: msg.photo ? `url(${msg.photo})` : '',
          }}
        />
        <div styleName="styles.guestbook-message-quote-container">
          <p>
            {msg.message}
            <br />-<br />
            {msg.name}
          </p>
        </div>
      </div>
    )
  }

  render() {
    let {
      bpoom: { bp_visitorbook: { bp_visitorbook_msgs = [] } = {} },
    } = this.props
    if (!bp_visitorbook_msgs.length) return ''

    bp_visitorbook_msgs = bp_visitorbook_msgs.slice(0)
    let firstPageMsgs = bp_visitorbook_msgs.splice(0, 2)
    let pages = this.group(bp_visitorbook_msgs)

    return (
      <section styleName="styles.section">
        <div styleName="page.page styles.guestbook-page styles.guestbook-page-intro">
          <main styleName="page.page-content styles.guestbook-page-content">
            <div styleName="styles.guestbook-message-container">{firstPageMsgs.map(this.renderGuestbookMsg)}</div>
          </main>
          <aside styleName="page.page-presentation styles.guestbook-page-presentation">
            <div styleName="page.page-title-container">
              <h1 styleName="page.page-title">{t(MSG.title)}</h1>
              <div styleName="page.page-desc page.border-with-bg">
                <p styleName="page.page-desc-content">{t(MSG.description)}</p>
              </div>
            </div>
          </aside>
        </div>
        {pages.map((messages, index) => {
          return index % 2 ? (
            <div key={`guestbook-page-${index}`} styleName="page.page styles.guestbook-page styles.guestbook-page-left">
              <div styleName="styles.guestbook-message-container">
                <div styleName="styles.guestbook-message-container--left">
                  {messages.slice(0, 2).map(this.renderGuestbookMsg)}
                </div>
                <div styleName="styles.guestbook-message-container--right">
                  {messages.slice(2).map(this.renderGuestbookMsg)}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={`guestbook-page-${index}`}
              styleName="page.page styles.guestbook-page styles.guestbook-page-right"
            >
              <div styleName="styles.guestbook-message-container">{messages.map(this.renderGuestbookMsg)}</div>
            </div>
          )
        })}
      </section>
    )
  }
}

export default injectIntl(Guestbook)

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
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
