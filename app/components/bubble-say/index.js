import React from 'react'
import Bubble, { addImgSrc } from '../bubble'
import './styles.scss'

export default function BubbleSay({ style, imgSrc, speechDir = 'top', onClick, children }) {
  return (
    <div styleName={speechDir} className="bp-bubble-say">
      <div onClick={onClick} styleName={`img ${onClick ? 'clickable' : ''}`} style={addImgSrc(style || {}, imgSrc)} />
      <Bubble speechDir={speechDir}>{children}</Bubble>
    </div>
  )
}
