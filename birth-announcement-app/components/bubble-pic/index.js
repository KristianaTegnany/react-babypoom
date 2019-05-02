import React from 'react'

import Bubble, { addImgSrc } from '../bubble'

// CSS
import styles from './styles.scss'

export default ({ style, imgSrc, side, onClick, children }) => (
  <div className="bp-bubble-pic" styleName={side || 'left'}>
    <div onClick={onClick} styleName={`img ${onClick ? 'clickable' : ''}`} style={addImgSrc(style || {}, imgSrc)} />
    <Bubble>{children}</Bubble>
  </div>
)
