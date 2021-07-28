import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'
import { cardHdURL, cardThumbnailURL } from 'babypoom-common/lib/cardURL'
import './styles.theme-BP_ALBUM_THEME.scss'
class Card extends Component {
  render() {
    let { bpoom, params } = this.props

    const cardURL = params.hd ? cardThumbnailURL : cardThumbnailURL

    return (
      <Page>
        <PresentationPanel styleName="card-presentation-panel">
          <Title label={t(MSG.card)} />
        </PresentationPanel>
        <ContentPanel styleName="content-panel" background centered>
          <img styleName="img" src={cardURL({ cardId: bpoom.card_id, bpoomUuid: bpoom.uuid })} />
        </ContentPanel>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Card)

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
}

const MSG = defineMessages({
  card: {
    id: 'card.title',
    defaultMessage: `Mon\nfaire-part`,
  }
})
