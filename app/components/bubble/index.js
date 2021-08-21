import React from 'react'
import './styles.scss'

export default function Bubble({ children, speechDir, scrollable }) {
  return (
    <div className="bp-bubble" styleName={`bubble ${speechDir || ''} ${scrollable ? 'scrollable' : ''}`}>
      <div styleName="content">{children}</div>
    </div>
  )
}

export function addImgSrc(style, imgSrc) {
  if (imgSrc) style.backgroundImage = `url(${imgSrc})`
  return style
}
