import React from 'react'

import { addImgSrc } from '../bubble'

// CSS
import styles from './styles.scss'

export default ({ style, imgSrc, imgText, onClick }) => (
  <div className="bp-image" onClick={onClick} styleName={`img-container ${onClick ? 'clickable' : ''}`}>
    <div styleName="img-border">
      <div styleName="img" style={addImgSrc(style || {}, imgSrc)} />
      <span styleName="img-text">{imgText}</span>
    </div>
  </div>
)
