import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateBreakpoint } from './Actions'

import styles from './styles.scss'

class MediaQueries extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: 'none',
    }
    this.animationHandler = ::this.animationHandler
  }

  componentDidMount() {
    this.setState({ display: '' })
  }

  animationHandler(e) {
    e.stopPropagation()
    this.props.updateBreakpoint(e.animationName) // sm, md...
  }

  render() {
    return <div styleName="media-queries" style={this.state} onAnimationStart={this.animationHandler} />
  }
}

export default connect(
  null,
  { updateBreakpoint },
)(MediaQueries)
