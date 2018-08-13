import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'
import page from '../../../config/styles/page.scss'

// i18n
import t from '../../i18n/i18n'
import { injectIntl, defineMessages } from 'react-intl'

@connect(mapStateToProps)
class Arrival extends Component {
  birthday(intl, date) {
    if (!date) return ''
    return intl.formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  birthhour(intl, date) {
    if (!date) return ''
    let hour = intl.formatDate(date, {
      hour: 'numeric',
      timeZone: 'UTC',
    })
    return t({ ...MSG.hour, values: { hour } })
  }

  getText(info, attrName, msgName) {
    let attr = info[attrName]
    if (!attr) return ''
    let msg = MSG[`${msgName || attrName}_${attr}`]
    return msg ? t(msg) : attr
  }

  getDim(info, attrName) {
    let attr = info[attrName]
    let unit = info[`${attrName}_unit`]
    return attr && unit ? `${attr} ${unit}` : ''
  }

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

    return (
      <section styleName="styles.section">
        <div styleName="page.page styles.arrival-page">
          <aside styleName="page.page-presentation styles.arrival-page-presentation">
            <div styleName="page.page-title-container">
              <h1 styleName="page.page-title">{t(MSG.title)}</h1>
            </div>
          </aside>
          <main styleName="page.page-content page.page-with-bg styles.arrival-page-content" />
        </div>

        <div styleName="page.page styles.baby-info-page">
          <aside styleName="page.page-presentation styles.baby-info-page-presentation">
            <div styleName="styles.baby-info-figure">
              <p styleName="styles.baby-info-fullname">
                <span>{bpoom.babyname}</span> <span styleName="styles.baby-lastname">{bpoom.lastname}</span>
              </p>
              <div
                style={{
                  backgroundImage: bpoom.photo ? `url(${bpoom.photo})` : '',
                }}
                styleName="page.image-container styles.baby-img"
              />
            </div>
          </aside>

          <main styleName="page.page-content styles.baby-info-page-content">
            <div styleName="page.border-with-bg styles.baby-info-content">
              {bpoom.birthday &&
                location && (
                  <div styleName="styles.baby-info-content-top">
                    {bpoom.birthday && (
                      <p styleName="styles.baby-info-line">
                        <i styleName="styles.birth-date-icon" />
                        <span styleName="styles.baby-info-birth-date">
                          <time styleName="styles.baby-birthdate">{this.birthday(intl, bpoom.birthday)}</time>
                        </span>
                      </p>
                    )}
                    {(bpoom.birthday || '').includes('T') && (
                      <p styleName="styles.baby-info-line">
                        <i styleName="styles.birth-hour-icon" />
                        <span styleName="styles.baby-info-birth-hour">
                          <time styleName="styles.baby-birthhour">{this.birthhour(intl, bpoom.birthday)}</time>
                        </span>
                      </p>
                    )}
                    <p styleName="styles.baby-info-line">
                      <i styleName="styles.birthplace-icon" />
                      <span styleName="styles.baby-info-birth-place styles.baby-birthplace">{location}</span>
                    </p>
                  </div>
                )}
              <div styleName="styles.baby-info-content-bottom">
                <div styleName="styles.baby-info-content-bottom--left">
                  {gender && (
                    <p styleName="styles.baby-info-line">
                      <i styleName="styles.baby-gender-icon" />
                      <span styleName="styles.baby-info-gender styles.baby-gender">{gender}</span>
                    </p>
                  )}
                  {weight && (
                    <p styleName="styles.baby-info-line">
                      <i styleName="styles.baby-weight-icon" />
                      <span styleName="styles.baby-info-weight styles.baby-weight">{weight}</span>
                    </p>
                  )}
                  {size && (
                    <p styleName="styles.baby-info-line">
                      <i styleName="styles.baby-length-icon" />
                      <span styleName="styles.baby-info-length styles.baby-length">{size}</span>
                    </p>
                  )}
                </div>
                <div styleName="styles.baby-info-content-bottom--right">
                  {zodiac && (
                    <p styleName="styles.baby-info-line">
                      <i styleName="styles.baby-sign-icon" />
                      <span styleName="styles.baby-info-zodiac-sign styles.baby-sign">{zodiac}</span>
                    </p>
                  )}
                  {hair && (
                    <p styleName="styles.baby-info-line">
                      <i styleName="styles.baby-hairs-icon" />
                      <span styleName="styles.baby-info-hairs-color styles.baby-hairs-color">{hair}</span>
                    </p>
                  )}
                  {eyes && (
                    <p styleName="styles.baby-info-line">
                      <i styleName="styles.baby-eyes-icon" />
                      <span styleName="styles.baby-info-eyes-color styles.baby-eyes-color">{eyes}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
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
