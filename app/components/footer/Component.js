import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { defineMessages } from 'react-intl'

// Components
import Button from 'reactstrap/lib/Button'

import { stepPath } from '../../views/app/steps'

// Config
import config from '../../../config/application'

// i18n
import t from '../../i18n/i18n'
import stepMsg from '../../i18n/messages/steps'

// CSS
import styles from './styles.scss'

// Icon
import FaHeart from '../../icons/heart'

@connect(mapStateToProps)

// TODO: button disabled until bpoom loaded
export default class extends Component {
  render() {
    let props = this.props
    let bpoom = props.bpoom
    let steps = props.steps

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
          {t({
            ...MSG.made_with_love,
            values: {
              love: (
                <i styleName="icon">
                  <FaHeart />
                </i>
              ),
              link: props.desktop ? (
                <Link to={config.babypoomWebsiteLink} target="_blank">
                  {config.babypoomWebsiteShortLink}
                </Link>
              ) : (
                config.babypoomWebsiteShortLink
              ),
            },
          })}
        </div>
      </footer>
    )
  }
}

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
