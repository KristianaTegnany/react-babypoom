import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Bubble from '../../components/bubble/Component'
import BubbleSay from '../../components/bubble-say/Component'
import Transition from '../../components/transition/Component'

// CSS
import styles from './styles.scss'

// Images
import mascotSays from '../../images/mascot-says.png'

@connect(mapStateToProps)
export default class Souvenir extends Component {
  render() {
    let props = this.props
    let bpoom = props.bpoom
    let souvenir = bpoom.bp_souvenir || {}

    return (
      <div>
        {true ? (
          ''
        ) : (
          <BubbleSay speechDir={props.desktop ? 'left' : 'top'} imgSrc={bpoom.photo.thumbnail}>
            {souvenir.message}
          </BubbleSay>
        )}
        <BubbleSay speechDir={props.desktop ? 'left' : 'top'} imgSrc={mascotSays}>
          <Transition />
        </BubbleSay>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    app: { bpoom },
    mediaQueries: { desktop },
  } = state
  return { bpoom, desktop }
}
