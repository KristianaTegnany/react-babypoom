import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { defineMessages } from 'react-intl'
import ReactGA from 'react-ga'
import { FacebookProvider, Page, Like } from 'react-facebook'
import ReactFBLike from 'react-fb-like'
import Button from 'reactstrap/lib/Button'
import Tracking from '../../../lib/tracking'
// Config
import config from '../../../config'

// i18n
import t from '../../i18n/i18n'
import stepMsg from '../../i18n/messages/steps'

// CSS
import styles from './styles.scss'

let Transition = ({ bpoom, steps }) => {
  useEffect(() => {
    if ('undefined' !== typeof FB) {
      FB.XFBML.parse()
      FB.Event.subscribe('edge.create', function (trackUrl) {
        ReactGA.ga('send', 'fb-like', trackUrl)
      })
    }
  }, [])

  const SHARE_SUPPORT = !!(typeof navigator !== "undefined" && navigator.share)

  function shareIt() {
    Tracking.track("Friend_ShareIt_Clicked", {bpoom_id: bpoom.id})
    // If we have web share enabled use that
    // TODO : Why intl not work here ?
    navigator.share({
      title: "Hello !",
      text: "Voici un service intéressant d'annonce de naissance que je viens de découvrir, cela pourrait te plaire ;)",
      url: "https://www.babypoom.com",
    })
  }

  if (!steps.ok) return ''

  let transitionId = `to_${steps.next || 'finish'}`
  let msg = stepMsg[transitionId]

  // Hack
  let hackMsg = HACK_MSG[`${transitionId}_${bpoom.uuid}`]
  if (hackMsg) return <span dangerouslySetInnerHTML={{ __html: hackMsg }} />

  let friendName = ''
  if (window.localStorage && window.localStorage.friendName) {
    friendName = window.localStorage.friendName
  }

  let giftLink = `https://album.babypoom.com/${bpoom.uuid}/gift?donor=${friendName}&utm_source=bp`

  function goToAlbumOffer() {
    Tracking.track("FriendAlbumOfferBt_Clicked", {bpoom_id: bpoom.id})
    window.open(giftLink)
  }

  return msg
    ? t(msg, {
        link: (
          <ReactGA.OutboundLink eventLabel="babypoom-website" to={config.babypoomWebsiteLink} target="_blank">
            {config.babypoomWebsiteShortLink}
          </ReactGA.OutboundLink>
        ),
        share: (
          <div styleName="share-container">
            <span styleName="share">
              {false ? (
                <>
                {SHARE_SUPPORT && (
                  <Button size="sm" color="app" onClick={shareIt} id="IdendifierShareShareButton">
                    <span styleName="share-text">{t(MSG.share_babypoom_bt)}</span>
                  </Button>
                )}
                <div styleName="offer-container" onClick={()=>goToAlbumOffer()}>
                  <p styleName="shine-me"></p>
                </div>
                </>
              ) : (
                <>
                {SHARE_SUPPORT && (
                  <Button size="sm" color="app" onClick={shareIt} id="IdendifierShareShareButton">
                    <span styleName="share-text">{t(MSG.share_babypoom_bt)}</span>
                  </Button>
                )}
              <div styleName="facebook-container">
                <FacebookProvider appId={config.fbAppId}>
                  <Page href="https://www.facebook.com/babypoom" />
                </FacebookProvider>
              </div>
              </>
              )
              }
            </span>
          </div>
        ),
      })
    : ''
}

export default connect(mapStateToProps)(Transition)

function mapStateToProps(state) {
  const {
    app: { steps, bpoom },
  } = state
  return { steps, bpoom }
}

const MSG = defineMessages({
  share: {
    id: 'transition.share',
    defaultMessage: `Je donne mon avis`,
  },
  share_babypoom_bt: {
    id: 'transition.share_babypoom_bt',
    defaultMessage: `💭 Partagez ce service à des futurs parents`,
  },
  share_babypoom_title: {
    id: 'transition.share_babypoom_title',
    defaultMessage: `Hello !`,
  },
  share_babypoom_description: {
    id: 'transition.share_babypoom_description',
    defaultMessage: `Voici un service intéressant d'annonce de naissance que je viens de découvrir, cela pourrait te plaire ;)`,
  },
  giftOffer: {
    id: 'transition.giftOffer',
    defaultMessage: `Envie d'offrir un cadeau original à bébé ? 🎁 `,
  },
})

const HACK_MSG = {
  to_souvenir_c562: `Cela m'a vraiment fait plaisir de faire connaissance avec toi... Et si vous souhaitez me gâter, papa et maman <a href="https://www.mesenvies.fr/liste-naissance/4535157">on fait une petite liste</a> pour vous aider. J'espère te revoir très bientôt`,
}
