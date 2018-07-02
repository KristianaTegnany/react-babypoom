import React, { Component } from 'react'

import Bubble from '../bubble/Component'

// CSS
import styles from './styles.scss'

export default class extends Component {
  render() {
    let props = this.props
    let styles = { ...(props.style || {}), backgroundImage: `url(${props.imgSrc})` }
    let dir = props.speechDir || 'top'

    return (
      <div styleName={dir} className="bp-bubble-say">
        <div onClick={props.onClick} styleName={['img', props.onClick ? 'clickable' : ''].join(' ')} style={styles} />
        <Bubble speechDir={dir}>{props.children}</Bubble>
      </div>
    )
  }
}
