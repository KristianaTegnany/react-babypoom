import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { defineMessages } from 'react-intl'
import ReactGA from 'react-ga'
import Button from 'reactstrap/lib/Button'
import { stepPath } from '../../views/app/steps'
import config from '../../../config'
import t from '../../i18n/i18n'
import stepMsg from '../../i18n/messages/steps'
import './styles.scss'
import FaHeart from '../../icons/heart'

// TODO: button disabled until bpoom loaded
let Footer = ({ bpoom, desktop, steps, resetStars }) => {
  useEffect(() => {
    // temp feature for the best Inna friend
    if (bpoom.id!=13158) return
  }, [resetStars])
  return (
    <footer>
      <div styleName="nav">
        {steps.ok && steps.prev ? (
          <Button
            tag={Link}
            to={stepPath(steps.prev, bpoom)}
            aria-label={t(stepMsg[steps.prev])}
            block
            size="lg"
            color="secondary"
          >
            <span styleName="btn-dir-prev">&lt;</span> {t(stepMsg[steps.prev])}
          </Button>
        ) : (
          ''
        )}
        {steps.ok && steps.next ? (
          <Button
            tag={Link}
            to={stepPath(steps.next, bpoom)}
            aria-label={t(stepMsg[steps.next])}
            block
            size="lg"
            color="primary"
          >
            <span styleName="btn-dir-next">&gt;</span> {t(stepMsg[steps.next])}
          </Button>
        ) : (
          ''
        )}
      </div>
      <div styleName="made-with">
        {t(MSG.made_with_love, {
          love: (
            <i styleName="icon">
              <FaHeart />
            </i>
          ),
          link: desktop ? (
            <ReactGA.OutboundLink
              eventLabel={config.babypoomWebsiteLink}
              to={config.babypoomWebsiteLink}
              target="_blank"
            >
              {config.babypoomWebsiteShortLink}
            </ReactGA.OutboundLink>
          ) : (
            config.babypoomWebsiteShortLink
          ),
        })}
      </div>
    </footer>
  )
}

export default connect(mapStateToProps)(Footer)

function mapStateToProps(state) {
  const {
    app: { bpoom, steps },
    mediaQueries: { desktop },
  } = state
  return { bpoom, steps, desktop }
}

const MSG = defineMessages({
  made_with_love: {
    id: 'footer.made_with_love',
    defaultMessage: `Réalisé avec {love} sur {link}`,
  },
})
