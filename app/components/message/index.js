import React from 'react'

import Button from 'reactstrap/lib/Button'

import BpoomImg from '../bpoom-img'

// I18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Icon
import FaTrashO from 'react-icons/lib/fa/trash-o'

export default ({ imgSrc, date, name, message, onClick, onDelete, onGift }) => (
  <div styleName="message-container">
    <div styleName="content">
      <BpoomImg imgSrc={imgSrc} onClick={onClick} />
      <div>
        {date && <div styleName="title">{date}</div>}
        <div styleName="title">{name}</div>
        <div styleName="message">{message}</div>
        {onGift && (
          <div styleName="offer-container" onClick={onGift}>
            <p styleName="shine-me"></p>
          </div>
        )}
      </div>
    </div>
    <div styleName="actions">
      {onDelete && (
        <Button color="neutral-app" styleName="delete" onClick={onDelete} aria-label="Delete">
          <FaTrashO />
        </Button>
      )}
      {/*<div styleName="edit" aria-label="Edit"></div>*/}
    </div>
  </div>
)
