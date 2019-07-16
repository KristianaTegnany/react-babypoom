import React from 'react'

import cx from '../../../lib/cx'

import styles from './styles.scss'

let ContentPanel = ({ background, centered, children, className, ...props }) => {
  return (
    <div styleName={cx({ background, centered })} className={className}>
      {children}
    </div>
  )
}

export default ContentPanel
