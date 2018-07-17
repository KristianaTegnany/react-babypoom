import React, { Component } from 'react'

import Bubble from '../bubble/Component'

// CSS
import styles from './styles.scss'

export default class extends Component {
  render() {
    let props = this.props
    let styles = props.style || {}
    if (props.imgSrc) styles.backgroundImage = `url(${props.imgSrc})`

    return (
      <div className="bp-bubble-pic" styleName={props.side || 'left'}>
        <div onClick={props.onClick} styleName={['img', props.onClick ? 'clickable' : ''].join(' ')} style={styles} />
        <Bubble>{props.children}</Bubble>
      </div>
    )
  }
}
