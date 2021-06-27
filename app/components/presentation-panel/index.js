import React from 'react'
import './styles.theme-BP_ALBUM_THEME.scss'

export default function PresentationPanel({ children, className }) {
  return (
    <div styleName="panel" className={className}>
      {children}
    </div>
  )
}

