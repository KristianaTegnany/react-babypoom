import React, { Component } from 'react'

// CSS
import styles from './styles.scss'

export default class extends Component {
  render() {
    let props = this.props

    return (
      <div styleName="panel" data-img={props.imgType}>
        <div styleName="header">{props.title}</div>
        <div styleName="block">{props.children}</div>
      </div>
    )
  }
}
