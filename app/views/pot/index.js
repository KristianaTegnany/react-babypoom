import React, {useEffect} from 'react'
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
import Loading from '../../components/loading'

// Lib
import getPhoto from '../../../lib/get-photo'
import BABY_IMAGES from '../../../lib/baby-img'
import imgPath from '../../../lib/img-path'
import Tracking from '../../../lib/tracking'
import { hasParam } from '../../../lib/url-params'

import { validMangopayPayment } from '../app/Actions'


// i18n
import t from '../../i18n/i18n'
import MP_MSG from '../../i18n/messages/mangopay'

// CSS
import './styles.scss'

let Pot = ({ desktop, noNav, bpoom, validMangopayPayment }) => {
  const modal = useToggle(false)
  const result = useToggle(false)
  const potFailed = useToggle(false)
  const potLoading = useToggle(false)
  const form = useToggle(false)
  const GIFT = imgPath('/payments/gift-list.png')

  const showForm = () => {
    form.show()
    ReactGA.ga('send', 'popup-charity-form')
    Tracking.track("Pot_ShowForm_Click", {bpoom_id: bpoom.id})
  }
  const showModal = () => {
    modal.show()
    ReactGA.ga('send', 'popup-charity-description')
    Tracking.track("Pot_CharityDescription_Click", {bpoom_id: bpoom.id})
  }
  const showSuccess = () => {
    result.show()
    ReactGA.ga('send', 'action_pot_success')
    Tracking.track("action_pot_success", {bpoom_id: bpoom.id})
  }
  const showFailed = () => {
    potFailed.show()
    ReactGA.ga('send', 'popup-potFailed-show')
    Tracking.track("Pot_Failed_Show", {bpoom_id: bpoom.id})
  }

  useEffect(() => {
    if (hasParam(location.search, '3ds')){
      let url= window.location.href
      let transactionId = /transactionId=([^&]+)/.exec(url)[1]
      potLoading.show()
      validMangopayPayment(transactionId)
        .then((json) => {
          potLoading.hide()
          if (json.error) {
            showFailed()
          }
          if (json.success) {
            showSuccess()
          }
        })
        .catch(() => {
          showFailed()
        })
    }
  }, [])

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

      <Modal size="lg" isOpen={result.visible} toggle={result.hide}>
        <ModalHeader className="modal-danger" toggle={potFailed.hide}>
          {t(MSG.pot_failed_title)}
        </ModalHeader>
        <ModalBody>
          <img src={imgPath('/mascot/love.png')} styleName="thanks-modal-img" alt="" />
          {t(MSG.thanks)}
        </ModalBody>
      </Modal>

      <Modal size="lg" isOpen={potFailed.visible} toggle={potFailed.hide}>
        <ModalHeader className="modal-danger" toggle={potFailed.hide}>
          {t(MSG.pot_failed_title)}
        </ModalHeader>
        <ModalBody>
          <img src={imgPath('/mascot/danger.png')} styleName="thanks-modal-img" alt="" />
          {t(MSG.pot_failed)}
        </ModalBody>
      </Modal>

      <Modal size="sm" isOpen={potLoading.visible} toggle={potLoading.hide}>
        <ModalHeader toggle={potLoading.hide}>
        </ModalHeader>
        <ModalBody>
          <Loading show={potLoading.visible} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default connect(mapStateToProps, {validMangopayPayment})(Pot)

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
  thanks: {
    id: 'pot.thanks',
    defaultMessage:
      "Paiement bien effectué!\nMerci beaucoup pour cette attention 🙏🏼  Un mail de confirmation vous a été envoyé ainsi qu'aux parents de bébé.",
  },
  thanks_title: {
    id: 'pot.thanks_title',
    defaultMessage:
      "Merci",
  },
  pot_failed_title: {
    id: 'pot.pot_failed_title',
    defaultMessage:
      "Erreur",
  },
  pot_failed: {
    id: 'pot.pot_failed',
    defaultMessage:
      "Malheureusement votre paiement a échoué avec cette carte.",
  },
})
