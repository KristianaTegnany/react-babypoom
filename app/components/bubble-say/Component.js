import React, { Component } from 'react';

import Bubble from '../bubble/Component';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
export default class extends Component {

  render() {
    let props = this.props;
    let styles = { ...(props.style || {}), backgroundImage: `url(${props.imgSrc})` };

    return (
      <div styleName="bubble-say-container">
        <div styleName="img" style={styles}></div>
        <Bubble speechDir="top">{props.children}</Bubble>
      </div>
    )
  }
}

