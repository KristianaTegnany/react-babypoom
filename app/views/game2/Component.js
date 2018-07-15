import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import { move, gameOver } from './Actions'

import Button from 'reactstrap/lib/Button'

import BubbleSay from '../../components/bubble-say/Component'
import BubblePic from '../../components/bubble-pic/Component'
import GameWin from '../game-win/Component'

// i18n
import t from '../../i18n/i18n'

// Lib
import TimeTracker from '../../../lib/time-tracker'
import Ahoy from '../../../lib/ahoy-custom'
import { transformProp } from '../../../lib/css-props'

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

let timeTracker = new TimeTracker()
let tries = 0

@connect(
  mapStateToProps,
  { move, gameOver }
)
export default class Game2 extends Component {
  constructor(props) {
    super(props)
    if (!props.puzzle.length) {
      let d = new Date()
      this.props.move(this.randomPuzzle())
    }
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.puzzle.length
  }

  componentDidMount() {
    // Will only resume if it's already started
    timeTracker.resume()
  }

  componentWillUnmount() {
    timeTracker.pause()
  }

  randomPuzzle() {
    // Create an array like this:
    // [[8, 7, 6], [5, 4, 3], [2, 1, 0]]
    if (++tries > 1250) return DEFAULT
    let puzzle = []
    let len = SIZE * SIZE
    for (let i = 0; i < SIZE; ++i) {
      puzzle[i] = new Array(SIZE).fill(0).map((x, i) => --len)
    }
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

      this.switch(puzzle, x1, y1, x2, y2)
      if (steps.includes(puzzle.toString())) {
        this.switch(puzzle, x2, y2, x1, y1)
      } else {
        steps.push(puzzle.toString())
        x1 = x2
        y1 = y2
      }
    }
    return !this.checkRandom(puzzle)
      ? this.randomPuzzle()
      : { puzzle, steps, stepLen: steps.length, currentX: x1, currentY: y1 }
  }

  checkRandom(arr) {
    let count = 0
    let index = SIZE * SIZE
    for (let i = 0; i < SIZE; ++i)
      for (let j = 0; j < SIZE; ++j) {
        if (arr[i][j] == --index) ++count
        if (this.checkFollowingCases(arr, i, j)) return false
      }

    return count < 2
  }

  checkFollowingCases(arr, i, j) {
    let c = arr[i][j]
    return (
      [arr[i][j - 1], arr[i][j + 1]].some(adj => c === adj - 1 || c === adj + 1) ||
      [(arr[i - 1] || [])[j], (arr[i + 1] || [])[j]].some(adj => c === adj - SIZE || c === adj + SIZE)
    )
  }

  switch(arr, x1, y1, x2, y2, cb) {
    let tmp = arr[x1][y1]
    arr[x1][y1] = arr[x2][y2]
    arr[x2][y2] = tmp
    if (cb) cb(arr)
  }

  switchMany(arr, x1, y1, x2, y2, cb) {
    let diff = x1 < x2 ? 1 : -1
    let i = x1
    while (i !== x2) this.switch(arr, i, y1, (i += diff), y1, cb)
    diff = y1 < y2 ? 1 : -1
    i = y1
    while (i !== y2) this.switch(arr, x1, i, x1, (i += diff), cb)
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
  }

  checkStep(step) {
    let steps = this.props.steps
    let index = steps.indexOf(step)
    if (index < 0) {
      steps.push(step)
    } else {
      steps = steps.slice(0, index + 1)
    }
    return steps
  }

  move(x, y) {
    if (this.win()) return

    // Will only start if it's not already started
    timeTracker.start()

    let { currentX, currentY, puzzle, moves, steps } = this.props
    if (!(currentX === x && currentY === y) && (currentX === x || currentY === y)) {
      let count = this.switchMany(puzzle, currentX, currentY, x, y, arr => {
        steps = this.checkStep(puzzle.toString())
      })
      this.props.move({ puzzle, steps, currentX: x, currentY: y, moves: moves + count })
    }
  }

  win() {
    let count = SIZE * SIZE
    let { puzzle, moves } = this.props
    if (!puzzle.length) return false
    for (let i = 0; i < SIZE; ++i) for (let j = 0; j < SIZE; ++j) if (puzzle[i][j] !== --count) return false

    if (!timeTracker.elapsed) {
      timeTracker.stop()
      Ahoy.updateVisit({
        game_time: timeTracker.elapsed,
        game_count: moves,
      })
    }
    return true
  }

  render() {
    if (this.win()) setTimeout(() => this.props.gameOver(), 1500)
    return this.props.win ? <GameWin /> : this.renderGame()
  }

  detectPosition(arr, n) {
    for (let i = 0; i < SIZE; ++i) for (let j = 0; j < SIZE; ++j) if (n === arr[i][j]) return [i, j]
    return []
  }

  help(remain) {
    let moves = this.props.moves
    let steps = this.props.steps
    if (steps.length <= 1) return
    if (null == remain) {
      remain = Math.floor(Math.max(steps.length / 2, this.props.stepLen / 2))
    }
    let puzzle = steps.pop()
    if (this.props.puzzle.toString() === puzzle) puzzle = steps.pop()
    puzzle = puzzle.split(',').reduce((acc, n, index) => {
      let i = Math.floor(index / 3)
      acc[i] = acc[i] || []
      acc[i].push(+n)
      return acc
    }, [])
    let [currentX, currentY] = this.detectPosition(puzzle, 0)
    this.props.move({ puzzle, currentX, currentY, steps, moves: moves + 2 })

    if (remain <= 1) return
    setTimeout(() => {
      this.help(remain - 1)
    }, 100)
  }

  renderCases() {
    let len = SIZE * SIZE
    let cases = []
    let photo = this.props.bpoom.photo
    let puzzle = this.props.puzzle
    let positionRatio = 100 / (SIZE - 1)

    if (!puzzle.length) return []

    let win = this.win()

    for (let i = 0; i < len; ++i) {
      let [x, y] = this.detectPosition(puzzle, i)
      cases.push(
        <div
          onTouchStart={() => {
            this.touching = true
            this.move(x, y)
          }}
          onTouchEnd={() => (this.touching = false)}
          onMouseDown={() => this.move(x, y)}
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
        />
      )
    }
    return cases
  }

  renderGame() {
    let props = this.props
    let bpoom = props.bpoom
    let babyType = bpoom.baby_full_type

    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {t(MSG.message)}
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={BABY_IMAGES[babyType]}>{t(MSG.message)}</BubblePic>
        )}
        <div styleName="puzzle-container">
          <div styleName="puzzle">{this.renderCases()}</div>
          {props.steps.length > 1 && (
            <span styleName="help" onClick={() => this.help()}>
              {t(MSG.help)}
            </span>
          )}
        </div>
      </div>
    )
  }
}

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
    id: 'game.message',
    defaultMessage: 'Clique sur les cases afin de résoudre ce puzzle et je te dirai mon prénom...',
  },
  help: {
    id: 'game.help',
    defaultMessage: `Aide-moi un peu, je n'y arrive pas...`,
  },
})
