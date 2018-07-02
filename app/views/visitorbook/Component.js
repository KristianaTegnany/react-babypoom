import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { defineMessages, injectIntl } from 'react-intl'

import { deleteMsg } from '../app/Actions'
import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'
import { flash } from '../../components/flash/Actions'

import VisitorBookForm from '../visitorbook-form/Component'
import BubblePic from '../../components/bubble-pic/Component'
import BubbleSay from '../../components/bubble-say/Component'
import Message from '../../components/message/Component'
import Transition from '../../components/transition/Component'

// Components
import Button from 'reactstrap/lib/Button'

// Lib
import Ahoy from '../../../lib/ahoy-custom'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Icon
import FaPencil from 'react-icons/lib/fa/pencil'

@connect(mapStateToProps, { loadSlideshow, openSlideshow, deleteMsg, flash })
class VisitorBook extends Component {
  // static childContextTypes = {
  //   intl: PropTypes.object.isRequired,
  // }

  constructor(props) {
    super(props)

    this.state = {
      formVisible: false, // TODO
      scrollToBottom: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let visitorbook = nextProps.bpoom.bp_visitorbook
    if (visitorbook && visitorbook.bp_visitorbook_msgs && visitorbook.bp_visitorbook_msgs.length) {
      nextProps.loadSlideshow({
        items: visitorbook.bp_visitorbook_msgs.map(event => {
          return {
            src: event.photo,
            title: event.created_at
              ? `${formatDate(nextProps.intl, event.created_at)} - ${event.name || ''}`
              : `${event.name || ''}`,
            description: event.message || '',
          }
        }),
      })
    }
    return null
  }

  componentDidUpdate() {
    if (this.state.scrollToBottom) {
      this.setState({ scrollToBottom: false })
      let scrollableElt = this.visitorbookContainer.parentNode
      scrollableElt.scrollTop = scrollableElt.scrollHeight
    }
  }

  displayForm() {
    this.setState({ formVisible: true })
  }

  onSaveMsg() {
    this.setState({ formVisible: false, scrollToBottom: true })
  }

  onCancelMsg() {
    this.setState({ formVisible: false })
  }

  onDeleteMsg(event) {
    if (window.confirm(this.props.intl.formatMessage(MSG.delete_message_confirm))) {
      this.props.deleteMsg(event.id, event.uuid).then(dispatch => {
        this.props.flash('info', MSG.message_deleted)
        this.setState({ scrollToBottom: true })
      })
    }
  }

  render() {
    let state = this.state
    if (state.formVisible) {
      return <VisitorBookForm onSave={::this.onSaveMsg} onCancel={::this.onCancelMsg} />
    }

    let props = this.props
    let bpoom = props.bpoom
    let visitorbook = bpoom.bp_visitorbook || {}
    let visitorbookMsgs = visitorbook.bp_visitorbook_msgs || []
    let visitorId = Ahoy.getVisitorId()

    return (
      <div ref={elt => (this.visitorbookContainer = elt)} styleName="visitorbook-container">
        <BubbleSay speechDir={props.desktop ? 'left' : 'top'} imgSrc={bpoom.photo_thumbnail}>
          {visitorbook.message}
        </BubbleSay>
        <div styleName="button-container">
          <Button block color="app" onClick={::this.displayForm}>
            <i styleName="icon">
              <FaPencil />
            </i>{' '}
            {t(MSG.leave_message)}
          </Button>
        </div>
        <div styleName="visitorbook-msgs">
          {visitorbookMsgs.map((event, i) => {
            return (
              <div key={i}>
                <Message
                  imgSrc={event.thumbnail}
                  message={event.message}
                  date={formatDate(props.intl, event.created_at)}
                  name={event.name}
                  onClick={() => props.openSlideshow(i)}
                  onDelete={visitorId === event.uuid ? () => this.onDeleteMsg(event) : null}
                />
              </div>
            )
          })}
        </div>
        {visitorbookMsgs.length > 2 ? (
          <Button block color="app" onClick={::this.displayForm}>
            <i styleName="icon">
              <FaPencil />
            </i>{' '}
            {t(MSG.leave_message)}
          </Button>
        ) : (
          ''
        )}
        {props.noNav ? (
          ''
        ) : props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={bpoom.photo_thumbnail}>
            <Transition />
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={bpoom.photo_thumbnail}>
            <Transition />
          </BubblePic>
        )}
      </div>
    )
  }
}

export default injectIntl(VisitorBook)

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
  const { app: { bpoom, noNav }, mediaQueries: { desktop } } = state
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
