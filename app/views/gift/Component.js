import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';

// Components
import Button from 'reactstrap/lib/Button';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';

import GiftCharityForm from '../gift-charity-form/Component';
import Bubble from '../../components/bubble/Component';
import BubblePic from '../../components/bubble-pic/Component';
import Panel from '../../components/panel/Component';

import { nextStep } from '../../views/app/steps';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
class Klass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charityModal: false,
      charityForm: false
    }
  }

  openCharityModal() {
    this.setState({ charityModal: true });
  }

  closeCharityModal() {
    this.setState({ charityModal: false });
  }

  showCharityForm() {
    this.setState({ charityForm: true });
  }

  hideCharityForm() {
    this.setState({ charityForm: false });
  }

  render() {
    let state = this.state;
    if (state.charityForm) {
      return (<GiftCharityForm onSave={::this.hideCharityForm} onCancel={::this.hideCharityForm} />);
    }

    let bpoom = this.props.bpoom;
    let gift = bpoom.bp_gift || {};
    let charity = gift.caritative || {};

    let transition = t(stepMsg[nextStep(this.props).transition]);

    let link = (<span className="btn btn-link" onClick={::this.openCharityModal}>{charity.name}</span>)

    return (
      <div styleName="gift-container">
        <div styleName="mascot">
          <Bubble>
            {gift.message}
          </Bubble>
        </div>
        <Panel title={t(MSG.baby_gift_title)} imgType="piggy-bank">
          {t({ ...MSG.baby_gift_block, values: { fees: gift.caritative_fees, link } })}
          <div styleName="action">
            <Button color="secondary" onClick={::this.showCharityForm}>{t(MSG.baby_gift_participate)}</Button>
          </div>
        </Panel>
        <Panel title={t(MSG.find_gift_title)} imgType="gifts">
          {t(MSG.find_gift_block)}
          <div styleName="action"><Button color="secondary">{t(MSG.find_gift_btn)}</Button></div>
        </Panel>
        <BubblePic imgSrc={bpoom.photo}>{transition}</BubblePic>

        <Modal isOpen={this.state.charityModal} toggle={::this.closeCharityModal}>
          <ModalHeader className="modal-primary" toggle={::this.closeCharityModal}>
            {charity.name}
          </ModalHeader>
          <ModalBody>
            {charity.image ? <img src={charity.image} className="img-fluid" alt="" /> : '' }
            {charity.description}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps } } = state;
  return { bpoom, currentStep, availableSteps };
}

export default connect(mapStateToProps)(Klass);


const MSG = defineMessages({
  baby_gift_title: {
    id: 'gift.baby.title',
    defaultMessage: "Faire un cadeau à Bébé avec la cagnotte solidaire"
  },
  baby_gift_block: {
    id: 'gift.baby.block',
    defaultMessage: "Cette cagnotte permet de faire 2 heureux avec un seul don !\n\n" +
     "Évidemment ce don servira, avant tout, à gâter bébé. En plus, {fees}% sera reversé à une association caritative " +
     "(choisie par les parents) :\n{link}"
  },
  baby_gift_participate: {
    id: 'gift.baby.participate',
    defaultMessage: "Participer à la cagnotte"
  },
  find_gift_title: {
    id: 'gift.find.title',
    defaultMessage: "Trouver un cadeau pour toi et tes proches"
  },
  find_gift_block: {
    id: 'gift.find.block',
    defaultMessage: "Dans cette boutique tu pourras choisir un cadeau personnalisé à l'image de bébé (T-shirt, mug…) " +
     "à conserver ou à offrir.\n\nCe cadeau te permettra de marquer ce jour exceptionnel d'une façon originale et amusante."
  },
  find_gift_btn: {
    id: 'gift.find.btn',
    defaultMessage: "Accéder à la boutique"
  }
});

