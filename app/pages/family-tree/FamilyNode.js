import React from 'react'
import './styles.theme-BP_ALBUM_THEME.scss'
import './tree.scss'

export default class FamilyNode extends React.Component {
  render() {
    const { node, style } = this.props

    return (
      <div styleName="familyNodeRoot" style={style}>
        <img src={node.img} alt={node.id} crossOrigin="anonymous" />
        <div styleName="familyNameItem">{node.name}</div>
        {node.spouses.length > 0 && node.gender === 'male' && (
          <img src={require('../../images/heart.png')} alt={'heart'} styleName="heart" crossOrigin="anonymous" />
        )}
      </div>
    )
  }
}
