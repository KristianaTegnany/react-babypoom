import React from 'react'

import star from './stars.svg'
import './stars-styles.scss'

// eslint-disable-next-line react/display-name
export default () => {
  const styles = [
    { left: '10%', top: '30%', width: 30, height: 30, animationDelay: '1s' },
    { left: '20%', top: '40%', width: 25, height: 25, animationDelay: '.3s' },
    { left: '20%', top: '75%', width: 40, height: 40, animationDelay: '1.3s' },
    { left: '90%', top: '20%', width: 15, height: 15, animationDelay: '.5s' },
    { left: '80%', top: '40%', width: 20, height: 20, animationDelay: '1.5s' },
    { left: '5%', top: '45%', width: 20, height: 20, animationDelay: '2s' },
    { left: '7%', top: '70%', width: 25, height: 25, animationDelay: '.5s' },
    { left: '13%', top: '72%', width: 30, height: 30, animationDelay: '2.5s' },
    { left: '85%', top: '40%', width: 15, height: 15, animationDelay: '.3s' },
    { left: '87%', top: '80%', width: 20, height: 20, animationDelay: '1.5s' },
  ]
  return (
    <div>
      {styles.map((props, index) => (
        <img key={index} src={star} style={props} styleName="star" />
      ))}
    </div>
  )
}
