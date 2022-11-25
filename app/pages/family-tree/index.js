import React from 'react'
import { defineMessages } from 'react-intl'
import { connect } from 'react-redux'
import ContentPanel from '../../components/content-panel'
import Page from '../../components/page'
import './styles.theme-BP_ALBUM_THEME.scss'
import ReactFamilyTree from 'react-family-tree'
import PresentationPanel from '../../components/presentation-panel'
import Title from '../../components/title'
import FamilyNode from './FamilyNode'
import t from '../../i18n/i18n'
import './tree.scss'
import FamilyTreeComponent from './FamilyTreeComponent'

class FamilyTree extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Page style={{ display: 'flex', objectFit: 'cover', width: '297.25936mm', height: '210mm' }}>
        <PresentationPanel styleName="familytree-presentation-panel">
          <Title label={t(MSG.familytree)} />
        </PresentationPanel>
        <ContentPanel style={{ display: 'flex' }} background>
          <FamilyTreeComponent {...this.props} />
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
  familytree: {
    id: 'familytree.familytree',
    defaultMessage: 'Mon petit arbre généalogique',
  },
  description: {
    id: 'familytree.description',
    defaultMessage: `Ma famille`,
  },
})
