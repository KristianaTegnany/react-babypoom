import React from "react"
import Lottie from "react-lottie"
import FadeIn from "react-fade-in"
import * as logoAnimation from "./animate-bp-logo-magic.json"
import { defineMessages } from "react-intl"
import t from '../../i18n/i18n'
import "./styles.scss"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: logoAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

export default function Loading() {

  return (
    <div>
      <FadeIn>
        <div styleName="d-flex justify-content-center align-items-center">
          <div styleName="mx-auto font-sansita heading">
            {t(MSG.loading_title)}
          </div>
          <Lottie options={defaultOptions} />
        </div>
      </FadeIn>
    </div>
  )
}

const MSG = defineMessages({
  loading_title: {
    id: 'loading_title',
    defaultMessage: `Merci de patienter ...`,
  },
  loading_body: {
    id: 'loading_body',
    defaultMessage: `La magie opère ...`,
  },
})
