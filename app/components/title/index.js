import React from 'react'

import BorderBgBox from '../border-bg-box'

import styles from './styles.scss'

let Title = ({ general, label, description, className, ...props }) => {
  return general ? (
    <h1 styleName="title" className={className}>
      {label}
    </h1>
  ) : (
    <div styleName="title-container" className={className}>
      <h1 styleName="title">{label}</h1>
      {description && <BorderBgBox styleName="description-container">{description}</BorderBgBox>}
    </div>
  )
}

export default Title
