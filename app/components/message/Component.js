import React, { Component } from 'react';

import BpoomImg from '../bpoom-img/Component';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
export default class extends Component {

  render() {
    let props = this.props;

    return (
      <div styleName="message-container">
        <div styleName="content">
          <BpoomImg imgSrc={props.imgSrc} onClick={props.onClick} />
          <div>
            { props.date ? <div styleName="title">{props.date}</div> : '' }
            <div styleName="title">{props.name}</div>
            <div styleName="message">{props.message}</div>
          </div>
        </div>
        {/*<div styleName="actions">*/}
          {/*<div styleName="edit" aria-label="Edit"></div>*/}
        {/*</div>*/}
      </div>
    )
  }
}

