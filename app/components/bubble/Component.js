import React, { Component } from 'react'

// CSS
import styles from './styles.scss'

export default class extends Component {
  render() {
    let props = this.props
    let styleNames = [
      'bubble',
      props.speechDir || '',
      props.scrollable ? 'scrollable' : '',
      props.bend ? `bend-${props.bend}` : '',
    ].join(' ')

    return (
      <div className="bp-bubble" styleName={styleNames}>
        <div styleName="content">{props.children}</div>
      </div>
    )
  }
}
