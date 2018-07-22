import React from 'react'

import { addImgSrc } from '../bubble/Component'

// CSS
import styles from './styles.scss'

let BpoomImg = ({ style, imgSrc, imgText, onClick }) => (
  <div className="bp-image" onClick={onClick} styleName={`img-container ${onClick ? 'clickable' : ''}`}>
    <div styleName="img-border">
      <div styleName="img" style={addImgSrc(style || {}, imgSrc)} />
      <span styleName="img-text">{imgText}</span>
    </div>
  </div>
)

export default BpoomImg
