import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function(msg, values) {
  return <FormattedMessage {...msg} values={values} />
}

// t(msg, (lbl) => <option>{lbl}</option>)
