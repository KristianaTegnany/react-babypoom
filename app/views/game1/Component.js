import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import { updateGuessed, gameOver } from './Actions'

import Button from 'reactstrap/lib/Button'

import BubbleSay from '../../components/bubble-say/Component'
import BubblePic from '../../components/bubble-pic/Component'
import BpoomImg from '../../components/bpoom-img/Component'
import GameWin from '../game-win/Component'

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

function uniqChars(str) {
  return Object.keys(
    Array.from(ascii(str || '')).reduce((h, c) => {
      h[c] = 1
      return h
    }, {})
  ).length
}

let EXPERIMENTAL = 'undefined' !== typeof window && 'experimental' === (window.top.location.hash || '').substr(1)

@connect(
  mapStateToProps,
  { updateGuessed, gameOver }
)
export default class Game1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastChar: null,
      updateProps: false,
      bpoom: props.bpoom,
      guessed: props.guessed,
      letters: uniqChars(props.bpoom.babyNameFormatted),
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      bpoom: nextProps.bpoom,
      updateProps: prevState.bpoom !== nextProps.bpoom || nextProps.guessed !== prevState.guessed,
      guessed: nextProps.guessed,
      letters: uniqChars(nextProps.bpoom.babyNameFormatted),
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
    let resolution = 24 - (uniqueChars ? Math.round((okCount * 24) / uniqueChars) : 0)
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
    return { uniqueChars: this.state.letters, okCount: props.guessedOkCount, koCount: props.guessedKoCount }
  }

  handleClick(char, present) {
    // Will only start if it's not already started
    timeTracker.start()

    this.setState({ lastChar: char })
    this.props.updateGuessed({ letters: this.state.letters, char, present })
  }

  win() {
    let { uniqueChars, okCount, koCount } = this.stats(this.props)
    if (!(uniqueChars && uniqueChars === okCount)) return false

    // Send statistics about game
    if (!timeTracker.elapsed) {
      timeTracker.stop()
      Ahoy.updateVisit({
        game_time: timeTracker.elapsed,
        game_count: koCount,
      })
    }
    return true
  }

  render() {
    if (this.win()) setTimeout(() => this.props.gameOver(), 1500)
    return this.props.win ? <GameWin /> : this.renderGame()
  }

  imageStyles() {
    let gridSize = this.props.pixelGridSize
    let pr = 100 / (gridSize - 1)
    let pixels = this.props.pixels

    return {
      backgroundRepeat: 'no-repeat',
      backgroundImage:
        new Array(gridSize * gridSize)
          .fill(0)
          .map((_, i) => {
            let color = pixels.includes(i) ? 'var(--neutral-secondary)' : 'transparent'
            return `linear-gradient(to right,${color},${color})`
          })
          .join(',') + `,url(${this.props.bpoom.photo_thumbnail})`,
      backgroundSize:
        new Array(gridSize * gridSize)
          .fill(0)
          .map(() => `${103 / gridSize}% ${103 / gridSize}%`)
          .join(',') + ', 100% 100%',
      backgroundPosition:
        new Array(gridSize * gridSize)
          .fill(0)
          .map((_, index) => `${Math.floor(index / gridSize) * pr}% ${(index % gridSize) * pr}%`)
          .join(',') + ', 0 0',
    }
  }

  renderGame() {
    let props = this.props
    let guessed = props.guessed
    let bpoom = props.bpoom
    let bp_game = bpoom.bp_game || {}
    let charset = (bp_game.charset || []).map(c => c.toUpperCase())
    let name = props.bpoom.babyNameFormatted
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
      : t(MSG.message)
    let babyType = bpoom.baby_full_type

    let picture = EXPERIMENTAL ? null : this.state.picture
    let style = EXPERIMENTAL ? this.imageStyles() : {}

    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {bubbleText}
          </BubbleSay>
        ) : (
          <BubblePic style={style} imgSrc={picture}>
            {bubbleText}
          </BubblePic>
        )}
        <div styleName="game">
          {props.desktop ? <BpoomImg style={style} imgSrc={picture} /> : ''}
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
                let played = Boolean(guessed[c]) === guessed[c]
                return (
                  <div
                    key={c}
                    onClick={played ? null : this.handleClick.bind(this, c, asciiName.indexOf(c) >= 0)}
                    styleName={`char ${played ? (guessed[c] ? 'ok' : 'ko') : ''}`}
                  >
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
  const {
    app: { bpoom, noNav },
    game1: { pixelGridSize, pixels, guessed, guessedOkCount, guessedKoCount, win },
    mediaQueries: { desktop },
  } = state
  return {
    bpoom,
    noNav,
    pixelGridSize,
    pixels,
    guessed,
    guessedOkCount,
    guessedKoCount,
    win,
    desktop,
  }
}

const MSG = defineMessages({
  message: {
    id: 'game.message',
    defaultMessage: 'Devine mon prénom et tu verras apparaître progressivement ma première photo...',
  },
  guessed_ok: {
    id: 'game.guessed.ok',
    defaultMessage: 'Bravo, mon prénom contient bien la lettre "{char}" !',
  },
  guessed_ko: {
    id: 'game.guessed.ko',
    defaultMessage: 'Hé non, mon prénom ne contient pas la lettre "{char}" !',
  },
})
