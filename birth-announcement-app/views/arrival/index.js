import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages, FormattedDate } from 'react-intl'

import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'

import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import BpoomTitle from '../../components/bpoom-title'
import Transition from '../../components/transition'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'
import defaultPhoto from '../../images/default.jpeg'

@connect(
  mapStateToProps,
  { loadSlideshow, openSlideshow },
)
export default class Arrival extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let bpoom = nextProps.bpoom
    let items = [
      { src: bpoom.photo_mum, description: bpoom.reaction_mum },
      { src: bpoom.photo_dad, description: bpoom.reaction_dad },
    ].filter(x => x.src)
    if (items.length) {
      nextProps.loadSlideshow({ items })
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {}

    this.openSlideshow0 = this.openSlideshow.bind(this, 0)
    this.openSlideshow1 = this.openSlideshow.bind(this, 1)
  }

  birthday(date) {
    if (!date) return ''
    let attrs = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }
    if (date.indexOf('T') >= 0) {
      attrs.hour = 'numeric'
    }
    return <FormattedDate value={new Date(date)} {...attrs} />
  }

  getText(info, attrName, msgName) {
    let attr = info[attrName]
    if (!attr) return ''
    let msg = MSG[`${msgName || attrName}_${attr}`]
    return msg ? t(msg) : attr
  }

  render() {
    let props = this.props
    let bpoom = props.bpoom
    let arrival = bpoom.bp_arrival || {}

    let info = [
      ['gender', this.getText(bpoom, 'gender')],
      ['name', (bpoom.babyname || '').trim()],
      ['orthernames', (bpoom.othernames || '').trim()],
      ['lastname', (bpoom.lastname || '').trim()],
      ['birthday', this.birthday(bpoom.birthday), { gender: bpoom.gender || 'M' }],
      ['location_hospital', (bpoom.location_hospital || '').trim()],
      ['location_country', (bpoom.country || '').trim()],
      ['location_state', (bpoom.state || '').trim()],
      ['weight', bpoom.weight && bpoom.weight_unit ? `${bpoom.weight} ${bpoom.weight_unit}` : ''],
      ['size', bpoom.size && bpoom.size_unit ? `${bpoom.size} ${bpoom.size_unit}` : ''],
      ['zodiac', this.getText(bpoom, 'zodiac_sign', 'zodiac')],
      ['hair_color', this.getText(bpoom, 'hair_color', 'hair')],
      ['eyes_colors', this.getText(bpoom, 'eyes_colors', 'eye')],
    ].filter(pair => pair[1])

    return (
      <div styleName="arrival-container">
        {this.renderBubbleMsg(bpoom.photo_thumbnail, arrival.message, 'left')}
        {info.length ? (
          <div styleName="info">
            <table>
              <tbody>
                {info.map(pair => {
                  return (
                    <tr key={pair[0]}>
                      <th>{t({ ...MSG[`title_${pair[0]}`], values: pair[2] || {} })}</th>
                      <td>{pair[1]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
        {bpoom.reaction_mum && bpoom.reaction_dad ? <BpoomTitle>{t(MSG.parent_reaction)}</BpoomTitle> : ''}
        {this.renderBubbleMsg(bpoom.photo_mum_thumbnail || defaultPhoto, bpoom.reaction_mum, 'left', 0)}
        {this.renderBubbleMsg(bpoom.photo_dad_thumbnail || defaultPhoto, bpoom.reaction_dad, 'right', 1)}
        {props.noNav ? '' : this.renderBubbleMsg(bpoom.photo_thumbnail, <Transition />, 'left')}
      </div>
    )
  }

  openSlideshow(index) {
    this.props.openSlideshow(index)
  }

  renderBubbleMsg(pic, msg, side, index) {
    if (!msg) return ''
    return this.props.desktop ? (
      <BubbleSay onClick={index != null ? this[`openSlideshow${index}`] : null} speechDir={side} imgSrc={pic}>
        {msg}
      </BubbleSay>
    ) : (
      <BubblePic onClick={index != null ? this[`openSlideshow${index}`] : null} side={side} imgSrc={pic}>
        {msg}
      </BubblePic>
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
  parent_reaction: {
    id: 'arrival.parent_reaction',
    defaultMessage: 'La réaction des parents',
  },
  title_gender: {
    id: 'arrival.title_gender',
    defaultMessage: 'Je suis',
  },
  title_name: {
    id: 'arrival.title_name',
    defaultMessage: 'Mon prénom',
  },
  title_orthernames: {
    id: 'arrival.title_orthernames',
    defaultMessage: 'Autres prénoms',
  },
  title_lastname: {
    id: 'arrival.title_lastname',
    defaultMessage: 'Mon nom',
  },
  title_birthday: {
    id: 'arrival.title_birthday',
    defaultMessage: 'Je suis {gender, select, M {né} F {née}} le',
  },
  title_location_hospital: {
    id: 'arrival.title_location_hospital',
    defaultMessage: 'Clinique',
  },
  title_location_country: {
    id: 'arrival.title_location_country',
    defaultMessage: 'Pays',
  },
  title_location_state: {
    id: 'arrival.title_location_state',
    defaultMessage: 'État',
  },
  title_weight: {
    id: 'arrival.title_weight',
    defaultMessage: 'Je pèse',
  },
  title_size: {
    id: 'arrival.title_size',
    defaultMessage: 'Je mesure',
  },
  title_zodiac: {
    id: 'arrival.title_zodiac',
    defaultMessage: 'Mon signe',
  },
  title_hair_color: {
    id: 'arrival.title_hair_color',
    defaultMessage: 'Mes cheveux',
  },
  title_eyes_colors: {
    id: 'arrival.title_eyes_colors',
    defaultMessage: 'Mes yeux',
  },
  gender_F: {
    id: 'gender.F',
    defaultMessage: 'Une petite fille',
  },
  gender_M: {
    id: 'gender.M',
    defaultMessage: 'Un petit garçon',
  },
  zodiac_aries: {
    id: 'zodiac.aries',
    defaultMessage: 'Bélier',
  },
  zodiac_taurus: {
    id: 'zodiac.taurus',
    defaultMessage: 'Taureau',
  },
  zodiac_gemini: {
    id: 'zodiac.gemini',
    defaultMessage: 'Gémeaux',
  },
  zodiac_cancer: {
    id: 'zodiac.cancer',
    defaultMessage: 'Cancer',
  },
  zodiac_leo: {
    id: 'zodiac.leo',
    defaultMessage: 'Lion',
  },
  zodiac_virgo: {
    id: 'zodiac.virgo',
    defaultMessage: 'Vierge',
  },
  zodiac_libra: {
    id: 'zodiac.libra',
    defaultMessage: 'Balance',
  },
  zodiac_scorpio: {
    id: 'zodiac.scorpio',
    defaultMessage: 'Scorpion',
  },
  zodiac_sagittarius: {
    id: 'zodiac.sagittarius',
    defaultMessage: 'Sagittaire',
  },
  zodiac_capricorn: {
    id: 'zodiac.capricorn',
    defaultMessage: 'Capricorne',
  },
  zodiac_aquarius: {
    id: 'zodiac.aquarius',
    defaultMessage: 'Verseau',
  },
  zodiac_pisces: {
    id: 'zodiac.pisces',
    defaultMessage: 'Poisson',
  },
  eye_blue: {
    id: 'eye.blue ',
    defaultMessage: 'Bleu',
  },
  eye_green: {
    id: 'eye.green',
    defaultMessage: 'Vert',
  },
  eye_brown: {
    id: 'eye.brown',
    defaultMessage: 'Marron',
  },
  eye_hazel: {
    id: 'eye.hazel',
    defaultMessage: 'Noisette',
  },
  eye_black: {
    id: 'eye.black',
    defaultMessage: 'Noir',
  },
  eye_green_blue: {
    id: 'eye.green_blue ',
    defaultMessage: 'Bleu-vert',
  },
  eye_grey: {
    id: 'eye.grey ',
    defaultMessage: 'Gris',
  },
  hair_black: {
    id: 'hair.black',
    defaultMessage: 'Noir',
  },
  hair_dark_brown: {
    id: 'hair.dark_brown',
    defaultMessage: 'Brun',
  },
  hair_light_brown: {
    id: 'hair.light_brown',
    defaultMessage: 'Châtain',
  },
  hair_blond: {
    id: 'hair.blond',
    defaultMessage: 'Blond',
  },
  hair_ginger: {
    id: 'hair.ginger',
    defaultMessage: 'Roux',
  },
  hair_auburn: {
    id: 'hair.auburn',
    defaultMessage: 'Auburn',
  },
  hair_white: {
    id: 'hair.white',
    defaultMessage: 'Blanc',
  },
})
