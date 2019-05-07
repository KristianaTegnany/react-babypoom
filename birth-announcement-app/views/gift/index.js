import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages, FormattedMessage } from 'react-intl'
import ReactGA from 'react-ga'

// Hooks
import useToggle from '../../hooks/toggle'

// Components
import Button from 'reactstrap/lib/Button'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'

import GiftCharityForm from '../gift-charity-form'
import Bubble from '../../components/bubble'
import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import Panel from '../../components/panel'
import Transition from '../../components/transition'

// Lib
import getPhoto from '../../../lib/get-photo'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'

let Gift = ({ desktop, noNav, bpoom, bpoom: { bp_gift = {} } }) => {
  const modal = useToggle(false)
  const form = useToggle(false)

  const showForm = () => {
    form.show()
    ReactGA.ga('send', 'popup-charity-form')
  }
  const showModal = () => {
    modal.show()
    ReactGA.ga('send', 'popup-charity-description')
  }

  if (form.visible) return <GiftCharityForm onSave={form.hide} onCancel={form.hide} />

  let charity = bp_gift.caritative || {}
  let photo = getPhoto(bpoom.photo, 'thumbnail')
  let image = getPhoto(charity.image, 'normal')

  return (
    <div styleName="gift-container">
      <div styleName="mascot">
        <Bubble dir={desktop ? 'left' : null}>{bp_gift.message}</Bubble>
      </div>
      <div styleName="panel-container">
        <Panel title={t(MSG.baby_gift_title)} imgType="piggy-bank">
          {t(MSG.baby_gift_block, {
            fees: bp_gift.caritative_fees,
            link: (
              <Button styleName="btn-link" color="link" onClick={showModal}>
                {charity.name}
              </Button>
            ),
          })}
          <div styleName="action">
            <Button styleName="btn" color="app" onClick={showForm}>
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
      {noNav ? (
        ''
      ) : desktop ? (
        <BubbleSay speechDir="left" imgSrc={photo}>
          <Transition />
        </BubbleSay>
      ) : (
        <BubblePic imgSrc={photo}>
          <Transition />
        </BubblePic>
      )}

      <Modal size="lg" isOpen={modal.visible} toggle={modal.hide}>
        <ModalHeader className="modal-primary" toggle={modal.hide}>
          {charity.name}
        </ModalHeader>
        <ModalBody>
          {image ? <img src={image} styleName="charity-modal-img" alt="" /> : ''}
          {charity.description}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default connect(mapStateToProps)(Gift)

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
