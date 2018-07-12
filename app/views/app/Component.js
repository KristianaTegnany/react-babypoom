import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Route } from 'react-router'

// Routes
import { PATH_TO_STEP_MAP, stepComponent, stepPath } from './steps'
import { loadBpoom, updateStep, updateNoNav } from './Actions'

import Slideshow from '../../components/slideshow/Component'

import { loadSlideshow, openSlideshow, changeSlideshowIndex, closeSlideshow } from '../../components/slideshow/Actions'

import NotFound from '../not-found/Component'
import Alert from '../../components/form/Alert'
import Header from '../../components/header/Component'
import Footer from '../../components/footer/Component'

import { deleteFlash } from '../../components/flash/Actions'

// Tracking
import config from '../../../config/application'
import Ahoy from '../../../lib/ahoy-custom'
import ReactGA from 'react-ga'

// Lib
import pixelate from '../../../lib/pixelate'
import computeThemeColors from '../../../lib/theme'
import Cookie from '../../../lib/cookie'
import { hasParam } from '../../../lib/url-params'

// CSS
import CSSVariableApplicator from '../../components/css-var/Component'
import MediaQueries from '../../components/media-queries/Component'
import styles from './styles.scss'

import i18n from '../../i18n/i18n'

// Images
import Cloud from 'svg-react-loader?name=Cloud!../../images/cloud.svg'

let UNIQ = 0

const noNavParamName = 'nn'

@connect(
  mapStateToProps,
  { loadBpoom, updateStep, updateNoNav, changeSlideshowIndex, closeSlideshow, deleteFlash }
)
class App extends Component {
  // static childContextTypes = {
  //   location: PropTypes.object,
  //   intl: PropTypes.object.isRequired,
  // }

  static fetchData(store, params) {
    return store.dispatch(loadBpoom(params.uuid, { flash: false }))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let bpoom = nextProps.bpoom
    if (bpoom && bpoom.theme_color_1 && bpoom.theme_color_2) {
      return { theme: computeThemeColors(bpoom.theme_color_1, bpoom.theme_color_2) }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = { theme: computeThemeColors(config.theme.defaultColor1, config.theme.defaultColor2) }

    // No nav
    let noNav = hasParam(this.props.location.search, noNavParamName)
      ? PATH_TO_STEP_MAP[props.match.params.step || '']
      : null
    props.updateNoNav(noNav)
  }

  // TODO: don't display anything if bpoom is not loaded (display final step text now...)

  // TODO: when receiving availableSteps, check if currentStep is included. if not, redirect to first available step
  componentDidMount() {
    // TODO check if bpoomId is numeric
    let uuid = this.props.match.params.uuid

    // Tracking
    let oldBpoomId = Cookie.get('bpoomId')
    if (oldBpoomId != uuid) {
      Cookie.set('bpoomId', uuid)
      Ahoy.reset()
    }
    Ahoy.configure({ urlPrefix: config.SERVER_URL })
    Ahoy.start()
    Ahoy.trackClicks()

    ReactGA.initialize('UA-75903062-2', 'auto')
    ReactGA.ga('send', 'pageview')

    // Load bpoom data
    let callback = () => {
      this.setSteps(this.props)

      Ahoy.trackView()
      Ahoy.updateVisit({ bpoom_id: this.props.bpoom.id })

      // Preload images
      let bpoom = this.props.bpoom
      if (bpoom.photo_thumbnail) {
        pixelate({ src: bpoom.photo_thumbnail })
      }
    }
    if (this.props.bpoom.uuid) {
      callback()
    } else {
      this.props
        .loadBpoom(uuid)
        .then(callback)
        .catch(() => {})
    }
  }

  componentDidUpdate(prevProps) {
    let props = this.props

    // On route update
    if (props.location.pathname !== prevProps.location.pathname) {
      props.deleteFlash()
      props.closeSlideshow()
      this.setSteps(props)

      // Tracking
      Ahoy.trackView()
      ReactGA.ga('send', 'pageview')
    }
  }

  setSteps(props) {
    let bpoom = props.bpoom
    let current = PATH_TO_STEP_MAP[props.match.params.step || '']

    if (bpoom && null !== props.noNav && props.noNav !== current) {
      return props.history.replace(stepPath(props.noNav, bpoom))
    }

    let availableSteps = bpoom.available_steps || []
    let index = availableSteps.indexOf(current)

    if (availableSteps.length && index < 0) {
      return props.history.replace(stepPath(availableSteps[0], bpoom))
    }

    props.updateStep({
      current,
      index,
      prev: index < 0 ? null : availableSteps[index - 1],
      next: index < 0 ? null : availableSteps[index + 1],
    })
  }

  renderFlash() {
    let props = this.props
    let flash = props.flash
    if (!flash || !flash.message) {
      flash = (props.location.state || {}).flash
    }
    if (!flash || !flash.message) {
      return ''
      //flash = null;//{ message: { id: 'Error' } };
    }
    return (
      <Alert key={++UNIQ} toggle={null} color={flash.color}>
        {i18n(flash.message)}
      </Alert>
    )
  }

  render() {
    let props = this.props
    let bpoom = props.bpoom

    if (bpoom.not_found) {
      return <NotFound />
    }

    let Step = stepComponent(props.steps.current, bpoom)

    return (
      <CSSVariableApplicator data-variables={this.state.theme}>
        {props.noNav ? '' : <Header />}
        <div styleName="flash">{this.renderFlash()}</div>
        <main styleName={props.steps.current || ''}>
          <div key={props.steps.current}>
            <Step />
          </div>
          <Cloud styleName="cloud" />
          <Slideshow
            open={props.slideshow.isOpen}
            index={props.slideshow.index}
            onChangeIndex={index => props.changeSlideshowIndex(index)}
            onClose={props.closeSlideshow}
            items={props.slideshow.items}
          />
        </main>
        {props.noNav ? '' : <Footer />}
        <MediaQueries />
      </CSSVariableApplicator>
    )
  }
}

export default injectIntl(App)

function mapStateToProps(state) {
  const {
    app: { bpoom, steps, noNav },
    slideshow,
    flash,
  } = state
  return { bpoom, steps, noNav, slideshow, flash }
}
