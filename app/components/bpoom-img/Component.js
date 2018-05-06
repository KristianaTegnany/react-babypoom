import React, { Component } from 'react';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@CSSModules(styles)
export default class extends Component {
  render() {
    let styles = this.props.imgSrc ? { ...(this.props.style || {}), backgroundImage: `url(${this.props.imgSrc})` } : {};
    return (
      <div onClick={this.props.onClick} styleName="img-container">
        <div styleName="img-border">
          <div styleName="img" style={styles}></div>
          <span styleName="img-text">{this.props.imgText}</span>
        </div>
      </div>
    )
  }
}

