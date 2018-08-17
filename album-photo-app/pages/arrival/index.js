import React, { Component } from 'react'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import BorderBgBox from '../../components/border-bg-box'

import getPhoto from '../../../lib/get-photo'

import styles from './styles.scss'

// i18n
import t from '../../i18n/i18n'
import { injectIntl, defineMessages } from 'react-intl'

@connect(mapStateToProps)
class Arrival extends Component {
  birthday = (intl, date) => {
    if (!date) return ''
    return intl.formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  birthhour = (intl, date) => {
    if (!date || !date.includes('T')) return ''
    let hour = intl.formatDate(date, {
      hour: 'numeric',
      timeZone: 'UTC',
    })
    return t({ ...MSG.hour, values: { hour } })
  }

  getText = (info, attrName, msgName) => {
    let attr = info[attrName]
    if (!attr) return ''
    let msg = MSG[`${msgName || attrName}_${attr}`]
    return msg ? t(msg) : attr
  }

  getDim = (info, attrName) => {
    let attr = info[attrName]
    let unit = info[`${attrName}_unit`]
    return attr && unit ? `${attr} ${unit}` : ''
  }

  nonEmptyAttr = ([name, value]) => value

  renderAttribute = ([name, value]) => (
    <p key={name} styleName={`baby-info-line ${name}`}>
      <i key="" />
      <span>{value}</span>
    </p>
  )

  render() {
    let {
      intl,
      bpoom,
      bpoom: { location_hospital, location_country, location_state },
    } = this.props

    let gender = this.getText(bpoom, 'gender')
    let zodiac = this.getText(bpoom, 'zodiac_sign', 'zodiac')
    let hair = this.getText(bpoom, 'hair_color', 'hair')
    let eyes = this.getText(bpoom, 'eyes_colors', 'eye')
    let weight = this.getDim(bpoom, 'weight')
    let size = this.getDim(bpoom, 'size')

    location_country = location_country ? `, ${location_country}` : ''
    location_state = location_state ? ` - ${location_state}` : ''
    let location = location_hospital ? `${location_hospital}${location_state}${location_country}` : ''

    let attributes = [
      ['lg date', this.birthday(intl, bpoom.birthday)],
      ['lg hour', this.birthhour(intl, bpoom.birthday)],
      ['lg location', location],
      ['sm gender', gender],
      ['sm zodiac', zodiac],
      ['sm weight', weight],
      ['sm hair', hair],
      ['sm size', size],
      ['sm eyes', eyes],
    ].filter(this.nonEmptyAttr)

    return (
      <div>
        <Page reverse styleName="page">
          <PresentationPanel styleName="arrival-presentation-panel">
            <Title label={t(MSG.title)} />
          </PresentationPanel>
          <ContentPanel background />
        </Page>

        <Page styleName="page info-page">
          <PresentationPanel>
            <div styleName="figure">
              <p styleName="fullname">
                <span>{bpoom.babyname}</span> <span styleName="lastname">{bpoom.lastname}</span>
              </p>
              <div
                styleName="baby-img"
                style={{
                  backgroundImage: getPhoto(bpoom.photo) ? `url(${getPhoto(bpoom.photo)})` : '',
                }}
              />
            </div>
          </PresentationPanel>
          <ContentPanel centered styleName="info-content-panel">
            {!!attributes.length && (
              <BorderBgBox styleName="border-box">{attributes.map(this.renderAttribute)}</BorderBgBox>
            )}
          </ContentPanel>
        </Page>
      </div>
    )
  }
}

export default injectIntl(Arrival)

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
}

const MSG = defineMessages({
  title: {
    id: 'arrival.title',
    defaultMessage: 'Mon arrivée',
  },
  hour: {
    id: 'datetime.hour',
    defaultMessage: 'à {hour}',
  },
  gender_F: {
    id: 'gender.F',
    defaultMessage: 'Fille',
  },
  gender_M: {
    id: 'gender.M',
    defaultMessage: 'Garçon',
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
