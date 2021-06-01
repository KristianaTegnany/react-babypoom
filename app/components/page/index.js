import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from '../../../lib/cx'
import './styles.theme-BP_ALBUM_THEME.scss'

class Page extends Component {
  render() {
    let { reverse, children, className, params, ...props } = this.props
    return (
      <div>
        <div
          styleName={cx({ page: true, reverse, trademark: params.hd })}
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
    app: { params },
  } = state
  return { params }
}
