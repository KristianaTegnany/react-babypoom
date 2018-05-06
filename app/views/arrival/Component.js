import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedDate } from 'react-intl';

import BubblePic from '../../components/bubble-pic/Component';

import { nextStep } from '../../views/app/steps';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

@connect(mapStateToProps)
@CSSModules(styles, { allowMultiple: true })

export default class extends Component {
  birthday(date) {
    if (!date) return '';
    let attrs = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
    if (date.indexOf('T') >= 0) {
      attrs.hour = "numeric";
    }
    return <FormattedDate value={new Date(date)} {...attrs} />
  }

  getText(info, attrName) {
    let attr = info[attrName];
    if (!attr) return '';
    let msg = MSG[`${attrName}_${attr}`];
    return msg ? t(msg) : attr;
  }

  render() {
    let bpoom = this.props.bpoom;
    let arrival = bpoom.bp_arrival || {};
    let transition = t(stepMsg[nextStep(this.props).transition]);

    let info = [
      ['gender',            this.getText(bpoom, 'gender')],
      ['orthernames',       bpoom.othernames],
      ['lastname',          bpoom.lastname],
      ['birthday',          this.birthday(bpoom.birthday), { gender: bpoom.gender || 'M' }],
      ['location_hospital', bpoom.location_hospital],
      ['location_country',  bpoom.country],
      ['location_state',    bpoom.state],
      ['weight',            bpoom.weight && bpoom.weight_unit ? `${bpoom.weight} ${bpoom.weight_unit}` : ''],
      ['size',              bpoom.size && bpoom.size_unit ? `${bpoom.size} ${bpoom.size_unit}` : ''],
      ['zodiac',            this.getText(bpoom, 'zodiac')],
      ['hair_color',        this.getText(bpoom, 'hair_color')],
      ['eyes_colors',       this.getText(bpoom, 'eyes_colors')]
    ].filter(pair => pair[1]);

    return (
      <div styleName="arrival-container">
        {this.renderBubbleMsg(bpoom.photo, arrival.message, 'left')}
        {
          info.length
            ? <div styleName="info">
                <table>
                  <tbody>
                    {
                      info.map(pair => {
                        return (
                          <tr key={pair[0]}>
                            <th>{t({ ...MSG[`title_${pair[0]}`], values: (pair[2] || {}) })}</th>
                            <td>{pair[1]}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            : ''
        }
        {this.renderBubbleMsg(bpoom.photo_mum, bpoom.reaction_mum, 'left')}
        {this.renderBubbleMsg(bpoom.photo_dad, bpoom.reaction_dad, 'right')}
        <BubblePic imgSrc={bpoom.photo}>{transition}</BubblePic>
      </div>
    )
  }

  renderBubbleMsg(pic, msg, side) {
    return msg ? <BubblePic { ...{ side } } imgSrc={pic}>{msg}</BubblePic> : '';
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps } } = state;
  return { bpoom, currentStep, availableSteps };
}



const MSG = defineMessages({
  title_gender: {
    id: 'arrival.title_gender',
    defaultMessage: "Je suis"
  },
  title_orthernames: {
    id: 'arrival.title_orthernames',
    defaultMessage: "Mes prénoms"
  },
  title_lastname: {
    id: 'arrival.title_lastname',
    defaultMessage: "Mon nom"
  },
  title_birthday: {
    id: 'arrival.title_birthday',
    defaultMessage: "Je suis {gender, select, M {né} F {née}} le"
  },
  title_location_hospital: {
    id: 'arrival.title_location_hospital',
    defaultMessage: "Clinique"
  },
  title_location_country: {
    id: 'arrival.title_location_country',
    defaultMessage: "Pays"
  },
  title_location_state: {
    id: 'arrival.title_location_state',
    defaultMessage: "État"
  },
  title_weight: {
    id: 'arrival.title_weight',
    defaultMessage: "Je pèse"
  },
  title_size: {
    id: 'arrival.title_size',
    defaultMessage: "Je mesure"
  },
  title_zodiac: {
    id: 'arrival.title_zodiac',
    defaultMessage: "Mon signe"
  },
  title_hair_color: {
    id: 'arrival.title_hair_color',
    defaultMessage: "Mes cheveux"
  },
  title_eyes_colors: {
    id: 'arrival.title_eyes_colors',
    defaultMessage: "Mes yeux"
  },
  gender_F: {
    id: 'gender.F',
    defaultMessage: 'Une petite fille'
  },
  gender_M: {
    id: 'gender.M',
    defaultMessage: 'Un petit garçon'
  },
  zodiac_aries: {
    id: 'zodiac.aries',
    defaultMessage: 'Bélier'
  },
  zodiac_taurus: {
    id: 'zodiac.taurus',
    defaultMessage: 'Taureau'
  },
  zodiac_gemini: {
    id: 'zodiac.gemini',
    defaultMessage: 'Gémeaux'
  },
  zodiac_cancer: {
    id: 'zodiac.cancer',
    defaultMessage: 'Cancer'
  },
  zodiac_leo: {
    id: 'zodiac.leo',
    defaultMessage: 'Lion'
  },
  zodiac_virgo: {
    id: 'zodiac.virgo',
    defaultMessage: 'Vierge'
  },
  zodiac_libra: {
    id: 'zodiac.libra',
    defaultMessage: 'Balance'
  },
  zodiac_scorpio: {
    id: 'zodiac.scorpio',
    defaultMessage: 'Scorpion'
  },
  zodiac_sagittarius: {
    id: 'zodiac.sagittarius',
    defaultMessage: 'Sagittaire'
  },
  zodiac_capricorn: {
    id: 'zodiac.capricorn',
    defaultMessage: 'Capricorne'
  },
  zodiac_aquarius: {
    id: 'zodiac.aquarius',
    defaultMessage: 'Verseau'
  },
  eye_blue : {
    id: 'eye.blue ',
    defaultMessage: 'Bleu'
  },
  eye_brown: {
    id: 'eye.brown',
    defaultMessage: 'Marron'
  },
  eye_grey : {
    id: 'eye.grey ',
    defaultMessage: 'Gris'
  },
  eye_green: {
    id: 'eye.green',
    defaultMessage: 'Vert'
  },
  eye_hazel: {
    id: 'eye.hazel',
    defaultMessage: 'Noisette'
  },
  eye_black: {
    id: 'eye.black',
    defaultMessage: 'Noir'
  },
  hair_black: {
    id: 'hair.black',
    defaultMessage: 'Noir'
  },
  hair_dark_brown: {
    id: 'hair.dark_brown',
    defaultMessage: 'Brun'
  },
  hair_blond: {
    id: 'hair.blond',
    defaultMessage: 'Blond'
  }
});


