import React from 'react'

import Button from 'reactstrap/lib/Button'

import BpoomImg from '../bpoom-img/Component'

// I18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Icon
import FaTrashO from 'react-icons/lib/fa/trash-o'

let Message = ({ imgSrc, date, name, message, onClick, onDelete }) => (
  <div styleName="message-container">
    <div styleName="content">
      <BpoomImg imgSrc={imgSrc} onClick={onClick} />
      <div>
        {date && <div styleName="title">{date}</div>}
        <div styleName="title">{name}</div>
        <div styleName="message">{message}</div>
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

export default Message
