import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Bubble from '../../components/bubble'
import BubbleSay from '../../components/bubble-say'
import Transition from '../../components/transition'

// Lib
import getPhoto from '../../../lib/get-photo'

// CSS
import styles from './styles.scss'

// Images
import mascotSays from '../../images/mascot-says.png'

class Souvenir extends Component {
  render() {
    let props = this.props
    let bpoom = props.bpoom
    let souvenir = bpoom.bp_souvenir || {}

    return (
      <div>
        {true ? (
          ''
        ) : (
          <BubbleSay speechDir={props.desktop ? 'left' : 'top'} imgSrc={getPhoto(bpoom.photo, 'thumbnail')}>
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

export default connect(mapStateToProps)(Souvenir)

function mapStateToProps(state) {
  const {
    app: { bpoom },
    mediaQueries: { desktop },
  } = state
  return { bpoom, desktop }
}
