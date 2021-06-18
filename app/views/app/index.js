import React, { useEffect, useState } from 'react'
import { injectIntl, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import localeDataLoader from '../../../config/locales/data-loader'
import { PATH_TO_STEP_MAP, stepComponent, stepPath } from './steps'
import { fetchBpoom, updateStep, updateNoNav } from './Actions'
import Slideshow from '../../components/slideshow'
import { changeSlideshowIndex, closeSlideshow } from '../../components/slideshow/Actions'
import StaticMessage from '../static-message'
import LoginPage from '../login-page'
import Alert from '../../components/alert/Alert'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { deleteFlash } from '../../components/flash/Actions'
import config from '../../../config'
import Ahoy from '../../../lib/ahoy-custom'
import ReactGA from 'react-ga'
import pixelate from '../../../lib/pixelate'
import computeThemeColors from '../../../lib/theme'
import Cookie from '../../../lib/cookie'
import { queryParams, hasParam } from '../../../lib/url-params'
import getPhoto from '../../../lib/get-photo'
import loadIntl from '../../../lib/intl-detection'
import Tracking from '../../../lib/tracking'
import CSSVariableApplicator from '../../components/css-var'
import MediaQueries from '../../components/media-queries'
import t from '../../i18n/i18n'
import { updateLocale } from '../../i18n/hot-intl-provider/HotIntlProviderActions'
import Cloud from 'svg-react-loader?name=Cloud!../../images/cloud.svg'
import lazyLoad from '../../../lib/image-loader'
import Stars from '../../components/stars'
import './styles.scss'

let UNIQ = 0

const noNavParamName = 'nn'

function setLocaleData(localeData) {
  addLocaleData(new Function(`return ${localeData}`)())
}

const normalImgSize = { width: config.imageSizes.normal, height: config.imageSizes.normal }
function getImageSize(item, callback) {
  return callback(normalImgSize)
}

let App = ({
  bpoom,
  noNav,
  fetchBpoom,
  updateNoNav,
  steps,
  updateStep,
  location,
  match,
  history,
  flash,
  deleteFlash,
  i18n,
  updateLocale,
  slideshow,
  changeSlideshowIndex,
  closeSlideshow,
}) => {
  const [pathname, setPathname] = useState(location.pathname)
  const [pwd, setPwd] = useState()
  const [msg, setMsg] = useState()
  const [photo, setPhoto] = useState()
  const [loginActivated, setLoginActivated] = useState(false)

  // No nav
  useEffect(() => {
    updateNoNav(hasParam(location.search, noNavParamName) ? PATH_TO_STEP_MAP[match.params.step || ''] : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ahoy Tracking
  useEffect(() => {
    let uuid = match.params.uuid
    let oldBpoomId = Cookie.get('bpoomId')
    if (oldBpoomId != uuid) {
      Cookie.set('bpoomId', uuid)
      Ahoy.reset()
    }
    Ahoy.configure({ urlPrefix: config.SERVER_URL })
    Ahoy.start()
    Ahoy.trackClicks()
  }, [match.params.uuid])

  // GA Tracking
  useEffect(() => {
    ReactGA.initialize('UA-75903062-4', 'auto')
  }, [])

  useEffect(() => {
    if (pathname === location.pathname) return
    setPathname(location.pathname)
    deleteFlash()
    closeSlideshow()
    setSteps(bpoom)

    // Tracking
    Ahoy.trackView()
    ReactGA.pageview(location.pathname)

    Tracking.track(location.pathname.split('/')[2] ? location.pathname.split('/')[2] : 'home', { bpoom_id: bpoom.id, bpoom_uuid: bpoom.uuid, premium: bpoom.premium, pot_disabled: bpoom.pot_disabled})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    let uuid = match.params.uuid

    // Load bpoom data
    let callback = (bpoom, localeData) => {
      setLocaleData(localeData)
      setSteps(bpoom)

      Ahoy.trackView()
      if (window.localStorage && window.localStorage.user) {
        Ahoy.updateVisit({ bpoom_id: bpoom.id, name: window.localStorage.user  })
      } else{
        Ahoy.updateVisit({ bpoom_id: bpoom.id})
      }

      // Preload images
      let photo = getPhoto(bpoom.photo_urls, 'thumbnail')
      if (photo) pixelate({ src: photo })
      lazyLoadAllImages(bpoom, 'thumbnail')
      setPwd(bpoom.login_pwd)
      setMsg(bpoom.login_message)
      setPhoto(bpoom.parents_photo_urls)
      // Loading is more fluid if we inverse have login default boolean to false
      setLoginActivated(!bpoom.login_disabled)
      // lazyLoadAllImages(bpoom, 'normal')
    }
    if (bpoom.uuid) {
      callback(bpoom, i18n.localeData)
    } else {
      fetchBpoom(uuid, queryParams(location.search))
        .catch(() => {})
        .then((bpoom) => {
          loadIntl([bpoom.locale], () => {
            localeDataLoader(bpoom.locale).then((json) => {
              updateLocale({ locale: bpoom.locale, localeData: json.data, messages: json.messages })
              callback(bpoom, json.data)
            })
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.uuid])

  function setSteps(bpoom) {
    let current = PATH_TO_STEP_MAP[match.params.step || '']

    if (bpoom && null !== noNav && noNav !== current) {
      return history.replace(stepPath(noNav, bpoom))
    }

    let availableSteps = bpoom.available_steps || []
    let index = availableSteps.indexOf(current)

    if (availableSteps.length && index < 0) {
      return history.replace(stepPath(availableSteps[0], bpoom))
    }

    updateStep({
      current,
      index,
      prev: index < 0 ? null : availableSteps[index - 1],
      next: index < 0 ? null : availableSteps[index + 1],
    })
  }

  function lazyLoadAllImages(bpoom, photoType) {
    lazyLoad(getPhoto(bpoom.photo_urls, photoType))
    lazyLoad(getPhoto(bpoom.parent_1_photo_urls, photoType))
    lazyLoad(getPhoto(bpoom.parent_2_photo_urls, photoType))
    ;(bpoom.trip_events || []).forEach((e) => lazyLoad(getPhoto(e.photo_urls, photoType)))
    ;(bpoom.guest_book_msgs || []).forEach((e) => lazyLoad(getPhoto(e.photo_urls, photoType)))
    lazyLoad(bpoom.card_url)
  }

  function renderFlash() {
    if (!flash || !flash.message) {
      flash = (location.state || {}).flash
    }
    if (!flash || !flash.message) {
      return ''
      //flash = null;//{ message: { id: 'Error' } };
    }
    return (
      <Alert key={++UNIQ} color={flash.color}>
        {t(flash.message)}
      </Alert>
    )
  }

  // TODO: temp feature for the best Inna friend, it's show animated Stars
  const [resetStars, setResetStars] = useState(0)
  const onComplete = () => {
    setResetStars((state) => state + 1)
  }

  function check_login() {
    if (window.localStorage && window.localStorage.pwd === pwd) {
      return true
    }else{
      return false
    }
  }

  let theme = bpoom.theme || config.theme

  if (bpoom.not_found) return <StaticMessage />
  if (bpoom.disabled) return <StaticMessage msg="disabled" />
  if (loginActivated && !check_login())  return <LoginPage bpoom_pwd={pwd} msg={msg} parents_photo={photo} color_1={theme.color_1} color_2={theme.color_2}/>

  let Step = stepComponent(steps.current, bpoom)
  let stepName = steps.current || ''

  return (
    <CSSVariableApplicator data-variables={computeThemeColors(theme.color_1, theme.color_2, theme.pattern)}>
      {noNav ? '' : <Header />}
      <div styleName="flash">{renderFlash()}</div>
      <main styleName={`${stepName}${'game' === stepName ? ` ${stepName}${bpoom.game_type}` : ''}`}>
        <div key={stepName} styleName={theme.pattern ? 'pattern' : ''}>
          <Step />
        </div>
        {bpoom.id===14839 && steps.index === 0 && <Stars />}

        <Cloud styleName="cloud" />
        <Slideshow
          open={slideshow.isOpen}
          index={slideshow.index}
          onChangeIndex={changeSlideshowIndex}
          onClose={closeSlideshow}
          items={slideshow.items}
          loop={false}
          getImageSize={getImageSize}
        />
      </main>
      {noNav ? '' : <Footer resetStars={resetStars} />}
      <MediaQueries />
    </CSSVariableApplicator>
  )
}

App.fetchData = (store, params, qParams, canEdit) => store.dispatch(fetchBpoom(params.uuid, qParams, canEdit))

export default injectIntl(
  connect(mapStateToProps, {
    fetchBpoom,
    updateStep,
    updateNoNav,
    changeSlideshowIndex,
    closeSlideshow,
    deleteFlash,
    updateLocale,
  })(App),
)

function mapStateToProps(state) {
  const {
    app: { bpoom, steps, noNav },
    slideshow,
    flash,
    i18n,
  } = state
  return { bpoom, steps, noNav, slideshow, flash, i18n }
}
