import React from 'react'
import { addImgSrc } from '../bubble'
import './styles.scss'

export default function BpoomImg({ style, imgSrc, imgText, onClick }) {
  return (
    <div className="bp-image" onClick={onClick} styleName={`img-container ${onClick ? 'clickable' : ''}`}>
      <div styleName="img-border">
        <div styleName="img" style={addImgSrc(style || {}, imgSrc)} />
        <span styleName="img-text">{imgText}</span>
      </div>
    </div>
  )
}
