import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { defineMessages } from 'react-intl'

import ReactFBLike from 'react-fb-like'
import Button from 'reactstrap/lib/Button'

// Config
import config from '../../../config/application'

// i18n
import t from '../../i18n/i18n'
import stepMsg from '../../i18n/messages/steps'

// CSS
import styles from './styles.scss'

@connect(mapStateToProps)
export default class extends Component {
  componentDidMount() {
    // FB like button is rendered only once otherwise
    if ('undefined' !== typeof FB) FB.XFBML.parse()
  }

  render() {
    let props = this.props
    let steps = props.steps
    let transitionId = `to_${steps.next || 'finish'}`

    return steps.ok && stepMsg[transitionId]
      ? t({
          ...stepMsg[transitionId],
          values: {
            link: (
              <Link to={config.babypoomWebsiteLink} target="_blank">
                {config.babypoomWebsiteShortLink}
              </Link>
            ),
            share: (
              <div styleName="share-container">
                <ReactFBLike
                  language="fr_FR"
                  appId={config.fbAppId}
                  layout="button"
                  action="like"
                  size="large"
                  showFaces="false"
                  share="true"
                  version="v2.8"
                />
                <span styleName="share">
                  <Button size="sm" color="app" tag={Link} to={config.shareLink} target="_blank">
                    {t(MSG.share)}
                  </Button>
                </span>
              </div>
            ),
          },
        })
      : ''
  }
}

function mapStateToProps(state) {
  const { app: { steps } } = state
  return { steps }
}

const MSG = defineMessages({
  share: {
    id: 'transition.share',
    defaultMessage: `Je donne mon avis`,
  },
})
