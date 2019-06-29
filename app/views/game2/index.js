import React, { Component } from 'react'
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

const SIZE = 3

const DEFAULT = {
  puzzle: [[0, 8, 6], [2, 7, 4], [1, 5, 3]],
  steps: [
    '8,7,6,5,4,3,2,1,0',
    '8,7,6,5,4,0,2,1,3',
    '8,7,6,5,0,4,2,1,3',
    '8,7,6,0,5,4,2,1,3',
    '8,7,6,2,5,4,0,1,3',
    '8,7,6,2,5,4,1,0,3',
    '8,7,6,2,0,4,1,5,3',
    '8,0,6,2,7,4,1,5,3',
    '0,8,6,2,7,4,1,5,3',
  ],
  stepLen: 9,
  currentX: 0,
  currentY: 0,
}

const LEVELS = { easy: 12, medium: 40, hard: 100 }
const CURRENT_LEVEL = LEVELS.easy

let tries = 0

let Game2 = ({ bpoom, desktop, win, currentX, currentY, puzzle, moves, steps, stepLen, move, gameOver }) => {
  // Timer
  let timeTracker = useTimeTracker()

  const randomPuzzle = () => {
    // Create an array like this:
    // [[8, 7, 6], [5, 4, 3], [2, 1, 0]]
    if (++tries > 1250) return DEFAULT
    let puzzle = []
    let len = SIZE * SIZE
    for (let i = 0; i < SIZE; ++i) puzzle[i] = new Array(SIZE).fill(0).map((x, i) => --len)
    let steps = [puzzle.toString()]
    // Invert positions
    let x1 = SIZE - 1
    let y1 = SIZE - 1
    let x2, y2, moveX, diff
    for (let i = 0; i < CURRENT_LEVEL; ++i) {
      do {
        if (0 === Math.floor(Math.random() * 2)) {
          x2 = Math.max(0, Math.min(SIZE - 1, x1 + (Math.floor(Math.random() * 2) || -1)))
          y2 = y1
        } else {
          x2 = x1
          y2 = Math.max(0, Math.min(SIZE - 1, y1 + (Math.floor(Math.random() * 2) || -1)))
        }
      } while (x1 === x2 && y1 === y2)

      switchParts(puzzle, x1, y1, x2, y2)
      if (steps.includes(puzzle.toString())) {
        switchParts(puzzle, x2, y2, x1, y1)
      } else {
        steps.push(puzzle.toString())
        x1 = x2
        y1 = y2
      }
    }
    return !checkRandom(puzzle) ? randomPuzzle() : { puzzle, steps, stepLen: steps.length, currentX: x1, currentY: y1 }
  }

  const checkRandom = arr => {
    let count = 0
    let index = SIZE * SIZE
    for (let i = 0; i < SIZE; ++i)
      for (let j = 0; j < SIZE; ++j) {
        if (arr[i][j] == --index) ++count
        if (checkFollowingParts(arr, i, j)) return false
      }
    return count < 2
  }

  // Too easy if 2 parts "stays together"
  const checkFollowingParts = (arr, i, j) => {
    let c = arr[i][j]
    return (
      [arr[i][j - 1], arr[i][j + 1]].some(adj => c === adj - 1 || c === adj + 1) ||
      [(arr[i - 1] || [])[j], (arr[i + 1] || [])[j]].some(adj => c === adj - SIZE || c === adj + SIZE)
    )
  }

  const switchParts = (arr, x1, y1, x2, y2, cb) => {
    ;[arr[x1][y1], arr[x2][y2]] = [arr[x2][y2], arr[x1][y1]]
    if (cb) cb(arr)
  }

  const switchManyParts = (arr, x1, y1, x2, y2, cb) => {
    let diff = x1 < x2 ? 1 : -1
    let i = x1
    while (i !== x2) switchParts(arr, i, y1, (i += diff), y1, cb)
    diff = y1 < y2 ? 1 : -1
    i = y1
    while (i !== y2) switchParts(arr, x1, i, x1, (i += diff), cb)
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
  }

  const detectPosition = (arr, n) => {
    for (let i = 0; i < SIZE; ++i) for (let j = 0; j < SIZE; ++j) if (n === arr[i][j]) return [i, j]
    return []
  }

  const checkStep = step => {
    let index = steps.indexOf(step)
    if (index < 0) {
      steps.push(step)
    } else {
      steps.splice(index + 1)
    }
    return steps
  }

  const moveParts = e => {
    if (puzzleSolved()) return

    // Will only start if it's not already started
    timeTracker.start()

    let elt = e.currentTarget
    let x = +elt.getAttribute('data-x')
    let y = +elt.getAttribute('data-y')

    if (!(currentX === x && currentY === y) && (currentX === x || currentY === y)) {
      let count = switchManyParts(puzzle, currentX, currentY, x, y, arr => {
        steps = checkStep(puzzle.toString())
      })
      move({ puzzle, steps, currentX: x, currentY: y, moves: moves + count })
    }
  }

  const help = remain => {
    if (steps.length <= 1) return
    if (null == remain) remain = Math.floor(Math.max(steps.length / 2, stepLen / 2))
    let stepPuzzle = steps.pop()
    if (puzzle.toString() === stepPuzzle) stepPuzzle = steps.pop()
    stepPuzzle = stepPuzzle.split(',').reduce((acc, n, index) => {
      let i = Math.floor(index / 3)
      ;(acc[i] = acc[i] || []).push(+n)
      return acc
    }, [])
    let [currentX, currentY] = detectPosition(stepPuzzle, 0)
    move({ puzzle: stepPuzzle, currentX, currentY, steps, moves: moves + 2 })
    if (remain > 1) setTimeout(() => help(remain - 1), 100)
  }

  const puzzleSolved = () => {
    if (!puzzle.length) return false
    for (let i = 0, count = SIZE * SIZE; i < SIZE; ++i)
      for (let j = 0; j < SIZE; ++j) if (puzzle[i][j] !== --count) return false
    return true
  }

  const renderParts = () => {
    if (!puzzle.length) return []
    let len = SIZE * SIZE
    let cases = []
    let photo = getPhoto(bpoom.photo_urls, 'normal')
    let positionRatio = 100 / (SIZE - 1)
    let win = puzzleSolved()

    for (let i = 0; i < len; ++i) {
      let [x, y] = detectPosition(puzzle, i)
      cases.push(
        <div
          data-x={x}
          data-y={y}
          onTouchStart={moveParts}
          onMouseDown={moveParts}
          style={{
            width: `${100 / SIZE}%`,
            paddingTop: `${100 / SIZE}%`,
            background: `white url(${photo}) no-repeat`,
            backgroundSize: `${SIZE * 100}%`,
            backgroundPosition: `${Math.floor((len - i - 1) / SIZE) * positionRatio}% ${((len - i - 1) % SIZE) *
              positionRatio}%`,
            opacity: i || win ? '1' : '0',
            [transformProp]: `translate(${x * 100}%, ${y * 100}%)`,
          }}
          key={i}
        />,
      )
    }
    return cases
  }

  const renderGame = () => {
    let babyType = bpoom.baby_full_type
    let bubbleText = t(MSG.message)

    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {bubbleText}
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={BABY_IMAGES[babyType]}>{bubbleText}</BubblePic>
        )}
        <div styleName="puzzle-container">
          <div styleName="puzzle">{renderParts()}</div>
          {steps.length > 1 && (
            <span styleName="help" onClick={() => help()}>
              {t(MSG.help)}
            </span>
          )}
        </div>
      </div>
    )
  }

  if (!puzzle.length) move(randomPuzzle())

  if (puzzleSolved()) {
    // User win \o/
    // Send statistics about game
    if (!timeTracker.elapsed) {
      timeTracker.stop()
      Ahoy.updateVisit({ game_time: timeTracker.elapsed, game_count: moves })
    }
    setTimeout(gameOver, 1500) // trigger win in 1.5s
  }
  return win ? <GameWin /> : renderGame()
}

export default connect(
  mapStateToProps,
  { move, gameOver },
)(Game2)

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    game2: { puzzle, moves, steps, stepLen, currentX, currentY, win },
    mediaQueries: { desktop },
  } = state
  return {
    bpoom,
    noNav,
    puzzle,
    steps,
    stepLen,
    currentX,
    currentY,
    moves,
    win,
    desktop,
  }
}

const MSG = defineMessages({
  message: {
    id: 'game2.message',
    defaultMessage: 'Clique sur les cases afin de résoudre ce puzzle et je te dirai mon prénom...',
  },
  help: {
    id: 'game2.help',
    defaultMessage: `Aide-moi un peu, je n'y arrive pas...`,
  },
})
