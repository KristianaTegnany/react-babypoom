import React from 'react'

// CSS
import styles from './styles.scss'

let Bubble = ({ children, speechDir, scrollable, bend }) => (
  <div className="bp-bubble" styleName={`bubble ${speechDir || ''} ${scrollable ? 'scrollable' : ''}`}>
    <div styleName="content">{children}</div>
  </div>
)

export function addImgSrc(style, imgSrc) {
  if (imgSrc) style.backgroundImage = `url(${imgSrc})`
  return style
}

export default Bubble
