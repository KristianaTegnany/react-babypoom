import React from 'react'
import t from '../../i18n/i18n'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import './styles.scss'

const MESSAGE_TRUNC_SIZE = 42

const TruncatedMessage = function ({ message, params }) {
  return message && message.length > MESSAGE_TRUNC_SIZE && !params.hd && !params.full
    ? <span>{message.slice(0, MESSAGE_TRUNC_SIZE) + '…'} <i styleName="limit">{t(MSG.limit)}</i></span>
    : message || ''
}

export default connect(mapStateToProps)(TruncatedMessage)

function mapStateToProps(state) {
  const {
    app: { params },
  } = state
  return { params }
}


const MSG = defineMessages({
  limit: {
    id: 'truncated_message.limit',
    defaultMessage: `Ce message sera complet dans votre album de naissance imprimé`,
  },
})
