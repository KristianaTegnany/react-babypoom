import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateBreakpoint } from './Actions'

import styles from './styles.scss'

@connect(null, { updateBreakpoint })
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'none',
    }
  }

  componentDidMount() {
    this.setState({ display: '' })
  }

  animationHandler(e) {
    e.stopPropagation()
    this.props.updateBreakpoint(e.animationName)
  }

  render() {
    return <div styleName="media-queries" onAnimationStart={::this.animationHandler} style={this.state} />
  }
}
