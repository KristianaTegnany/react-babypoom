import React, { Component } from 'react';
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl';

import Bubble from '../../components/bubble/Component';

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
  render() {
    let bpoom = this.props.bpoom;
    let transition = t(stepMsg[nextStep(this.props).transition]);

    return (
      <div styleName="welcome-container">
        <Bubble speechDir="bottom" scrollable>
          {
            bpoom.bp_welcome
              ? (<span>{ bpoom.bp_welcome.message }{ '\n\n' }{ transition }</span>)
              : t(MSG.welcome)
          }
        </Bubble>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps } } = state;
  return { bpoom, currentStep, availableSteps };
}

const MSG = defineMessages({
  welcome: {
    id: 'welcome',
    defaultMessage:
`Coucou toi !

Patiente quelques instants, j'ai une grande nouvelle à t'annoncer...`
  }
});