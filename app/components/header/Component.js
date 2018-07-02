import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { defineMessages } from 'react-intl'

// Components
import Nav from 'reactstrap/lib/Nav'
import Navbar from 'reactstrap/lib/Navbar'
import Button from 'reactstrap/lib/Button'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'
import NavItem from 'reactstrap/lib/NavItem'
import NavLink from 'reactstrap/lib/NavLink'
import Collapse from 'reactstrap/lib/Collapse'
import ButtonDropdown from 'reactstrap/lib/ButtonDropdown'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'

import { stepPath, rootPath } from '../../views/app/steps'

// Config
import config from '../../../config/application'

// i18n
import t from '../../i18n/i18n'
import stepMsg from '../../i18n/messages/steps'

// CSS
import styles from './styles.scss'
import bs from '../../../config/bootstrap/bootstrap.scss'

// Resources
import logo from '../../images/logo.png'
import CGU from '../../pdf/CGU_babypoom.pdf'

// Icons. TODO: refactor into a single import when passing to webpack 4
import FaBirthdayCake from '../../icons/stroller'
import FaPuzzlePiece from '../../icons/puzzle'
import FaInfo from '../../icons/info'
import FaListUl from '../../icons/list'
import FaBook from '../../icons/book'
import FaGift from '../../icons/gift'
import FaImage from '../../icons/picture'

const ICONS = {
  welcome: FaBirthdayCake,
  game: FaPuzzlePiece,
  arrival: FaInfo,
  trip: FaListUl,
  visitorbook: FaBook,
  gift: FaGift,
  souvenir: FaImage,
}

@connect(mapStateToProps, {})
export default class extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)

    this.state = {
      isOpen: false,
      isMenuOpen: false,
      bpoomModal: false,
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      isMenuOpen: false,
    })
  }

  toggleMenu(close) {
    this.setState(
      true === close
        ? { isMenuOpen: false }
        : {
            isMenuOpen: !this.state.isMenuOpen,
            isOpen: false,
          }
    )
  }

  openModal(name) {
    this.setState({ [`${name}Modal`]: true })
  }

  closeModal(name) {
    this.setState({ [`${name}Modal`]: false })
  }

  renderMenu(stepIndex) {
    let props = this.props
    let bpoom = props.bpoom
    let steps = props.steps

    return (bpoom.available_steps || []).map((name, index) => {
      let text = t(stepMsg[name])
      let to = stepPath(name, bpoom)
      let cssClasses = [
        index === steps.index ? 'styles.current' : '',
        index === steps.maxIndex ? 'styles.max' : '',
        index > steps.maxIndex ? 'styles.disabled-link' : '',
      ]
      let Icon = ICONS[name]

      return (
        <NavItem styleName={cssClasses.join(' ')} key={'' + index}>
          {index <= steps.maxIndex ? (
            <NavLink styleName="styles.link-item" tag={Link} to={to}>
              <i styleName={['styles.icon', `styles.${name}`].join(' ')}>
                <Icon />
              </i>
              {text}
            </NavLink>
          ) : (
            <div styleName="styles.link-item bs.nav-link bs.disabled">
              <i styleName={['styles.icon', `styles.${name}`].join(' ')}>
                <Icon />
              </i>
              {text}
            </div>
          )}
        </NavItem>
      )
    })
  }

  render() {
    let props = this.props
    let stepText = props.steps.ok ? t(stepMsg[props.steps.current]) : ''
    let root = rootPath(props.bpoom)
    let mainNav = (
      <div styleName="styles.main-nav">
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>{this.renderMenu()}</Nav>
        </Collapse>
      </div>
    )

    return (
      <header>
        <Navbar light expand="md" styleName="styles.navbar">
          {props.bpoom.available_steps ? (
            <Nav styleName="bs.navbar-toggler styles.menu-nav styles.navbar-toggler" navbar>
              <NavItem>
                <ButtonDropdown styleName="styles.nav-button" isOpen={this.state.isOpen} toggle={this.toggle}>
                  <DropdownToggle outline color="primary" caret>
                    {stepText}
                  </DropdownToggle>
                </ButtonDropdown>
              </NavItem>
            </Nav>
          ) : (
            ''
          )}
          <span>
            <NavbarBrand styleName="styles.nav-brand" tag={Link} to={root}>
              <img src={logo} />
            </NavbarBrand>
          </span>
          {props.desktop ? mainNav : ''}
          <Button
            color="primary"
            styleName="bs.navbar-toggler styles.toggler styles.navbar-toggler"
            onClick={this.toggleMenu}
            onBlur={() => setTimeout(this.toggleMenu.bind(this, true), 150)}
          >
            <span styleName="styles.icon" />
          </Button>
        </Navbar>
        {props.desktop ? '' : mainNav}
        <div styleName="styles.menu">
          <Collapse isOpen={this.state.isMenuOpen}>
            <Nav styleName="bs.ml-auto" navbar>
              {/* <NavItem>
                  <NavLink tag={Link} to="/">
                    Français
                  </NavLink>
                </NavItem> */}
              <NavItem>
                <NavLink onClick={this.openModal.bind(this, 'bpoom')}>{t(MSG.what_is_babypoom)}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} target="_blank" to={CGU}>
                  {t(MSG.legals)}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} target="_blank" to={config.shareLink}>
                  {t(MSG.share)}
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
        <Modal isOpen={this.state.bpoomModal} toggle={this.closeModal.bind(this, 'bpoom')}>
          <ModalHeader styleName="bs.modal-primary" toggle={this.closeModal.bind(this, 'bpoom')}>
            {t(MSG.what_is_babypoom)}
          </ModalHeader>
          <ModalBody styleName="styles.pre-wrap">
            <div styleName="styles.modal-logo">
              <img src={logo} />
            </div>
            {t(MSG.what_is_babypoom_desc)}
          </ModalBody>
        </Modal>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, steps }, mediaQueries: { desktop } } = state
  return { bpoom, steps, desktop }
}

const MSG = defineMessages({
  what_is_babypoom: {
    id: 'header.what_is_babypoom',
    defaultMessage: `Babypoom, c'est quoi ?`,
  },
  what_is_babypoom_desc: {
    id: 'header.what_is_babypoom_desc',
    defaultMessage: `Babypoom est le premier faire-part interactif du genre.

C'est une application innovante conçue pour permettre aux parents de transmettre l'émotion du jour de la naissance, et de présenter toutes les infos conçernant l'arrivée de bébé.`,
  },
  legals: {
    id: 'header.legals',
    defaultMessage: `Informations légales`,
  },
  share: {
    id: 'header.share',
    defaultMessage: `Partager votre avis`,
  },
})
