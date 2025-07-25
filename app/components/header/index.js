import React, { useState, useRef} from 'react'
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
import ReactAudioPlayer from 'react-audio-player'
import ReactPlayer from 'react-player';
import CircleControls from 'react-player-circle-controls';
import 'react-player-circle-controls/dist/styles.css';
import { stepPath, rootPath } from '../../views/app/steps'


// Config
import config from '../../../config'

// i18n
import t from '../../i18n/i18n'
import stepMsg from '../../i18n/messages/steps'

// CSS
import styles from './styles.scss'
import bs from '../../../config/bootstrap/bootstrap.scss'

// Resources
import CGU from '../../pdf/CGU_babypoom.pdf'

// Icons. TODO: refactor into a single import when passing to webpack 4
import FaBirthdayCake from '../../icons/stroller'
import FaPuzzlePiece from '../../icons/puzzle'
import FaInfo from '../../icons/info'
import FaListUl from '../../icons/list'
import FaBook from '../../icons/book'
import FaGift from '../../icons/gift'
import FaImage from '../../icons/picture'
import useToggle from '../../hooks/toggle'
import imgPath from '../../../lib/img-path'
import FaPlay from '../../icons/play'

import canAutoPlay from 'can-autoplay'

const ICONS = {
  welcome: FaBirthdayCake,
  game: FaPuzzlePiece,
  arrival: FaInfo,
  trip: FaListUl,
  guest_book: FaBook,
  pot: FaGift,
  souvenir: FaImage,
}

const LOGO = imgPath('/corporate/logo.png')

let Header = ({ bpoom, desktop, steps }) => {
  const modal = useToggle(false)
  const soundModal = useToggle(false)
  const [menus, setMenus] = useState({
    isDropdownOpen: false,
    isBurgerOpen: false,
  })

  let stepText = steps.ok ? t(stepMsg[steps.current]) : ''
  let root = rootPath(bpoom)
  let theme = bpoom.theme || config.theme
  let sound = bpoom.sound || {}

  const player = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0
  });


  const onSeek = amount => {
    if (player.current) {
      player.current.seekTo(amount, 'fraction');
    }
  }

  const playSound = () => {
    setPlaying(true)
    soundModal.hide()
  }

  const canPlaySound = () => {
    canAutoPlay.audio({inline: true, timeout: 1300}).then(({result}) => {
      if (result === true) {
        // Can autoplay
      } else {
        // Can not autoplay
        setPlaying(false)
        soundModal.show()
      }
    })
  }


  let mainNav = (
    <div styleName="styles.main-nav">
      <Collapse isOpen={menus.isDropdownOpen} navbar>
        <Nav navbar>
          {(bpoom.available_steps || []).map((name, index) => {
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
          })}
        </Nav>
      </Collapse>
    </div>
  )

  return (
    <header>
      <Navbar light expand="md" styleName="styles.navbar">
        {bpoom.available_steps ? (
          <Nav styleName="bs.navbar-toggler styles.menu-nav styles.navbar-toggler" navbar>
            <NavItem>
              <ButtonDropdown
                styleName="styles.nav-button"
                isOpen={menus.isDropdownOpen}
                toggle={() => setMenus({ isDropdownOpen: !menus.isDropdownOpen, isBurgerOpen: false })}
              >
                <DropdownToggle outline color="primary" caret>
                  {stepText}
                </DropdownToggle>
              </ButtonDropdown>
            </NavItem>
          </Nav>
        ) : (
          ''
        )}
        {!bpoom.sound_disabled ? (
          <span>
            <ReactPlayer
              ref={player}
              url={sound.url}
              playing={playing}
              height="0"
              width="0"
              onProgress={setPlayerState}
              onEnded={() => setPlaying(false)}
              onReady={() => canPlaySound()}

            />
            <CircleControls
              played={playerState.played}
              loaded={playerState.loaded}
              playing={playing}
              onSeek={onSeek}
              size="50"
              color={theme.color_1}
              onTogglePlaying={() => setPlaying(!playing)}
            />
          </span>
        ) : (
          <span>
            <NavbarBrand styleName="styles.nav-brand" tag={Link} to={root}>
              <img src={LOGO} />
            </NavbarBrand>
          </span>

        )}
        {desktop ? mainNav : ''}
        <Button
          color="primary"
          styleName="bs.navbar-toggler styles.toggler styles.navbar-toggler"
          onClick={() => setMenus({ isBurgerOpen: !menus.isBurgerOpen, isDropdownOpen: false })}
          onBlur={() => setMenus({ isBurgerOpen: false })}
        >
          <span styleName="styles.icon" />
        </Button>
      </Navbar>
      {desktop ? '' : mainNav}
      <div styleName="styles.menu">
        <Collapse isOpen={menus.isBurgerOpen}>
          <Nav styleName="bs.ml-auto" navbar>
            <NavItem>
              <NavLink onClick={modal.show}>{t(MSG.what_is_babypoom)}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} target="_blank" to={CGU}>
                {t(MSG.legals)}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink target="_blank" href={config.shareLink}>
                {t(MSG.share)}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
      <Modal isOpen={modal.visible} toggle={modal.hide}>
        <ModalHeader styleName="bs.modal-primary" toggle={modal.hide}>
          {t(MSG.what_is_babypoom)}
        </ModalHeader>
        <ModalBody styleName="styles.pre-wrap">
          <div styleName="styles.modal-logo">
            <img src={LOGO} />
          </div>
          {t(MSG.what_is_babypoom_desc)}
        </ModalBody>
      </Modal>
      <Modal isOpen={soundModal.visible} toggle={soundModal.hide}>
        <ModalHeader styleName="bs.modal-primary" toggle={soundModal.hide}>
          {t(MSG.ask_play_sound)}
        </ModalHeader>
        <ModalBody styleName="styles.pre-wrap">
          {t(MSG.ask_play_sound_desk)}
          <div styleName="styles.modal-play-sound">
            <FaPlay onClick={() => playSound()} />
          </div>
        </ModalBody>
      </Modal>
    </header>
  )
}

export default connect(mapStateToProps)(Header)

function mapStateToProps(state) {
  const {
    app: { bpoom, steps },
    mediaQueries: { desktop },
  } = state
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
  ask_play_sound: {
    id: 'header.ask_play_sound',
    defaultMessage: `Activation de la mélodie`,
  },
  ask_play_sound_desk: {
    id: 'header.ask_play_sound_desk',
    defaultMessage: `Cette annonce comporte une mélodie soigneusement choisie par les parents de bébé, appuyez ici pour l'écouter`,
  },
})
