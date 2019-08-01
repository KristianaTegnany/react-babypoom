import React from 'react'

import styles from './styles.scss'

let PresentationPanel = ({ children, className, ...props }) => {
  return (
    <div styleName="panel" className={className}>
      {children}
    </div>
  )
}

export default PresentationPanel
