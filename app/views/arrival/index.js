import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages, FormattedDate } from 'react-intl'

import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'

// Hooks
import useSlideshow from '../../hooks/slide-show'

// Components
import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import BpoomTitle from '../../components/bpoom-title'
import Transition from '../../components/transition'

// Lib
import getPhoto from '../../../lib/get-photo'

// i18n
import t from '../../i18n/i18n'

// CSS
import styles from './styles.scss'
import imgPath from '../../../lib/img-path'

let Arrival = ({ bpoom, desktop, noNav, loadSlideshow, openSlideshow }) => {
  useSlideshow(bpoom, loadSlideshow, () =>
    [
      {
        src: [getPhoto(bpoom.parent_1_photo_urls, 'normal'), getPhoto(bpoom.parent_1_photo_urls, 'thumbnail')],
        description: bpoom.parent_1_reaction,
      },
      {
        src: [getPhoto(bpoom.parent_2_photo_urls, 'normal'), getPhoto(bpoom.parent_2_photo_urls, 'thumbnail')],
        description: bpoom.parent_2_reaction,
      },
    ].filter((x) => x.src),
  )

  const renderBubbleMsg = (pic, msg, side, index) =>
    !msg ? (
      ''
    ) : desktop ? (
      <BubbleSay onClick={index != null ? () => openSlideshow(index) : null} speechDir={side} imgSrc={pic}>
        {msg}
      </BubbleSay>
    ) : (
      <BubblePic onClick={index != null ? () => openSlideshow(index) : null} side={side} imgSrc={pic}>
        {msg}
      </BubblePic>
    )

  let info = [
    ['gender', getText(bpoom, 'gender')],
    ['name', (bpoom.baby_name || '').trim()],
    ['other_names', (bpoom.other_names || '').trim()],
    ['last_name', (bpoom.last_name || '').trim()],
    ['birthday', birthday(bpoom.birthday), { gender: bpoom.gender || 'M' }],
    ['location_hospital', (bpoom.location_hospital || '').trim()],
    ['location_country', (bpoom.country || '').trim()],
    ['location_state', (bpoom.state || '').trim()],
    ['weight', bpoom.weight && bpoom.weight_unit ? `${bpoom.weight} ${bpoom.weight_unit}` : ''],
    ['size', bpoom.size && bpoom.size_unit ? `${bpoom.size} ${bpoom.size_unit}` : ''],
    ['zodiac', getText(bpoom, 'zodiac_sign', 'zodiac')],
    ['hair_color', bpoom.hair_color == 'undefined' ? '' : getText(bpoom, 'hair_color', 'hair')],
    ['eyes_color', bpoom.eyes_color == 'undefined' ? '' : getText(bpoom, 'eyes_color', 'eye')],
  ].filter((pair) => pair[1])

  let photo = getPhoto(bpoom.photo_urls, 'thumbnail')
  return (
    <div styleName="arrival-container">
      {renderBubbleMsg(photo, bpoom.arrival_message, 'left')}
      {info.length ? (
        <div styleName="info">
          <table>
            <tbody>
              {info.map((pair) => {
                return (
                  <tr key={pair[0]}>
                    <th>{t(MSG[`title_${pair[0]}`], pair[2])}</th>
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
      {bpoom.parent_1_reaction && bpoom.parent_2_reaction ? <BpoomTitle>{t(MSG.parent_reaction)}</BpoomTitle> : ''}
      {renderBubbleMsg(
        getPhoto(bpoom.parent_1_photo_urls, 'thumbnail') || imgPath('/avatars/parent_1.svg'),
        bpoom.parent_1_reaction,
        'left',
        0,
      )}
      {renderBubbleMsg(
        getPhoto(bpoom.parent_2_photo_urls, 'thumbnail') || imgPath('/avatars/parent_2.svg'),
        bpoom.parent_2_reaction,
        'right',
        1,
      )}
      {noNav ? '' : renderBubbleMsg(photo, <Transition />, 'left')}
    </div>
  )
}

export default connect(mapStateToProps, { loadSlideshow, openSlideshow })(Arrival)

function birthday(date) {
  if (!date) return ''
  let attrs = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }
  if (date.indexOf('T') >= 0) {
    attrs.hour = 'numeric'
    attrs.minute = 'numeric'
  }
  return <FormattedDate value={new Date(date)} {...attrs} />
}

function getText(info, attrName, msgName) {
  let attr = info[attrName]
  if (!attr) return ''
  let msg = MSG[`${msgName || attrName}_${attr}`]
  return msg ? t(msg) : attr
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
  title_other_names: {
    id: 'arrival.title_other_names',
    defaultMessage: 'Autres prénoms',
  },
  title_last_name: {
    id: 'arrival.title_last_name',
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
  title_eyes_color: {
    id: 'arrival.title_eyes_color',
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
