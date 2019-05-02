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

let Souvenir = ({ bpoom, bpoom: { bp_souvenir = {} }, desktop }) => (
  <div>
    {/* {
      <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={getPhoto(bpoom.photo, 'thumbnail')}>
        {bp_souvenir.message}
      </BubbleSay>
    } */}
    <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={mascotSays}>
      <Transition />
    </BubbleSay>
  </div>
)

export default connect(mapStateToProps)(Souvenir)

function mapStateToProps(state) {
  const {
    app: { bpoom },
    mediaQueries: { desktop },
  } = state
  return { bpoom, desktop }
}
