import React from 'react'
import Icon from 'react-icon-base'

let ID = 0

const Puzzle1 = props => {
  let { img, rotate, x, y, ...iconProps } = props
  let id = `puzzle-1-${ID++}`
  return (
    <Icon viewBox="0 0 100 100" {...iconProps}>
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="100%" height="100%">
          <image
            xlinkHref={img}
            x={x || 0}
            y={y || 0}
            width="248.01%"
            height="248.01%"
            transform={`rotate(-${rotate || 0}, 50, 50)`}
          />
        </pattern>
      </defs>
      <path
        transform={`rotate(${rotate || 0}, 50, 50)`}
        d="M19,19h22.8c2.2,0,3.8-1.2,3.4-2.9c-0.3-1.3-3.9-3.2-3.6-7.9C41.8,3.5,46.4,1,50,1s8.1,2.5,8.4,7.3
        c0.3,4.7-3.2,6.6-3.6,7.9c-0.4,1.5,1.1,2.9,3.4,2.9c0-0.1,22.8,0,22.8,0s0,22.8,0,22.8c0,2.2-1.2,3.8-2.9,3.4
        c-1.3-0.3-3.2-3.9-7.9-3.6C65.5,41.8,63,46.4,63,50c0,3.6,2.5,8.1,7.3,8.4c4.7,0.3,6.6-3.2,7.9-3.6c1.5-0.4,2.9,1.1,2.9,3.4
        c-0.1,0,0,22.8,0,22.8c0,0-62,0-62,0C19,81,19,19,19,19z"
        fill={`url(#${id})`}
      />
    </Icon>
  )
}

export default Puzzle1
