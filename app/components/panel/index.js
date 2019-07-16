import React from 'react'

// CSS
import styles from './styles.scss'

export default ({ imgType, title, children }) => (
  <div styleName="panel" data-img={imgType}>
    <div styleName="header">{title}</div>
    <div styleName="block">{children}</div>
  </div>
)
