import React, { Component } from 'react'
import { connect } from 'react-redux'

import cx from '../../../lib/cx'

import styles from './styles.scss'

@connect(mapStateToProps)
class Page extends Component {
  render() {
    let { reverse, children, className, media, ...props } = this.props
    return (
      <div styleName={cx({ page: true, reverse, trademark: 'print' !== media })} className={`page ${className}`} {...props}>
        {children}
      </div>
    )
  }
}

export default Page

function mapStateToProps(state) {
  const {
    app: { media },
  } = state
  return { media }
}
