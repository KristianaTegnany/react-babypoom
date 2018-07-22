import React from 'react'

import Bubble, { addImgSrc } from '../bubble/Component'

// CSS
import styles from './styles.scss'

let BubbleSay = ({ style, imgSrc, speechDir = 'top', onClick, children }) => (
  <div styleName={speechDir} className="bp-bubble-say">
    <div onClick={onClick} styleName={`img ${onClick ? 'clickable' : ''}`} style={addImgSrc(style || {}, imgSrc)} />
    <Bubble speechDir={speechDir}>{children}</Bubble>
  </div>
)

export default BubbleSay
