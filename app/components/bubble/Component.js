import React, { Component } from 'react';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
export default class extends Component {

  render() {
    let props = this.props;
    let classNames = [
      'bubble',
      props.speechDir || '',
      props.scrollable ? 'scrollable' : '',
      props.bend ? `bend-${props.bend}` : ''
    ].join(' ');

    return (
      <div styleName={classNames}>
        <div styleName="content">
          {props.children}
        </div>
      </div>
    )
  }
}

