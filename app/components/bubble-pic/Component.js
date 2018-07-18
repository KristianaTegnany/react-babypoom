import React from 'react'

import Bubble, { addImgSrc } from '../bubble/Component'

// CSS
import styles from './styles.scss'

let BubblePic = ({ style, imgSrc, side, onClick, children }) => (
  <div className="bp-bubble-pic" styleName={side || 'left'}>
    <div onClick={onClick} styleName={`img ${onClick ? 'clickable' : ''}`} style={addImgSrc(style || {}, imgSrc)} />
    <Bubble>{children}</Bubble>
  </div>
)

export default BubblePic
