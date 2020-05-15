import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import useTimeTracker from '../../hooks/time-tracker'

import { updateGuessed, gameOver } from './Actions'

import Button from 'reactstrap/lib/Button'

import BubbleSay from '../../components/bubble-say'
import BubblePic from '../../components/bubble-pic'
import BpoomImg from '../../components/bpoom-img'
import GameWin from '../game-win'

// i18n
import t from '../../i18n/i18n'

// Lib
import ascii from '../../../lib/ascii'
import pixelate from '../../../lib/pixelate'
import Ahoy from '../../../lib/ahoy-custom'
import getPhoto from '../../../lib/get-photo'

// CSS
import styles from './styles.scss'

// Images
import BABY_IMAGES from '../../../lib/baby-img'

const SPACE_REPLACEMENT = { ' ': '_' } // insecable space

function uniqChars(str) {
  return Object.keys(
    Array.from(ascii(str || '')).reduce((h, c) => {
      h[c] = 1
      return h
    }, {}),
  ).length
}

let EXPERIMENTAL = 'undefined' !== typeof window && 'experimental' === (window.location.hash || '').substr(1)

let Game1 = ({
  bpoom,
  desktop,
  pixelGridSize,
  pixels,
  win,
  gameOver,
  guessed,
  guessedOkCount,
  guessedKoCount,
  updateGuessed,
}) => {
  let babyName = bpoom.babyNameFormatted
  let letters = uniqChars(babyName)

  const [lastChar, setLastChar] = useState(null)
  const [picture, setPicture] = useState(null)

  // Timer
  let timeTracker = useTimeTracker()

  // Pixelate baby photo
  useEffect(() => {
    let resolution = (24 - (letters ? Math.round((guessedOkCount * 24) / letters) : 0)) * 2
    pixelate({ src: getPhoto(bpoom.photo_urls, 'thumbnail'), resolution, width: 100, height: 100 }, setPicture)
  }, [bpoom.photo_urls, guessedOkCount, letters])

  const imageStyles = () => {
    let pr = 100 / (pixelGridSize - 1)

    return {
      backgroundRepeat: 'no-repeat',
      backgroundImage:
        new Array(pixelGridSize * pixelGridSize)
          .fill(0)
          .map((_, i) => {
            let color = pixels.includes(i) ? 'var(--neutral-secondary)' : 'transparent'
            return `linear-gradient(to right,${color},${color})`
          })
          .join(',') + `,url(${getPhoto(bpoom.photo_urls, 'thumbnail')})`,
      backgroundSize:
        new Array(pixelGridSize * pixelGridSize)
          .fill(0)
          .map(() => `${103 / pixelGridSize}% ${103 / pixelGridSize}%`)
          .join(',') + ', cover',
      backgroundPosition:
        new Array(pixelGridSize * pixelGridSize)
          .fill(0)
          .map((_, index) => `${Math.floor(index / pixelGridSize) * pr}% ${(index % pixelGridSize) * pr}%`)
          .join(',') + ', 50% 50%',
    }
  }

  const handleClick = e => {
    timeTracker.start() // Will only start if it's not already started

    let elt = e.currentTarget
    let char = elt.getAttribute('data-char')
    setLastChar(char)
    updateGuessed({ letters, char, present: 'true' === elt.getAttribute('data-present') })
  }

  const renderGame = () => {
    let charset = (bpoom.game_charset || []).map(c => c.toUpperCase())
    let nameChars = Array.from(babyName)
    let asciiName = ascii(babyName)
    let asciiNameChars = Array.from(asciiName)
    if (charset.length)
      asciiNameChars.forEach(c => {
        if (charset.indexOf(c) < 0) charset.push(c)
      })

    let bubbleText = lastChar
      ? t(MSG['guessed_' + (asciiName.indexOf(lastChar) < 0 ? 'ko' : 'ok')], { char: lastChar })
      : t(MSG.message)

    let babyType = bpoom.baby_full_type
    let pic = EXPERIMENTAL ? null : picture
    let style = EXPERIMENTAL ? imageStyles() : {}

    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {bubbleText}
          </BubbleSay>
        ) : (
          <BubblePic style={style} imgSrc={pic}>
            {bubbleText}
          </BubblePic>
        )}
        <div styleName="game">
          {desktop ? <BpoomImg style={style} imgSrc={pic} /> : ''}
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
                    data-char={c}
                    data-present={asciiName.indexOf(c) >= 0}
                    onClick={played ? null : handleClick}
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

  if (letters && letters === guessedOkCount) {
    // User win \o/
    // Send statistics about game
    if (!timeTracker.elapsed) {
      timeTracker.stop()
      Ahoy.updateVisit({ game_time: timeTracker.elapsed, game_count: guessedKoCount })
    }
    setTimeout(gameOver, 1500) // trigger win in 1.5s
  }
  return win ? <GameWin /> : renderGame()
}

export default connect(
  mapStateToProps,
  { updateGuessed, gameOver },
)(Game1)

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
    id: 'game1.message',
    defaultMessage: 'Devine mon prénom et tu verras apparaître progressivement ma première photo...',
  },
  guessed_ok: {
    id: 'game1.guessed.ok',
    defaultMessage: 'Bravo, mon prénom contient bien la lettre "{char}" !',
  },
  guessed_ko: {
    id: 'game1.guessed.ko',
    defaultMessage: 'Hé non, mon prénom ne contient pas la lettre "{char}" !',
  },
})
