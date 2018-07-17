import React, { Component } from 'react'

// CSS
import styles from './styles.scss'

export default class extends Component {
  render() {
    let props = this.props
    let styles = props.style || {}
    if (props.imgSrc) styles.backgroundImage = `url(${props.imgSrc})`

    return (
      <div
        className="bp-image"
        onClick={props.onClick}
        styleName={['img-container', props.onClick ? 'clickable' : ''].join(' ')}
      >
        <div styleName="img-border">
          <div styleName="img" style={styles} />
          <span styleName="img-text">{props.imgText}</span>
        </div>
      </div>
    )
  }
}
