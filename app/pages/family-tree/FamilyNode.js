import React from 'react'
import './styles.theme-BP_ALBUM_THEME.scss'
import './tree.scss'

const DEFAULT_SIZE = 95
const DEFAULT_HEARTH_SIZE = 35
const DEFAULT_HEARTH_LEFT = 92

export default class FamilyNode extends React.Component {
  render() {
    const { node, style, childCount } = this.props
    const size = childCount <= 4 ? DEFAULT_SIZE : DEFAULT_SIZE - childCount * 2.5
    const hearthLeft = childCount <= 4 ? DEFAULT_HEARTH_LEFT : DEFAULT_HEARTH_LEFT - childCount * 0.56
    const hearthSize = childCount <= 4 ? DEFAULT_HEARTH_SIZE : DEFAULT_HEARTH_SIZE - childCount * 2

    return (
      <div styleName="familyNodeRoot" style={style}>
        <img src={node.img} alt={node.id} crossOrigin="anonymous" style={{ width: size, height: size }} />
        <div styleName="familyNameItem">{node.name}</div>
        {node.spouses.length > 0 && node.gender === 'male' && (
          <img
            src={require('../../images/heart.png')}
            alt={'heart'}
            styleName="heart"
            crossOrigin="anonymous"
            style={{
              left: `${hearthLeft}%`,
              width: hearthSize,
              height: hearthSize,
            }}
          />
        )}
      </div>
    )
  }
}
