import React from 'react'
import './styles.theme-BP_ALBUM_THEME.scss'
import './tree.scss'

export default class FamilyNode extends React.Component {
  render() {
    const { node, style } = this.props

    return (
      <div styleName="familyNodeRoot" style={style}>
        <img src={node.img} alt={node.id} />
        <span styleName="familyName">{node.name}</span>
        {node.spouses.length > 0 && node.gender === 'male' && (
          <img src={require('../../images/heart.png')} alt={'heart'} styleName="heart" />
        )}
      </div>
    )
  }
}
