import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { defineMessages } from 'react-intl'
import ReactGA from 'react-ga'

import ReactFBLike from 'react-fb-like'
import Button from 'reactstrap/lib/Button'

// Config
import config from '../../../config/application'

// i18n
import t from '../../i18n/i18n'
import stepMsg from '../../i18n/messages/steps'

// CSS
import styles from './styles.scss'

let Transition = ({ bpoom, steps }) => {
  useEffect(() => {
    if ('undefined' !== typeof FB) {
      FB.XFBML.parse()
      FB.Event.subscribe('edge.create', function(trackUrl) {
        ReactGA.ga('send', 'fb-like', trackUrl)
      })
    }
  }, [])

  if (!steps.ok) return ''

  let transitionId = `to_${steps.next || 'finish'}`
  let msg = stepMsg[transitionId]

  // Hack
  let hackMsg = HACK_MSG[`${transitionId}_${bpoom.uuid}`]
  if (hackMsg) return <span dangerouslySetInnerHTML={{ __html: hackMsg }} />

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
              <Button
                size="sm"
                tag={ReactGA.OutboundLink}
                eventLabel={config.shareLink}
                color="app"
                to={config.shareLink}
                target="_blank"
              >
                {t(MSG.share)}
              </Button>
            </span>

            <ReactFBLike
              language="fr_FR"
              appId={config.fbAppId}
              layout="button"
              action="like"
              size="large"
              showFaces="false"
              share="true"
              version="v2.9"
            />
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
})

const HACK_MSG = {
  to_souvenir_c562: `Cela m'a vraiment fait plaisir de faire connaissance avec toi... Et si vous souhaitez me gâter, papa et maman <a href="https://www.mesenvies.fr/liste-naissance/4535157">on fait une petite liste</a> pour vous aider. J'espère te revoir très bientôt`,
}
