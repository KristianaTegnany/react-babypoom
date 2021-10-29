import React from 'react'
import BorderBgBox from '../border-bg-box'
import './styles.theme-BP_ALBUM_THEME.scss'

export default function Title({ general, label, description, className, boxClassName = "", hasTitle = true }) {
  return general ? (
    <h1 styleName="title" className={className}>
      {label}
    </h1>
  ) : (
    <div styleName="title-container" className={className}>
      <h1 styleName={hasTitle ? "title" : "title hidden"}>{label}</h1>
      {description && <BorderBgBox styleName="description-container" className={boxClassName}>{description}</BorderBgBox>}
    </div>
  )
}
