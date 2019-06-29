import React from 'react'

import Bubble, { addImgSrc } from '../bubble'

// CSS
import styles from './styles.scss'

export default ({ style, imgSrc, speechDir = 'top', onClick, children }) => (
  <div styleName={speechDir} className="bp-bubble-say">
    <div onClick={onClick} styleName={`img ${onClick ? 'clickable' : ''}`} style={addImgSrc(style || {}, imgSrc)} />
    <Bubble speechDir={speechDir}>{children}</Bubble>
  </div>
)
