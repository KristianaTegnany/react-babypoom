import React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import ContentPanel from '../../components/content-panel'
import Page from '../../components/page'
import './styles.theme-BP_ALBUM_THEME.scss'
import ReactFamilyTree from 'react-family-tree'
import FamilyNode from './FamilyNode'
import './tree.scss'

const WIDTH = 220
const HEIGHT = 170

class FamilyTree extends React.Component {
  constructor() {
    super()

    this.createNodeData = this.createNodeData.bind(this)
  }
  createNodeData(familyTree) {
    if (!familyTree) {
      return []
    }

    const child = familyTree.family_tree_children.map((item, index) => ({
      id: 'child_' + (index + 6).toString(),
      name: item.child_name,
      img: item.child_photo,
      parents: [
        {
          id: 'ypu71w9_Q',
          type: 'blood',
        },
        {
          id: 'GEf8zF7A4',
          type: 'blood',
        },
      ],
      children: [],
      siblings: [],
      spouses: [],
    }))

    return [
      {
        id: '011jVS4rb',
        gender: 'male',
        parents: [
          {
            id: 'ypu71w9_Q',
            type: 'blood',
          },
          {
            id: 'GEf8zF7A4',
            type: 'blood',
          },
        ],
        children: [],
        siblings: [],
        spouses: [],
      },
      {
        id: 'vRSjcaDGj',
        gender: 'female',
        parents: [
          {
            id: '6vASIIxhd',
            type: 'blood',
          },
          {
            id: 'iFiwqrWx-',
            type: 'blood',
          },
        ],
        children: [
          {
            id: 'Fbc9iwnJl',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [],
      },
      {
        id: 'Fbc9iwnJl',
        gender: 'female',
        parents: [
          {
            id: 'vRSjcaDGj',
            type: 'blood',
          },
        ],
        children: [],
        siblings: [],
        spouses: [],
      },
      {
        id: 'ypu71w9_Q',
        gender: 'male',
        name: familyTree.parent_1_name,
        img: familyTree.parent_1_photo,
        parents: [
          {
            id: 'TsyAkbF89',
            type: 'blood',
          },
          {
            id: 'T54Km7uOC',
            type: 'blood',
          },
        ],
        children: child.map((item) => ({ id: item.id, type: 'blood' })),
        siblings: [],
        spouses: [
          {
            id: 'GEf8zF7A4',
            type: 'married',
          },
        ],
      },
      {
        id: 'GEf8zF7A4',
        gender: 'female',
        name: familyTree.parent_2_name,
        img: familyTree.parent_2_photo,
        parents: [
          {
            id: 'gsgwGS_Kw',
            type: 'blood',
          },
          {
            id: 'ZgTZx9uXQ',
            type: 'blood',
          },
        ],
        children: child.map((item) => ({ id: item.id, type: 'blood' })),
        siblings: [],
        spouses: [
          {
            id: 'ypu71w9_Q',
            type: 'married',
          },
        ],
      },
      {
        id: '2DlrR0fK8',
        gender: 'male',
        parents: [],
        children: [
          {
            id: 'H-06WvsfJ',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [],
      },
      {
        id: 'gsgwGS_Kw',
        gender: 'male',
        name: familyTree.grandparent_2_parent_2_name,
        img: familyTree.grandparent_2_parent_2_photo,
        parents: [],
        children: [
          {
            id: 'GEf8zF7A4',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [
          {
            id: 'ZgTZx9uXQ',
            type: 'married',
          },
        ],
      },
      {
        id: 'ZgTZx9uXQ',
        gender: 'female',
        name: familyTree.grandparent_1_parent_2_name,
        img: familyTree.grandparent_1_parent_2_photo,
        parents: [],
        children: [
          {
            id: 'GEf8zF7A4',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [
          {
            id: 'gsgwGS_Kw',
            type: 'married',
          },
        ],
      },
      {
        id: 'TsyAkbF89',
        gender: 'male',
        name: familyTree.grandparent_2_parent_1_name,
        img: familyTree.grandparent_2_parent_1_photo,
        parents: [],
        children: [
          {
            id: 'ypu71w9_Q',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [
          {
            id: 'T54Km7uOC',
            type: 'married',
          },
        ],
      },
      {
        id: 'T54Km7uOC',
        name: familyTree.grandparent_1_parent_1_name,
        img: familyTree.grandparent_1_parent_1_photo,
        gender: 'female',
        parents: [],
        children: [
          {
            id: 'ypu71w9_Q',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [
          {
            id: 'TsyAkbF89',
            type: 'married',
          },
        ],
      },
      {
        id: '6vASIIxhd',
        gender: 'male',
        parents: [],
        children: [
          {
            id: 'vRSjcaDGj',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [
          {
            id: 'iFiwqrWx-',
            type: 'married',
          },
        ],
      },
      {
        id: 'iFiwqrWx-',
        gender: 'female',
        parents: [],
        children: [
          {
            id: 'vRSjcaDGj',
            type: 'blood',
          },
        ],
        siblings: [],
        spouses: [
          {
            id: '6vASIIxhd',
            type: 'married',
          },
        ],
      },
      {
        id: 'H-06WvsfJ',
        gender: 'female',
        parents: [
          {
            id: '2DlrR0fK8',
            type: 'blood',
          },
        ],
        children: [],
        siblings: [],
        spouses: [],
      },
      ...child,
    ]
  }

  render() {
    const familyTree = this.props.bpoom.family_tree
    const nodeFamily = this.createNodeData(familyTree)

    return (
      <Page>
        <ContentPanel style={{ display: 'flex', objectFit: 'cover', width: '297.25936mm', height: '210mm' }} background>
          <div styleName={'wrapper'}>
            {nodeFamily && nodeFamily.length > 0 && (
              <div>
                <ReactFamilyTree
                  nodes={nodeFamily}
                  rootId={nodeFamily[0].id}
                  width={WIDTH}
                  height={HEIGHT}
                  styleName={'rootTree'}
                  renderNode={(node) => (
                    <FamilyNode
                      node={node}
                      style={{
                        width: WIDTH,
                        height: HEIGHT,
                        transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                      }}
                    />
                  )}
                />
              </div>
            )}
          </div>
        </ContentPanel>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(FamilyTree)

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
}

const MSG = defineMessages({
  card: {
    id: 'card',
    defaultMessage: 'Hello',
  },
})
