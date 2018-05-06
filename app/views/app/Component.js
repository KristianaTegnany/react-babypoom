import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from '../../components/form/Alert';

import Header from '../../components/header/Component'
import Footer from '../../components/footer/Component'

import { NAMES_TO_PATHS, PATHS_TO_NAMES, curStep } from '../../views/app/steps';
import { loadBpoom, updateStep, updateStepIndex } from './Actions';

// Lib
import pixelate from '../../../lib/pixelate';
import { lighten, darken } from '../../../lib/color';

// CSS
import CSSVariableApplicator from '../../components/css-var/Component';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import i18n from '../../i18n/i18n';


let UNIQ = 0;

@connect(mapStateToProps, { loadBpoom, updateStep, updateStepIndex })
@CSSModules(styles)

export default class extends Component {
  static childContextTypes = {
    location: PropTypes.object
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillReceiveProps(props) {
    this.init(props);
  }

  constructor(props) {
    super(props);
    this.init(props);

    // const theme = {};
    // theme['--brand-primary']   = '#84C5C4';
    // theme['--brand-secondary'] = '#bb6967';
    // theme['--app-body-bg']     = '#FCAAA8';
    // theme['--app-bg']          = '#FFF5F5';

    const theme = {
      '--brand-primary':   '#1b827f', // 1E
      '--brand-secondary': '#dc706e' // 2D
    };
    theme['--brand-primary-A'] = lighten(theme['--brand-primary'], 15); // color 1 - 1F
    theme['--brand-primary-B'] = lighten(theme['--brand-primary'], 10); // color 1A - 1D
    theme['--brand-primary-C'] = lighten(theme['--brand-primary'], 20); // color 1C
    theme['--brand-primary-D'] = darken( theme['--brand-primary'], 5); // color 1B
    
    theme['--brand-secondary-A'] = lighten(theme['--brand-secondary'], 15); // color 2 - 2C
    theme['--brand-secondary-B'] = lighten(theme['--brand-secondary'], 30); // color 2A - 2E
    theme['--brand-secondary-C'] = lighten(theme['--brand-secondary'], 10); // color 2B

    theme['--neutral-primary']   = '#414141';
    theme['--neutral-primary-A'] = lighten(theme['--neutral-primary'], 15); // color 0A
    theme['--neutral-primary-B'] = lighten(theme['--neutral-primary'], 30); // color 0B
    theme['--neutral-primary-C'] = lighten(theme['--neutral-primary'], 50); // color 0C
    theme['--neutral-primary-D'] = lighten(theme['--neutral-primary'], 65); // color 0D
    theme['--neutral-primary-E'] = lighten(theme['--neutral-primary'], 70); // color 0E
    theme['--neutral-primary-F'] = lighten(theme['--neutral-primary'], 75); // color 0F

    theme['--neutral-secondary']   = '#414141';
    theme['--neutral-secondary-A'] = lighten(theme['--neutral-secondary'], 15); // color 0A
    theme['--neutral-secondary-B'] = lighten(theme['--neutral-secondary'], 30); // color 0B
    theme['--neutral-secondary-C'] = lighten(theme['--neutral-secondary'], 50); // color 0C
    theme['--neutral-secondary-D'] = lighten(theme['--neutral-secondary'], 65); // color 0D
    theme['--neutral-secondary-E'] = lighten(theme['--neutral-secondary'], 70); // color 0E
    theme['--neutral-secondary-F'] = lighten(theme['--neutral-secondary'], 75); // color 0F

    this.state = { theme: theme };
  }

  // TODO: when receiving availableSteps, check if currentStep is included. if not, redirect to first available step
  componentDidMount() {
    // TODO check if bpoomId is numeric
    this.props.loadBpoom({ uuid: this.props.params.uuid });
  }

  componentDidUpdate() {
    let props = this.props;
    let { availableSteps } = props;
    if (availableSteps.length) {
      let step = curStep(props);
      if (!step.found) {
        return this.context.router.push({ pathname: NAMES_TO_PATHS.get(availableSteps[0]) });
      }
      this.props.updateStepIndex({ stepIndex: step.index });
    }
  }

  init(props) {
    // Set current step
    let bpoom = props.bpoom;
    let step = PATHS_TO_NAMES.get(props.location.pathname.replace('/' + (bpoom.uuid || props.params.uuid), '/:uuid'));
    props.updateStep({ step }, () => {
      if (props.availableSteps.length) {
        let stepIndex = props.availableSteps.indexOf(step);
        props.updateStepIndex({ stepIndex });
      }

      // Preload images
      if (bpoom.photo) {
        pixelate({ src: bpoom.photo });
      }
    });
  }

  renderFlash() {
    let props = this.props;
    let flash = props.flash;
    if (!flash || !flash.message) {
      flash = (props.location.state || {}).flash;
    }
    if (!flash || !flash.message) {
      return '';
      //flash = null;//{ message: { id: 'Error' } };
    }
    return (<Alert key={++UNIQ} toggle={null} color={flash.color}>{i18n(flash.message)}</Alert>);
  }

  render() {
    // TODO: UNIQ to force the reloading => scroll will be on top
    return (
      <CSSVariableApplicator variables={this.state.theme}>
        <Header/>
        <div styleName="flash">{this.renderFlash()}</div>
        <main>
          <div>{this.props.children}</div>
        </main>
        <Footer />
      </CSSVariableApplicator>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps }, flash } = state;
  return { bpoom, currentStep, availableSteps, flash }
}




