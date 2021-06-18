import React, { useState } from 'react'
import { connect } from 'react-redux'
import { defineMessages, FormattedDate } from 'react-intl'
import { loadSlideshow, openSlideshow } from '../../components/slideshow/Actions'
import useSlideshow from '../../hooks/slide-show'
import BubblePic from '../../components/bubble-pic'
import BubbleSay from '../../components/bubble-say'
import BpoomTitle from '../../components/bpoom-title'
import { Field, Form, Formik } from 'formik'
import InputGroup from 'reactstrap/lib/InputGroup'
import Input from 'reactstrap/lib/Input'
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon'
import Button from 'reactstrap/lib/Button'
import Transition from '../../components/transition'
import getPhoto from '../../../lib/get-photo'
import Tracking from '../../../lib/tracking'
import t from '../../i18n/i18n'
import imgPath from '../../../lib/img-path'
import config from '../../../config'
import Panel from '../../components/panel'
import { sendCardByEmail } from '../app/Actions'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import useToggle from '../../hooks/toggle'
import './styles.scss'

const DEFAULT_PHOTO_PARENT_1 = imgPath('/avatars/parent-1.svg' + config.avatarBackgroundQuerystring)
const DEFAULT_PHOTO_PARENT_2 = imgPath('/avatars/parent-2.svg' + config.avatarBackgroundQuerystring)

let Arrival = ({ bpoom, desktop, noNav, loadSlideshow, openSlideshow, sendCardByEmail }) => {
  useSlideshow(bpoom, loadSlideshow, () => [{ src: [bpoom.card_url, bpoom.card_url] }])

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
    ['location_state', (bpoom.location_state || '').trim()],
    ['location_country', (bpoom.location_country || '').trim()],
    ['weight', bpoom.weight && bpoom.weight_unit ? `${bpoom.weight} ${bpoom.weight_unit}` : ''],
    ['size', bpoom.size && bpoom.size_unit ? `${bpoom.size} ${bpoom.size_unit}` : ''],
    ['zodiac', getText(bpoom, 'zodiac_sign', 'zodiac')],
    ['hair_color', getText(bpoom, 'hair_color', 'hair')],
    ['eyes_color', getText(bpoom, 'eyes_color', 'eye')],
  ].filter((pair) => pair[1])

  let photo = getPhoto(bpoom.photo_urls, 'thumbnail')
  const [sent, setSent] = useState(false)
  const form = useToggle(false)

  function onSubmit(values, actions) {
    sendCardByEmail(bpoom.uuid, values.email)
      .then(() => {
        setSent(true)
        actions.setSubmitting(false)
        Tracking.track("SouvenirCard_sent_by_email", {bpoom_id: bpoom.id})
      })
      .catch(() => actions.setSubmitting(false))
  }

  const validate = (values) => {
    const errors = {}
    const emailError = email({ msg: t(FORM_MSG.form_email_invalid) })(values.email)
    if (emailError) errors.email = emailError
    return errors
  }

  return (
    <div styleName="arrival-container">
      {renderBubbleMsg(photo, bpoom.arrival_message, 'left')}
      {!bpoom.souvenir_disabled && bpoom.card_url && (
        <Panel title={t(MSG.souvenir_title)}>
          <img onClick={openSlideshow} src={bpoom.card_url} />

          <div styleName="action">
            {sent ? (
              <div styleName="sent">{t(MSG.sent)}</div>
            ) : (
              <React.Fragment>
                {!form.visible && (
                  <Button block color="app" onClick={form.show}>
                    <i styleName="icon">
                      <FaEnvelope />
                    </i>{' '}
                    {t(MSG.souvenir_button)}
                  </Button>
                )}
                {form.visible && (
                  <Formik validate={validate} onSubmit={onSubmit} initialValues={{ email: '' }}>
                    {({ isSubmitting, errors }) => (
                      <Form noValidate>
                        {t(MSG.send_by_email)}
                        <InputGroup>
                          <Field
                            name="email"
                            type="email"
                            label={null}
                            render={({ field }) => <Input invalid={!!errors.email} {...field} />}
                          />
                          <InputGroupAddon addonType="append">
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              color="app"
                              id="action-bt-friend-asked-souvenir"
                            >
                              {t(MSG.ok)}
                            </Button>
                          </InputGroupAddon>
                          {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                        </InputGroup>
                      </Form>
                    )}
                  </Formik>
                )}
              </React.Fragment>
            )}
          </div>
        </Panel>
      )}
      {info.length ? (
        <>
          <BpoomTitle>{t(MSG.infos_details_title)}</BpoomTitle>
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
        </>
      ) : (
        ''
      )}

      {noNav ? '' : renderBubbleMsg(photo, <Transition />, 'left')}
    </div>
  )
}

export default connect(mapStateToProps, { loadSlideshow, openSlideshow, sendCardByEmail })(Arrival)

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
  return msg ? t(msg) : ''
}

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
  souvenir_title: {
    id: 'souvenir.souvenir_title',
    defaultMessage: 'Mon faire-part souvenir',
  },
  souvenir_description: {
    id: 'souvenir.souvenir_description',
    defaultMessage:
      'Mes parents sont heureux de t’offrir ce faire-part à télécharger, qui regroupe toutes les informations de ma naissance.',
  },
  souvenir_button: {
    id: 'souvenir.souvenir_button',
    defaultMessage: 'Recevez ce souvenir par mail',
  },
  infos_details_title: {
    id: 'arrival.infos_details_title',
    defaultMessage: 'Le détail de mon arrivée',
  },
  send_by_email: {
    id: 'souvenir.send_by_email',
    defaultMessage: 'Envoyez-moi le faire-part par email',
  },
  sent: {
    id: 'souvenir.sent',
    defaultMessage: 'Faire-part envoyé !',
  },
  ok: {
    id: 'souvenir.ok',
    defaultMessage: 'Ok',
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
    defaultMessage: 'Ville',
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
