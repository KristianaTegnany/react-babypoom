import React, { Component } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'

import getPhoto from '../../../lib/get-photo'

import styles from './styles.scss'

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
      <div key={index} styleName="message">
        <div
          styleName="image-container"
          style={{
            backgroundImage: getPhoto(msg.photo) ? `url(${getPhoto(msg.photo)})` : '',
          }}
        />
        <div styleName="quote-container">
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
      <div>
        <Page styleName="page">
          <PresentationPanel styleName="presentation-panel">
            <Title label={t(MSG.title)} description={t(MSG.description)} />
          </PresentationPanel>
          <ContentPanel background centered styleName="content-panel">
            <div styleName="message-container">{firstPageMsgs.map(this.renderGuestbookMsg)}</div>
          </ContentPanel>
        </Page>
        {pages.map((messages, index) => {
          return index % 2 ? (
            <Page key={index} styleName="page">
              <ContentPanel background centered styleName="content-panel left-panel">
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
        })}
      </div>
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
