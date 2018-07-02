import React, { Component } from 'react'

// CSS
import styles from './styles.scss'

export default class extends Component {
  render() {
    return (
      <div styleName="bpoom-title">
        <div>{this.props.children}</div>
      </div>
    )
  }
}
