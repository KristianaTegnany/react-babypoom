import React, { Component } from 'react'

import Button from 'reactstrap/lib/Button'

import BpoomImg from '../bpoom-img/Component'

// I18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Icon
import FaTrashO from 'react-icons/lib/fa/trash-o'

export default class extends Component {
  render() {
    let props = this.props

    return (
      <div styleName="message-container">
        <div styleName="content">
          <BpoomImg imgSrc={props.imgSrc} onClick={props.onClick} />
          <div>
            {props.date ? <div styleName="title">{props.date}</div> : ''}
            <div styleName="title">{props.name}</div>
            <div styleName="message">{props.message}</div>
          </div>
        </div>
        <div styleName="actions">
          {props.onDelete ? (
            <Button color="neutral-app" styleName="delete" onClick={props.onDelete} aria-label="Delete">
              <FaTrashO />
            </Button>
          ) : (
            ''
          )}
          {/*<div styleName="edit" aria-label="Edit"></div>*/}
        </div>
      </div>
    )
  }
}
