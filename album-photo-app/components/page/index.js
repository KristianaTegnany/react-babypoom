import React, { Component } from 'react'
import { connect } from 'react-redux'

import cx from '../../../lib/cx'

import styles from './styles.scss'

class Page extends Component {
  render() {
    let { reverse, children, className, media, ...props } = this.props
    return (
      <div>
        <div
          styleName={cx({ page: true, reverse, trademark: 'print' !== media })}
          className={`pdf-page ${className || ''}`}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Page)

function mapStateToProps(state) {
  const {
    app: { media },
  } = state
  return { media }
}
