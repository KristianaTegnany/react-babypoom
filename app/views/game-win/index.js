import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'

// Hooks
import useSlideshow from '../../hooks/slide-show'

// Components
import BubbleSay from '../../components/bubble-say'
import BubblePic from '../../components/bubble-pic'
import BpoomImg from '../../components/bpoom-img'
import Transition from '../../components/transition'

// Lib
import getPhoto from '../../../lib/get-photo'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Images
import BABY_IMAGES from '../../../lib/baby-img'

let GameWin = ({ bpoom, desktop, noNav, loadSlideshow, openSlideshow }) => {
  useSlideshow(bpoom, loadSlideshow, () => [
    { src: [getPhoto(bpoom.photo_urls, 'normal'), getPhoto(bpoom.photo_urls, 'thumbnail')] },
  ])

  let babyType = bpoom.baby_full_type
  return (
    <div styleName={['game-container', babyType].join(' ')}>
      {desktop ? (
        <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
          {t(MSG.win)} {noNav ? '' : <Transition />}
        </BubbleSay>
      ) : (
        [
          <BubblePic key="bubble" onClick={openSlideshow} imgSrc={getPhoto(bpoom.photo_urls, 'thumbnail')}>
            {t(MSG.win)} {noNav ? '' : <Transition />}
          </BubblePic>,
          <div key="text" styleName="mob-fullscreen">
            {t(MSG.mobile_fullscreen)}
          </div>,
        ]
      )}
      <div styleName="game">
        {desktop ? (
          <BpoomImg
            imgText={<a href="javascript:void(0)">{t(MSG.desktop_fullscreen)}</a>}
            onClick={openSlideshow}
            imgSrc={getPhoto(bpoom.photo_urls, 'thumbnail')}
          />
        ) : (
          ''
        )}
        <div styleName="panel">
          <div styleName="baby-name-container">
            <div>
              <div styleName="name">
                {Array.from(bpoom.babyNameFormatted).map((c, i) => {
                  return (
                    <div key={i} styleName="char">
                      <span>{c}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  { loadSlideshow, openSlideshow },
)(GameWin)

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return {
    bpoom,
    noNav,
    desktop,
  }
}

const MSG = defineMessages({
  win: {
    id: 'game.win',
    defaultMessage: 'Bravo ! Tu connais maintenant mon prénom. ',
  },
  desktop_fullscreen: {
    id: 'game.desktop_fullscreen',
    defaultMessage: 'Afficher en plein écran',
  },
  mobile_fullscreen: {
    id: 'game.mobile_fullscreen',
    defaultMessage: "Clique sur ma photo pour l'afficher en plein écran",
  },
})
