import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'
import { updateGuessed } from './Actions'

import Button from 'reactstrap/lib/Button'

import BubbleSay from '../../components/bubble-say/Component'
import BubblePic from '../../components/bubble-pic/Component'
import Bubble from '../../components/bubble/Component'
import BpoomImg from '../../components/bpoom-img/Component'
import Transition from '../../components/transition/Component'

// i18n
import t from '../../i18n/i18n'

// Lib
import ascii from '../../../lib/ascii'
import pixelate from '../../../lib/pixelate'
import TimeTracker from '../../../lib/time-tracker'
import Ahoy from '../../../lib/ahoy-custom'

// CSS
import styles from './styles.scss'

// Images
import BABY_IMAGES from '../../../lib/baby-img'

const SPACE_REPLACEMENT = { ' ': '_' } // insecable space

let timeTracker = new TimeTracker()

@connect(mapStateToProps, { updateGuessed, loadSlideshow, openSlideshow })
export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastChar: null,
      updateProps: false,
      bpoom: props.bpoom,
      guessed: props.guessed,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.bpoom.photo) {
      nextProps.loadSlideshow({ items: [{ src: nextProps.bpoom.photo }] })
    }
    return {
      bpoom: nextProps.bpoom,
      updateProps: prevState.bpoom !== nextProps.bpoom || nextProps.guessed !== prevState.guessed,
      guessed: nextProps.guessed,
    }
  }

  componentDidMount() {
    // Will only resume if it's already started
    timeTracker.resume()

    this.pixelatePicture(this.props)
  }

  componentDidUpdate(nextProps) {
    if (this.state.updateProps) {
      this.setState({ updateProps: false })
      this.pixelatePicture(this.props)
    }
  }

  componentWillUnmount() {
    timeTracker.pause()
  }

  pixelatePicture(props) {
    let { uniqueChars, okCount } = this.stats(props)
    let resolution = 24 - (uniqueChars ? Math.round(okCount * 24 / uniqueChars) : 0)
    pixelate(
      {
        src: props.bpoom.photo_thumbnail,
        resolution: resolution * 2,
        width: 100,
        height: 100,
      },
      picture => {
        this.setState({ picture })
      }
    )
  }

  stats(props) {
    let uniqueChars = Object.keys(
      Array.from(ascii(this.babyName(props))).reduce((h, c) => {
        h[c] = 1
        return h
      }, {})
    ).length
    let okCount = props.guessedOkCount
    let koCount = props.guessedKoCount
    return { uniqueChars, okCount, koCount }
  }

  babyName(props) {
    return (props.bpoom.babyname || '')
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .replace(/_+/g, '-')
      .trim()
  }

  handleClick(char, present) {
    if ([true, false].indexOf(this.props.guessed[char]) >= 0 || this.win()) {
      return
    }

    // Will only start if it's not already started
    timeTracker.start()

    this.setState({ lastChar: char }, () => {
      this.props.updateGuessed({ char, present })
    })
  }

  win() {
    let { uniqueChars, okCount, koCount } = this.stats(this.props)
    let over = uniqueChars && uniqueChars === okCount

    // Send statistics about game
    if (over && !timeTracker.elapsed) {
      timeTracker.stop()
      Ahoy.updateVisit({
        game_time: timeTracker.elapsed,
        game_count: koCount,
      })
    }
    return over
  }

  render() {
    return this.win() ? this.renderWin() : this.renderGame()
  }

  renderWin() {
    let props = this.props
    let babyType = props.bpoom.baby_full_type

    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {t(MSG.win)} {props.noNav ? '' : <Transition />}
          </BubbleSay>
        ) : (
          [
            <BubblePic key="bubble" onClick={() => this.props.openSlideshow()} imgSrc={props.bpoom.photo_thumbnail}>
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
              imgSrc={this.state.picture}
            />
          ) : (
            ''
          )}
          <div styleName="panel">
            <div styleName="babyname-container">
              <div>
                <div styleName="name">
                  {Array.from(this.babyName(props)).map((c, i) => {
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

  renderGame() {
    let props = this.props
    let guessed = props.guessed
    let bpoom = props.bpoom
    let bp_game = bpoom.bp_game || {}
    let charset = (bp_game.charset || []).map(c => c.toUpperCase())
    let name = this.babyName(props)
    let nameChars = Array.from(name)
    let asciiName = ascii(name)
    let asciiNameChars = Array.from(asciiName)
    if (charset.length) {
      asciiNameChars.forEach(c => {
        if (charset.indexOf(c) < 0) charset.push(c)
      })
    }
    let lastChar = this.state.lastChar
    let bubbleText = lastChar
      ? t({
          ...MSG['guessed_' + (asciiName.indexOf(lastChar) < 0 ? 'ko' : 'ok')],
          values: { char: lastChar },
        })
      : bp_game.message
    let babyType = bpoom.baby_full_type

    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {bubbleText}
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={this.state.picture}>{bubbleText}</BubblePic>
        )}
        <div styleName="game">
          {props.desktop ? <BpoomImg imgSrc={this.state.picture} /> : ''}
          <div styleName="panel">
            <div styleName="name">
              {asciiNameChars.map((c, index) => {
                return (
                  <div key={index} styleName={['char', guessed[c] ? '' : 'ko'].join(' ')}>
                    <span>{nameChars[index]}</span>
                  </div>
                )
              })}
            </div>
            <div styleName="charset">
              {charset.map(c => {
                let klass = ['char']
                if (true === guessed[c]) {
                  klass.push('ok')
                }
                if (false === guessed[c]) {
                  klass.push('ko')
                }
                let present = asciiName.indexOf(c) >= 0
                return (
                  <div key={c} onClick={this.handleClick.bind(this, c, present)} styleName={klass.join(' ')}>
                    <div styleName="content">{SPACE_REPLACEMENT[c] || c}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, noNav }, game: { guessed, guessedOkCount, guessedKoCount }, mediaQueries: { desktop } } = state
  return {
    bpoom,
    noNav,
    guessed,
    guessedOkCount,
    guessedKoCount,
    desktop,
  }
}

const MSG = defineMessages({
  guessed_ok: {
    id: 'game.guessed.ok',
    defaultMessage: 'Bravo, mon prénom contient bien la lettre "{char}" !',
  },
  guessed_ko: {
    id: 'game.guessed.ko',
    defaultMessage: 'Hé non, mon prénom ne contient pas la lettre "{char}" !',
  },
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
