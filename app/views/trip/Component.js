import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PhotoSwipe } from 'react-photoswipe';
import { gettingData, CACHE, PSWP_OPTIONS } from '../../../lib/photoswipe-helper';

import Bubble from '../../components/bubble/Component';
import BubblePic from '../../components/bubble-pic/Component';
import BubbleSay from '../../components/bubble-say/Component';
import BpoomImg from '../../components/bpoom-img/Component';

import { nextStep } from '../../views/app/steps';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@connect(mapStateToProps)
@CSSModules(styles, { allowMultiple: true })

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoSwipeOpen: false,
      imgIndex: 0
    };
  }

  handleClick(index) {
    this.setState({
      photoSwipeOpen: true,
      imgIndex: index
    });
  }

  gettingData(gallery, index, item) {
  if (!item.w || !item.h) { // unknown size
    if (CACHE[item.src]) return;
    CACHE[item.src] = {};

    let img = new Image();
    img.onload = function() {
      CACHE[item.src] = { width: this.width, height: this.height };
      item.w = this.width; // set image width
      item.h = this.height; // set image height
      gallery.invalidateCurrItems(); // reinit Items
      gallery.updateSize(true); // reinit Items
    };
    img.src = item.src; // let's download image
  }
}

  render() {
    let state = this.state;

    let bpoom = this.props.bpoom;
    let trip = bpoom.bp_trip || {};
    let transition = t(stepMsg[nextStep(this.props).transition]);

    let items = (trip.bp_trip_events || []).map(event => {
      let info = CACHE[event.photo] || {};
      return {
        src: event.photo,
        title: event.message || '',
        period: event.period ||'',
        w: info.width || 0,
        h: info.height || 0
      };
    });

    // TODO: i18n + addCaptionHTMLFn: http://photoswipe.com/documentation/options.html
    let options = {
      ...PSWP_OPTIONS,
      addCaptionHTMLFn: function(item, captionEl, isFake) {
        let caption = item.period ? `<strong>${item.period}</strong>` : '';
        captionEl.children[0].innerHTML = caption + (caption && item.title ? `<br />${item.title}` : item.title);
        return true;
      }
    };

    return (
      <div styleName="trip-container">
        <div styleName="trip-view">
          <BubbleSay imgSrc={bpoom.photo}>
            {trip.message}
          </BubbleSay>
          <div styleName="trip-events">
            {
              (trip.bp_trip_events || []).map((event, i) => {
                return (
                  <div key={i}>
                    <BpoomImg imgSrc={event.photo} imgText={event.period} onClick={this.handleClick.bind(this, i)} />
                    <Bubble>{event.message}</Bubble>
                  </div>
                );
              })
            }
          </div>
          <BubblePic imgSrc={bpoom.photo}>{transition}</BubblePic>
        </div>
        <PhotoSwipe gettingData={gettingData} isOpen={state.photoSwipeOpen} options={options} items={items} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps } } = state;
  return { bpoom, currentStep, availableSteps };
}
