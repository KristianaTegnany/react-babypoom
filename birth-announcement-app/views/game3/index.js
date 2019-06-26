import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import useTimeTracker from '../../hooks/time-tracker'

import { move, gameOver } from './Actions'

import Button from 'reactstrap/lib/Button'

import BubbleSay from '../../components/bubble-say'
import BubblePic from '../../components/bubble-pic'

import GameWin from '../game-win'

// i18n
import t from '../../i18n/i18n'

// Lib
import Ahoy from '../../../lib/ahoy-custom'
import { transformProp } from '../../../lib/css-props'
import getPhoto from '../../../lib/get-photo'

// CSS
import styles from './styles.scss'

// Images
import BABY_IMAGES from '../../../lib/baby-img'
import Puzzle1 from './puzzle-1'
import Puzzle2 from './puzzle-2'
import Puzzle3 from './puzzle-3'
import Puzzle4 from './puzzle-4'

let INIT_POS = [
  [['-96%', '180%', 3], ['-83%', '-30%', 7], ['-90%', '20%', 11], ['-96%', '-80%', 4]],
  [['-156%', '120%', 6], ['-153%', '100%', 13], ['-150%', '-120%', 16], ['-156%', '-150%', 12]],
  [['-216%', '120%', 15], ['-213%', '0%', 9], ['-210%', '-120%', 8], ['-216%', '-10%', 5]],
  [['-266%', '120%', 2], ['-267%', '-60%', 10], ['-270%', '40%', 14], ['-267%', '-150%', 1]],
]
let ZINDEX = 100
let UNIQ_KEY = 0

const preventDefault = event => {
  let e = event.touches[0]
  if (
    document.elementFromPoint
      ? document.elementFromPoint(e.clientX, e.clientY).closest('.' + styles['puzzle-wrapper'])
      : e.clientY > 170
  )
    event.preventDefault()
}

let Game3 = ({ bpoom, desktop, win, pieces, moves, move, gameOver }) => {
  let timeTracker = useTimeTracker()

  // Prevent mobile pull-down refresh
  useEffect(() => {
    let root = document.getElementById('root')
    root.addEventListener('touchmove', preventDefault, { passive: false })
    return () => root.removeEventListener('touchmove', preventDefault)
  }, [])

  let selectedPiece
  let mouseLastPos

  const pieceDown = e => {
    if (selectedPiece) pieceUp()
    let elt = (e.targetTouches ? e.targetTouches[0] : e).target
    if (!elt.matches('path')) return
    e.stopPropagation()
    e.preventDefault()
    elt = elt.parentNode
    let [x, y] = [+elt.getAttribute('data-x'), +elt.getAttribute('data-y')]
    let [xp, yp] = pieces[x][y].slice(0, 2).map(x => +x.slice(0, -1))
    let transform = elt.style[transformProp]
    let dim = elt
    if (elt.getBoundingClientRect) dim = elt.getBoundingClientRect()
    let [w, h] = [dim.width, dim.height]
    let [posX, posY] = [(xp * w) / 100, (yp * h) / 100]
    elt.style[transformProp] = `translate(${posX}px, ${posY}px)`
    elt.style.zIndex = ZINDEX++
    selectedPiece = { style: elt.style, w, h, posX, posY, x, y }
    mouseLastPos = null
  }

  const pieceMove = e => {
    if (!selectedPiece) return
    e.preventDefault()

    // Will only start if it's not already started
    timeTracker.start()

    let event = e.touches ? e.touches[0] : e
    let clientX = event.clientX
    let clientY = event.clientY
    let lastPos = mouseLastPos
    if (lastPos) {
      let piece = selectedPiece
      let diffX = lastPos.x - clientX
      let diffY = lastPos.y - clientY
      let newPosX = piece.posX - diffX
      let newPosY = piece.posY - diffY
      piece.style[transformProp] = `translate(${newPosX}px, ${newPosY}px)`
      piece.posX = newPosX
      piece.posY = newPosY
    }
    mouseLastPos = { x: clientX, y: clientY }
  }

  const pieceUp = e => {
    if (selectedPiece) {
      e.preventDefault()
      let selected = selectedPiece
      selectedPiece = null
      let newPosX = round((selected.posX * 100) / selected.w)
      let newPosY = round((selected.posY * 100) / selected.h)
      let allPieces = pieces.slice(0)
      let piece = allPieces[selected.x][selected.y]
      let add = 0
      if (piece[0] !== `${newPosX}%` || piece[1] !== `${newPosY}%`) ++add
      allPieces[selected.x][selected.y] = [`${newPosX}%`, `${newPosY}%`, selected.style.zIndex]
      move({ pieces: allPieces, moves: moves + add })
    }
  }

  const puzzleStyle = (x, y) => {
    let p = pieces[x][y]
    return { [transformProp]: `translate(${p[0]},${p[1]})`, zIndex: p[2] }
  }

  const round = x => {
    let step = 62
    return x < 0 ? Math.floor((x + step / 2) / step) * step : Math.ceil((x - step / 2) / step) * step
  }

  const puzzleSolved = () => {
    if (!pieces.length) return false
    let previousCase
    return !pieces.some(row =>
      row.some(c => {
        let result = previousCase ? previousCase[0] !== c[0] || previousCase[1] !== c[1] : false
        previousCase = c
        return result
      }),
    )
  }

  if (!pieces.length) {
    // let pieces = INIT_POS.slice(0)
    // pieces.forEach((row, i) =>
    //   row.forEach((c, j) => {
    //     if (i || j) {
    //       c[0] = '0%'
    //       c[1] = '0%'
    //     }
    //   })
    // )
    move({ pieces: INIT_POS })
  }

  const renderGame = () => {
    let babyType = bpoom.baby_full_type
    let bubbleText = t(MSG.message)

    let img = getPhoto(bpoom.photo_urls, 'normal')
    let xy = [19, -43, -105, -167]
    let win = puzzleSolved()
    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {bubbleText}
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={BABY_IMAGES[babyType]}>{bubbleText}</BubblePic>
        )}
        <div
          styleName={`puzzle-container ${win ? 'win' : ''}`}
          onMouseDown={pieceDown}
          onMouseMove={pieceMove}
          onMouseUp={pieceUp}
          onTouchStart={pieceDown}
          onTouchMove={pieceMove}
          onTouchEnd={pieceUp}
          onMouseLeave={pieceUp}
        >
          <div styleName="puzzle-wrapper">
            {pieces.length && (
              <div styleName="puzzle" style={{ backgroundImage: win ? `url(${img})` : 'none' }}>
                {[
                  [Puzzle1, 90],
                  [Puzzle3, 180],
                  [Puzzle4, 180],
                  [Puzzle1, 180],
                  [Puzzle4, 90],
                  [Puzzle2, 0],
                  [Puzzle2, 90],
                  [Puzzle3, 270],
                  [Puzzle3, 90],
                  [Puzzle2, 90],
                  [Puzzle2, 0],
                  [Puzzle4, 270],
                  [Puzzle1, 0],
                  [Puzzle4, 0],
                  [Puzzle3, 0],
                  [Puzzle1, 270],
                ].map((info, i) => {
                  let x = i % 4
                  let y = Math.floor(i / 4)
                  let Component = info[0]
                  return (
                    <Component
                      key={`${++UNIQ_KEY}-${i}`}
                      rotate={info[1]}
                      img={img}
                      data-x={x}
                      data-y={y}
                      x={xy[x]}
                      y={xy[y]}
                      style={puzzleStyle(x, y)}
                      styleName={`piece c${x + 1} r${y + 1}`}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (puzzleSolved()) {
    // User win \o/
    // Send statistics about game
    if (!timeTracker.elapsed) {
      timeTracker.stop()
      Ahoy.updateVisit({ game_time: timeTracker.elapsed, game_count: moves })
    }
    // Position the pieces correctly. Just in case
    ;(pieces = pieces.slice(0)).forEach(row => row.forEach(c => (c[0] = c[1] = '0%')))
    setTimeout(() => move({ pieces }), 0)

    setTimeout(gameOver, 1500) // trigger win in 1.5s
  }
  return win ? <GameWin /> : renderGame()
}

export default connect(
  mapStateToProps,
  { move, gameOver },
)(Game3)

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    game3: { pieces, moves, win },
    mediaQueries: { desktop },
  } = state
  return {
    bpoom,
    noNav,
    pieces,
    moves,
    win,
    desktop,
  }
}

const MSG = defineMessages({
  message: {
    id: 'game3.message',
    defaultMessage: `Bouge les pièces afin d'assembler ce puzzle et je te dirai mon prénom...`,
  },
})
