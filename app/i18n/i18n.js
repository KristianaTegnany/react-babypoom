import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function(msg, func) {
  if (func) {
    return (<FormattedMessage {...msg}>{(message) => func(message)}</FormattedMessage>)
  }
  return (<FormattedMessage {...msg} />)
}

// t(msg, (lbl) => <option>{lbl}</option>)