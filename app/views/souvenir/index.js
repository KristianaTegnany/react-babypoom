import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Bubble from '../../components/bubble'
import BubbleSay from '../../components/bubble-say'
import Transition from '../../components/transition'
import getPhoto from '../../../lib/get-photo'
import styles from './styles.scss'
import imgPath from '../../../lib/img-path'

let Souvenir = ({ bpoom, desktop }) => (
  <div>
    {/* {
      <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={getPhoto(bpoom.photo_urls, 'thumbnail')}>
        {bpoom.souvenir_message}
      </BubbleSay>
    } */}
    <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={imgPath('/mascot/says.png')}>
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
