import React from 'react'
import './styles.theme-BP_ALBUM_THEME.scss'

let BorderBgBox = ({ children, className }) => {
  return (
    <div styleName={"box " + className} className={className}>
      <div>{children}</div>
    </div>
  )
}

export default BorderBgBox
