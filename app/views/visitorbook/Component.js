import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';

import { PhotoSwipe } from 'react-photoswipe';
import { gettingData, CACHE, PSWP_OPTIONS } from '../../../lib/photoswipe-helper';

import VisitorBookForm from '../visitorbook-form/Component';
import BubblePic from '../../components/bubble-pic/Component';
import BubbleSay from '../../components/bubble-say/Component';
import Message from '../../components/message/Component';

import { nextStep } from '../../views/app/steps';

// Components
import Button from 'reactstrap/lib/Button';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@connect(mapStateToProps)
@CSSModules(styles, { allowMultiple: true })

class Klass extends Component {
  static childContextTypes = {
    intl: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      photoSwipeOpen: false,
      imgIndex: 0,
      formVisible: false // TODO
    };
  }

  handleClick(index) {
    this.setState({
      photoSwipeOpen: true,
      imgIndex: index
    });
  }

  displayForm() {
    this.setState({ formVisible: true });
  }

  onSaveMsg() {
    this.setState({ formVisible: false });
  }

  onCancelMsg() {
    this.setState({ formVisible: false });
  }

  render() {
    let state = this.state;
    if (state.formVisible) {
      return (<VisitorBookForm onSave={::this.onSaveMsg} onCancel={::this.onCancelMsg} />);
    }

    let props = this.props;
    let bpoom = props.bpoom;
    let visitorbook = bpoom.bp_visitorbook || {};
    let transition = t(stepMsg[nextStep(props).transition]);

    let items = (visitorbook.bp_visitorbook_msgs || []).map(event => {
      let info = CACHE[event.photo] || {};
      return {
        src: event.photo,
        title: event.message || '',
        name: event.name || '',
        created_at: event.created_at || '',
        w: info.width || 0,
        h: info.height || 0
      };
    });

    // TODO: i18n + addCaptionHTMLFn: http://photoswipe.com/documentation/options.html
    let options = {
      ...PSWP_OPTIONS,
      addCaptionHTMLFn: (item, captionEl, isFake) => {
        let caption = item.created_at
          ? `<strong>${formatDate(props, item.created_at)} - ${item.name}</strong>`
          : `<strong>${item.name}</strong>`;
        captionEl.children[0].innerHTML = caption + (caption && item.title ? `<br />${item.title}` : item.title);
        return true;
      }
    };

    return (
      <div styleName="visitorbook-container">
        <div styleName="visitorbook-view">
          <BubbleSay imgSrc={bpoom.photo}>
            {visitorbook.message}
          </BubbleSay>
          <Button block color="app" onClick={::this.displayForm}>{t(MSG.leave_message)}</Button>
          <div styleName="visitorbook-msgs">
            {
              (visitorbook.bp_visitorbook_msgs || []).map((event, i) => {
                return (
                  <div key={i}>
                    <Message imgSrc={event.photo} message={event.message} date={formatDate(props, event.created_at)} name={event.name}
                      onClick={this.handleClick.bind(this, i)} />
                  </div>
                );
              })
            }
          </div>
          <Button block color="app" onClick={::this.displayForm}>{t(MSG.leave_message)}</Button>
          <BubblePic imgSrc={bpoom.photo}>{transition}</BubblePic>
        </div>
        <PhotoSwipe gettingData={gettingData} isOpen={state.photoSwipeOpen} options={options} items={items} />
      </div>
    )
  }
}

export default injectIntl(Klass);

function formatDate(props, date) {
  return date ? props.intl.formatDate(new Date(date), {
    year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"
  }) : '';
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps } } = state;
  return { bpoom, currentStep, availableSteps };
}

const MSG = defineMessages({
  leave_message: {
    id: 'visitorbook.leave_message',
    defaultMessage: "Laisser un message"
  }
});