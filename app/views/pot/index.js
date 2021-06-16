import React from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import ReactGA from 'react-ga'

// Hooks
import useToggle from '../../hooks/toggle'

// Components
import Button from 'reactstrap/lib/Button'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'

import GiftCharityForm from '../pot-form'
import Bubble from '../../components/bubble'
import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import Panel from '../../components/panel'
import Transition from '../../components/transition'

// Lib
import getPhoto from '../../../lib/get-photo'
import BABY_IMAGES from '../../../lib/baby-img'
import imgPath from '../../../lib/img-path'

// i18n
import t from '../../i18n/i18n'

// CSS
import './styles.scss'

let Pot = ({ desktop, noNav, bpoom }) => {
  const modal = useToggle(false)
  const form = useToggle(false)
  const GIFT = imgPath('/payments/gift-list.png')

  const showForm = () => {
    form.show()
    ReactGA.ga('send', 'popup-charity-form')
  }
  const showModal = () => {
    modal.show()
    ReactGA.ga('send', 'popup-charity-description')
  }

  if (form.visible) return <GiftCharityForm onSave={form.hide} onCancel={form.hide} />

  let charity = bpoom.charity || {}
  let photo = getPhoto(bpoom.photo_urls, 'thumbnail')
  let image = charity.image

  return (
    <div styleName="pot-container">
      <div styleName="mascot">
        <Bubble dir={desktop ? 'left' : null}>{bpoom.pot_message}</Bubble>
      </div>
      <div styleName="panel-container">
        <Panel title={t(MSG.baby_pot_title)} imgType="piggy-bank">
          <img styleName="gift" src={GIFT} />
          {t(MSG.baby_pot_block, {
            fees: bpoom.charity_fees,
            link: (
              <Button styleName="btn-link" color="link" onClick={showModal}>
                {charity.name}
              </Button>
            ),
          })}
          <div styleName="action">
            <Button styleName="btn" color="app" onClick={showForm}>
              {t(MSG.baby_pot_participate)}
            </Button>
          </div>
        </Panel>
      </div>
      {noNav ? (
        ''
      ) : (
        <div styleName="mascot-direction">
          <Bubble dir={desktop ? 'left' : null}>
            <Transition />
          </Bubble>
        </div>
      )}

      <Modal size="lg" isOpen={modal.visible} toggle={modal.hide}>
        <ModalHeader className="modal-primary" toggle={modal.hide}>
          {charity.name}
        </ModalHeader>
        <ModalBody>
          {charity.image ? <img src={charity.image} styleName="charity-modal-img" alt="" /> : ''}
          {charity.description.split('\n').map(str => <p>{str}</p>)}
          {charity.logo_image ? <img src={charity.logo_image} styleName="charity-modal-img" alt="" /> : ''}
          {charity.url}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default connect(mapStateToProps)(Pot)

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
  baby_pot_title: {
    id: 'pot.baby.title',
    defaultMessage: 'Faire un cadeau à Bébé avec la cagnotte solidaire',
  },
  baby_pot_block: {
    id: 'pot.baby.block',
    defaultMessage:
      'Cette cagnotte permet de faire 2 heureux avec un seul don !\n\n' +
      'Évidemment ce don servira, avant tout, à gâter bébé. En plus, {fees}% sera reversé à une association caritative ' +
      '(choisie par les parents) :\n{link}',
  },
  baby_pot_participate: {
    id: 'pot.baby.participate',
    defaultMessage: 'Participer à la cagnotte',
  },
  find_pot_title: {
    id: 'pot.find.title',
    defaultMessage: 'Trouver un cadeau pour toi et tes proches',
  },
  find_pot_block: {
    id: 'pot.find.block',
    defaultMessage:
      "Dans cette boutique tu pourras choisir un cadeau personnalisé à l'image de bébé (T-shirt, mug…) " +
      "à conserver ou à offrir.\n\nCe cadeau te permettra de marquer ce jour exceptionnel d'une façon originale et amusante.",
  },
  find_pot_btn: {
    id: 'pot.find.btn',
    defaultMessage: 'Accéder à la boutique',
  },
})
