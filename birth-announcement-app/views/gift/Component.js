import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

// Components
import Button from 'reactstrap/lib/Button'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'

import GiftCharityForm from '../gift-charity-form/Component'
import Bubble from '../../components/bubble/Component'
import BubblePic from '../../components/bubble-pic/Component'
import BubbleSay from '../../components/bubble-say/Component'
import Panel from '../../components/panel/Component'
import Transition from '../../components/transition/Component'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

@connect(mapStateToProps)
export default class Gift extends Component {
  constructor(props) {
    super(props)

    this.state = {
      charityModal: false,
      charityForm: false,
    }

    this.openCharityModal = ::this.openCharityModal
    this.closeCharityModal = ::this.closeCharityModal
    this.showCharityForm = ::this.showCharityForm
    this.hideCharityForm = ::this.hideCharityForm
  }

  openCharityModal() {
    this.setState({ charityModal: true })
  }

  closeCharityModal() {
    this.setState({ charityModal: false })
  }

  showCharityForm() {
    this.setState({ charityForm: true })
  }

  hideCharityForm() {
    this.setState({ charityForm: false })
  }

  render() {
    let state = this.state
    let props = this.props

    if (state.charityForm) {
      return <GiftCharityForm onSave={this.hideCharityForm} onCancel={this.hideCharityForm} />
    }

    let bpoom = props.bpoom
    let gift = bpoom.bp_gift || {}
    let charity = gift.caritative || {}

    let link = (
      <Button styleName="btn-link" color="link" onClick={this.openCharityModal}>
        {charity.name}
      </Button>
    )

    return (
      <div styleName="gift-container">
        <div styleName="mascot">
          <Bubble speechDir={props.desktop ? 'left' : null}>{gift.message}</Bubble>
        </div>
        <div styleName="panel-container">
          <Panel title={t(MSG.baby_gift_title)} imgType="piggy-bank">
            {t({ ...MSG.baby_gift_block, values: { fees: gift.caritative_fees, link } })}
            <div styleName="action">
              <Button styleName="btn" color="app" onClick={this.showCharityForm}>
                {t(MSG.baby_gift_participate)}
              </Button>
            </div>
          </Panel>
          {/* <Panel title={t(MSG.find_gift_title)} imgType="gifts">
            {t(MSG.find_gift_block)}
            <div styleName="action">
              <Button styleName="btn" color="secondary">{t(MSG.find_gift_btn)}</Button>
            </div>
          </Panel> */}
        </div>
        {props.noNav ? (
          ''
        ) : props.desktop ? (
          <BubbleSay speechDir="left" imgSrc={bpoom.photo.thumbnail}>
            <Transition />
          </BubbleSay>
        ) : (
          <BubblePic imgSrc={bpoom.photo.thumbnail}>
            <Transition />
          </BubblePic>
        )}

        <Modal size="lg" isOpen={this.state.charityModal} toggle={this.closeCharityModal}>
          <ModalHeader className="modal-primary" toggle={this.closeCharityModal}>
            {charity.name}
          </ModalHeader>
          <ModalBody>
            {charity.image ? <img src={charity.image} styleName="charity-modal-img" alt="" /> : ''}
            {charity.description}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
  baby_gift_title: {
    id: 'gift.baby.title',
    defaultMessage: 'Faire un cadeau à Bébé avec la cagnotte solidaire',
  },
  baby_gift_block: {
    id: 'gift.baby.block',
    defaultMessage:
      'Cette cagnotte permet de faire 2 heureux avec un seul don !\n\n' +
      'Évidemment ce don servira, avant tout, à gâter bébé. En plus, {fees}% sera reversé à une association caritative ' +
      '(choisie par les parents) :\n{link}',
  },
  baby_gift_participate: {
    id: 'gift.baby.participate',
    defaultMessage: 'Participer à la cagnotte',
  },
  find_gift_title: {
    id: 'gift.find.title',
    defaultMessage: 'Trouver un cadeau pour toi et tes proches',
  },
  find_gift_block: {
    id: 'gift.find.block',
    defaultMessage:
      "Dans cette boutique tu pourras choisir un cadeau personnalisé à l'image de bébé (T-shirt, mug…) " +
      "à conserver ou à offrir.\n\nCe cadeau te permettra de marquer ce jour exceptionnel d'une façon originale et amusante.",
  },
  find_gift_btn: {
    id: 'gift.find.btn',
    defaultMessage: 'Accéder à la boutique',
  },
})
