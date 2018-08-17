import React from 'react'

import styles from './styles.scss'

let BorderBgBox = ({ children, className, ...props }) => {
  return (
    <div styleName="box" className={className}>
      <div>{children}</div>
    </div>
  )
}

export default BorderBgBox
