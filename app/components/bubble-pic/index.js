import React from 'react'
import Bubble, { addImgSrc } from '../bubble'
import './styles.scss'

export default function BubblePic({ style, imgSrc, side, onClick, children }) {
  return (
    <div className="bp-bubble-pic" styleName={side || 'left'}>
      <div onClick={onClick} styleName={`img ${onClick ? 'clickable' : ''}`} style={addImgSrc(style || {}, imgSrc)} />
      <Bubble>{children}</Bubble>
    </div>
  )
}
