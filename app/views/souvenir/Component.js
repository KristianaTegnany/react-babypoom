import React, { Component } from 'react';
import { connect } from 'react-redux'

import Bubble from '../../components/bubble/Component';

import { nextStep } from '../../views/app/steps';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
class Klass extends Component {
  render() {
    let bpoom = this.props.bpoom;
    let trip = bpoom.bp_trip || {};
    let transition = t(stepMsg[nextStep(this.props).transition]);

    return (
      <Bubble top imgSrc={bpoom.photo}>
        {trip.message}
      </Bubble>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps } } = state;
  return { bpoom, currentStep, availableSteps };
}

export default connect(mapStateToProps)(Klass);