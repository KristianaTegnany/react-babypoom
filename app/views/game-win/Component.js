import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'

import BubbleSay from '../../components/bubble-say/Component'
import BubblePic from '../../components/bubble-pic/Component'
import BpoomImg from '../../components/bpoom-img/Component'
import Transition from '../../components/transition/Component'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

// Images
import BABY_IMAGES from '../../../lib/baby-img'

@connect(
  mapStateToProps,
  { loadSlideshow, openSlideshow }
)
export default class GameWin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bpoom: props.bpoom,
    }
    if (props.bpoom.photo) {
      props.loadSlideshow({ items: [{ src: props.bpoom.photo }] })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.bpoom.photo !== prevState.bpoom.photo) {
      nextProps.loadSlideshow({ items: [{ src: nextProps.bpoom.photo }] })
    }
    return { bpoom: nextProps.bpoom }
  }

  render() {
    let props = this.props
    let bpoom = props.bpoom
    let babyType = bpoom.baby_full_type

    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {t(MSG.win)} {props.noNav ? '' : <Transition />}
          </BubbleSay>
        ) : (
          [
            <BubblePic key="bubble" onClick={() => this.props.openSlideshow()} imgSrc={bpoom.photo_thumbnail}>
              {t(MSG.win)} {props.noNav ? '' : <Transition />}
            </BubblePic>,
            <div key="text" styleName="mob-fullscreen">
              {t(MSG.mobile_fullscreen)}
            </div>,
          ]
        )}
        <div styleName="game">
          {props.desktop ? (
            <BpoomImg
              imgText={<a href="javascript:void(0)">{t(MSG.desktop_fullscreen)}</a>}
              onClick={() => this.props.openSlideshow()}
              imgSrc={bpoom.photo_thumbnail}
            />
          ) : (
            ''
          )}
          <div styleName="panel">
            <div styleName="babyname-container">
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
}

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
