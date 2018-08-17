import React from 'react'

import cx from '../../../lib/cx'

import styles from './styles.scss'

let Page = ({ reverse, children, className, ...props }) => {
  return (
    <div styleName={cx({ page: true, reverse })} className={className} {...props}>
      {children}
    </div>
  )
}

export default Page
