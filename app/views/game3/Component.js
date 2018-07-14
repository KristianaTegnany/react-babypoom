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
import Puzzle1 from './puzzle-1'
import Puzzle2 from './puzzle-2'
import Puzzle3 from './puzzle-3'
import Puzzle4 from './puzzle-4'

let timeTracker = new TimeTracker()

let INIT_POS = [
  [['-96%', '180%', 3], ['-83%', '-30%', 7], ['-90%', '20%', 11], ['-96%', '-80%', 4]],
  [['-156%', '120%', 6], ['-153%', '100%', 13], ['-150%', '-120%', 16], ['-156%', '-150%', 12]],
  [['-216%', '120%', 15], ['-213%', '0%', 9], ['-210%', '-120%', 8], ['-216%', '-10%', 5]],
  [['-266%', '120%', 2], ['-267%', '-60%', 10], ['-270%', '40%', 14], ['-267%', '-150%', 1]],
]
let ZINDEX = 100
let UNIQ_KEY = 0

@connect(
  mapStateToProps,
  { move, gameOver }
)
export default class Game3 extends Component {
  constructor(props) {
    super(props)

    if (!props.pieces.length) {
      this.props.move({ pieces: INIT_POS })
    }
  }

  preventDefault(e) {
    if (e.touches) e.preventDefault()
  }

  componentDidMount() {
    // Will only resume if it's already started
    timeTracker.resume()

    // #root - Prevent pull down refresh on mobile
    document.getElementById('root').addEventListener('touchmove', this.preventDefault, { passive: false })
  }

  componentWillUnmount() {
    timeTracker.pause()

    // #root - Prevent pull down refresh on mobile
    document.getElementById('root').removeEventListener('touchmove', this.preventDefault)
  }

  win() {
    let pieces = this.props.pieces
    if (!pieces.length) return false
    let previousCase
    let win = !pieces.some(row => {
      return row.some(c => {
        let result = previousCase ? previousCase[0] !== c[0] || previousCase[1] !== c[1] : false
        previousCase = c
        return result
      })
    })
    if (!win) return false

    if (!timeTracker.elapsed) {
      timeTracker.stop()
      Ahoy.updateVisit({
        game_time: timeTracker.elapsed,
        game_count: this.props.moves,
      })

      // Position the pieces correctly. Just in case
      pieces = pieces.slice(0)
      pieces.forEach(row =>
        row.forEach(c => {
          c[0] = '0%'
          c[1] = '0%'
        })
      )
      setTimeout(() => this.props.move({ pieces }), 0)
    }
    return true
  }

  render() {
    if (this.win()) setTimeout(() => this.props.gameOver(), 2000)
    return this.props.win ? <GameWin /> : this.renderGame()
  }

  pieceDown(e) {
    if (this.selectedPiece) this.pieceUp()
    let elt = (e.targetTouches ? e.targetTouches[0] : e).target
    if (!elt.matches('path')) return
    e.stopPropagation()
    e.preventDefault()
    elt = elt.parentNode
    let [x, y] = [+elt.getAttribute('data-x'), +elt.getAttribute('data-y')]
    let [xp, yp] = this.props.pieces[x][y].slice(0, 2).map(x => +x.slice(0, -1))
    let transform = elt.style[transformProp]
    let dim = elt
    if (elt.getBoundingClientRect) dim = elt.getBoundingClientRect()
    let [w, h] = [dim.width, dim.height]
    let [posX, posY] = [(xp * w) / 100, (yp * h) / 100]
    elt.style[transformProp] = `translate(${posX}px, ${posY}px)`
    elt.style.zIndex = ZINDEX++
    this.selectedPiece = { style: elt.style, w, h, posX, posY, x, y }
    this.mouseLastPos = null
  }

  pieceMove(e) {
    // console.log(0)
    if (!this.selectedPiece) return
    e.preventDefault()

    // Will only start if it's not already started
    timeTracker.start()

    let event = e.touches ? e.touches[0] : e
    let clientX = event.clientX
    let clientY = event.clientY
    let lastPos = this.mouseLastPos
    if (lastPos) {
      let piece = this.selectedPiece
      let diffX = lastPos.x - clientX
      let diffY = lastPos.y - clientY
      let newPosX = piece.posX - diffX
      let newPosY = piece.posY - diffY
      piece.style[transformProp] = `translate(${newPosX}px, ${newPosY}px)`
      piece.posX = newPosX
      piece.posY = newPosY
    }
    this.mouseLastPos = { x: clientX, y: clientY }
  }

  round(x) {
    let step = 62
    return x < 0 ? Math.floor((x + step / 2) / step) * step : Math.ceil((x - step / 2) / step) * step
  }

  pieceUp(e) {
    if (this.selectedPiece) {
      e.preventDefault()
      let selectedPiece = this.selectedPiece
      this.selectedPiece = null
      let newPosX = this.round((selectedPiece.posX * 100) / selectedPiece.w)
      let newPosY = this.round((selectedPiece.posY * 100) / selectedPiece.h)
      let pieces = this.props.pieces.slice(0)
      let piece = pieces[selectedPiece.x][selectedPiece.y]
      let move = 0
      if (piece[0] !== `${newPosX}%` || piece[1] !== `${newPosY}%`) ++move
      pieces[selectedPiece.x][selectedPiece.y] = [`${newPosX}%`, `${newPosY}%`, selectedPiece.style.zIndex]
      this.props.move({ pieces, moves: this.props.moves + move })
    }
  }

  puzzleStyle(x, y) {
    let p = this.props.pieces[x][y]
    return { [transformProp]: `translate(${p[0]},${p[1]})`, zIndex: p[2] }
  }

  renderGame() {
    let props = this.props
    let bpoom = props.bpoom
    let babyType = bpoom.baby_full_type
    let img = bpoom.photo
    let xy = [19, -43, -105, -167]
    let win = this.win()
    return (
      <div styleName={['game-container', babyType].join(' ')}>
        {props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={BABY_IMAGES[babyType]}>
            {t(MSG.message)}
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={BABY_IMAGES[babyType]}>{t(MSG.message)}</BubblePic>
        )}
        <div
          ref={elt => (this.pc = elt)}
          styleName={`puzzle-container ${win ? 'win' : ''}`}
          onMouseDown={::this.pieceDown}
          onMouseMove={::this.pieceMove}
          onMouseUp={::this.pieceUp}
          onTouchStart={::this.pieceDown}
          onTouchMove={::this.pieceMove}
          onTouchEnd={::this.pieceUp}
          onMouseLeave={::this.pieceUp}
        >
          {props.pieces.length && (
            <div styleName="puzzle" style={{ backgroundImage: win ? `url(${img})` : 'none' }}>
              {[
                { component: Puzzle1, rotate: 90 },
                { component: Puzzle3, rotate: 180 },
                { component: Puzzle4, rotate: 180 },
                { component: Puzzle1, rotate: 180 },
                { component: Puzzle4, rotate: 90 },
                { component: Puzzle2, rotate: 0 },
                { component: Puzzle2, rotate: 90 },
                { component: Puzzle3, rotate: 270 },
                { component: Puzzle3, rotate: 90 },
                { component: Puzzle2, rotate: 90 },
                { component: Puzzle2, rotate: 0 },
                { component: Puzzle4, rotate: 270 },
                { component: Puzzle1, rotate: 0 },
                { component: Puzzle4, rotate: 0 },
                { component: Puzzle3, rotate: 0 },
                { component: Puzzle1, rotate: 270 },
              ].map((info, i) => {
                let x = i % 4
                let y = Math.floor(i / 4)
                return (
                  <info.component
                    key={`${++UNIQ_KEY}-${i}`}
                    rotate={info.rotate}
                    img={img}
                    data-x={x}
                    data-y={y}
                    x={xy[x]}
                    y={xy[y]}
                    style={this.puzzleStyle(x, y)}
                    styleName={`piece c${x + 1} r${y + 1}`}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }
}

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
    id: 'game.message',
    defaultMessage: 'Bouge les pièces afin de résoudre ce puzzle et je te dirai mon prénom...',
  },
})
