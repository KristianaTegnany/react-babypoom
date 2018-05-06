import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Components
import Button from 'reactstrap/lib/Button';

import { nextStep, prevStep } from '../../views/app/steps';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@connect(mapStateToProps, {})
@CSSModules(styles)

// TODO: button disabled until bpoom loaded
export default class extends Component {
  prevNextText(pn) {
    return pn.found ? t(stepMsg[pn.name]) : '';
  }

  render() {
    let prev = prevStep(this.props);
    let next = nextStep(this.props);

    return (
      <footer styleName="footer">
        {
          prev.found
          ?
            (<Button tag={Link} to={prev.path} block size="lg" color="secondary">
              &lt; {this.prevNextText(prev)}
            </Button>)
          : ''
        }
        {
          next.found
          ?
            (<Button tag={Link} to={next.path} block size="lg" color="primary">
              {this.prevNextText(next)} &gt;
            </Button>)
          : ''
        }
      </footer>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps } } = state;
  return { bpoom, currentStep, availableSteps };
}
