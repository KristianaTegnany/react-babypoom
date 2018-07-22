import React from 'react'
import Icon from 'react-icon-base'

let ID = 0

const Puzzle4 = props => {
  let { img, rotate, x, y, ...iconProps } = props
  let id = `puzzle-4-${ID++}`
  return (
    <Icon viewBox="0 0 100 100" {...iconProps} pointerEvents="none">
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
        pointerEvents="fill"
        transform={`rotate(${rotate || 0}, 50, 50)`}
        d="M19,81V58.2c0-2.2-1.2-3.8-2.9-3.4c-1.3,0.3-3.2,3.9-7.9,3.6C3.5,58.2,1,53.6,1,50s2.5-8.1,7.3-8.4
        c4.7-0.3,6.6,3.2,7.9,3.6c1.5,0.4,2.9-1.1,2.9-3.4c-0.1,0,0-22.8,0-22.8h22.8c2.2,0,3.8,1.2,3.4,2.9c-0.3,1.3-3.9,3.2-3.6,7.9
        c0.2,4.8,4.8,7.3,8.4,7.3c3.6,0,8.1-2.5,8.4-7.3c0.3-4.7-3.2-6.6-3.6-7.9C54.5,20.4,56,19,58.3,19c0,0.1,22.8,0,22.8,0
        s0.1,22.8,0,22.8c0,2.3,1.4,3.8,2.9,3.4c1.3-0.4,3.2-3.9,7.9-3.6c4.8,0.3,7.3,4.8,7.3,8.4s-2.5,8.2-7.3,8.4
        c-4.7,0.3-6.6-3.3-7.9-3.6c-1.8-0.4-3,1.2-3,3.4V81H19z"
        fill={`url(#${id})`}
      />
    </Icon>
  )
}

export default Puzzle4
