import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function(msg) {
  return <FormattedMessage {...msg} />
}

// t(msg, (lbl) => <option>{lbl}</option>)
