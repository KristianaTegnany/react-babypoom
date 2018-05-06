import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';

import { updateGuessed } from './Actions';

import BubbleSay from '../../components/bubble-say/Component';
import BubblePic from '../../components/bubble-pic/Component';

import { nextStep } from '../../views/app/steps';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// Lib
import ascii from '../../../lib/ascii';
import pixelate from '../../../lib/pixelate';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';


const SPACE_REPLACEMENT = { ' ': '_' }; // insecable space

@connect(mapStateToProps, { updateGuessed })
@CSSModules(styles, { allowMultiple: true })

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { lastChar: null };
  }

  componentDidMount() {
    this.pixelatePicture(this.props);
    this.startTime = null;
  }

  componentWillReceiveProps(props) {
    this.pixelatePicture(props);
  }

  pixelatePicture(props) {
    let { uniqueChars, okCount } = this.stats(props);
    let resolution = 24 - (uniqueChars ? Math.round(okCount * 24 / uniqueChars) : 0);
    pixelate({ src: props.bpoom.photo, resolution: resolution * 2, width: 100, height: 100 }, (picture) => {
      this.setState({ ...this.state, picture });
    });
  }

  handleClick(char, present) {
    if ([true, false].indexOf(this.props.guessed[char]) >= 0 || this.win()) {
      // TODO: send time + guessedKoCount
      return;
    }
    if (null === this.startTime) {
      this.startTime = new Date();
    }
    this.setState({ ...this.state, lastChar: char }, () => {
      this.props.updateGuessed({ char, present });
    });
  }

  win() {
    let { uniqueChars, okCount } = this.stats(this.props);
    return uniqueChars && uniqueChars === okCount;
  }

  stats(props) {
    let uniqueChars = Object.keys(this.babyName().split('').reduce((h, c) => { h[c] = 1; return h; }, {})).length;
    let okCount = props.guessedOkCount;
    return { uniqueChars, okCount };
  }

  babyName() {
    return ascii(this.props.bpoom.babyname || '').toUpperCase().replace(/\s+/g, ' ').replace(/_+/g, '-');
  }

  render() {
    return this.win() ? this.renderWin() : this.renderGame();
  }

  renderWin() {
    let transition = t(stepMsg[nextStep(this.props).transition]);

    return (
      <div styleName="game-container">
        <BubbleSay imgSrc={this.props.bpoom.photo}>
          {t(MSG.win)}{transition}
        </BubbleSay>
        <div styleName="babyname-container">
          <div>
            <div styleName="name">
              {this.babyName().split('').map((c, i) => <div key={i} styleName="char"><span>{c}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderGame() {
    let guessed = this.props.guessed;
    let bpoom = this.props.bpoom;
    let bp_game = bpoom.bp_game || {};
    let charset = (bp_game.charset || []).map(c => c.toUpperCase());
    let name = this.babyName();
    let nameChars = name.split('');
    if (charset.length) {
      nameChars.forEach(c => { if (charset.indexOf(c) < 0) charset.push(c) });
    }
    let lastChar = this.state.lastChar;

    return (
      <div styleName="game-container">
        <BubblePic imgSrc={this.state.picture}>
          {
            lastChar
              ? t({ ...MSG['guessed_' + (name.indexOf(lastChar) < 0 ? 'ko' : 'ok')], values: { char: lastChar } })
              : bp_game.message
          }
        </BubblePic>
        <div styleName="name">
          {
            nameChars.map((c, index) => {
              return <div key={index} styleName={['char', (guessed[c] ? '' : 'ko')].join(' ')}>
                <span>{c}</span>
              </div>
            })
          }
        </div>
        <div styleName="charset">
          {
            charset.map((c) => {
              let klass = ['char'];
              if (true === guessed[c])  { klass.push('ok'); }
              if (false === guessed[c]) { klass.push('ko'); }
              let present = name.indexOf(c) >= 0;
              return (
                <div key={c} onClick={this.handleClick.bind(this, c, present)} styleName={klass.join(' ')}>
                  <div styleName="content">{SPACE_REPLACEMENT[c] || c}</div>
                </div>)
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps }, game: { guessed, guessedOkCount, guessedKoCount } } = state;
  return { bpoom, currentStep, availableSteps, guessed, guessedOkCount, guessedKoCount };
}


const MSG = defineMessages({
  guessed_ok: {
    id: 'game.guessed.ok',
    defaultMessage: 'Bravo, mon prénom contient bien la lettre "{char}" !'
  },
  guessed_ko: {
    id: 'game.guessed.ko',
    defaultMessage: 'Hé non, mon prénom ne contient pas la lettre "{char}" !'
  },
  win: {
    id: 'game.win',
    defaultMessage: 'Bravo ! Tu connais maintenant mon prénom. '
  }
});
