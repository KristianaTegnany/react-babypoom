import React from 'react'
import cx from '../../../lib/cx'
import './styles.theme-BP_ALBUM_THEME.scss'

let ContentPanel = ({ background, centered, children, className, style }) => {
  return (
    <div styleName={cx({ background, centered })} className={className} style={style}>
      {children}
    </div>
  )
}

export default ContentPanel
