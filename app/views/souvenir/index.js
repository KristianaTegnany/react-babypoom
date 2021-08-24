import React, { useState } from 'react'
import { connect } from 'react-redux'
import BubbleSay from '../../components/bubble-say'
import Transition from '../../components/transition'
import getPhoto from '../../../lib/get-photo'
import imgPath from '../../../lib/img-path'
import Panel from '../../components/panel'
import Button from 'reactstrap/lib/Button'
import InputGroup from 'reactstrap/lib/InputGroup'
import Input from 'reactstrap/lib/Input'
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon'
import t from '../../i18n/i18n'
import FORM_MSG from '../../i18n/messages/form'
import { defineMessages } from 'react-intl'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import { Field, Form, Formik } from 'formik'
import { email } from 'redux-form-validators'
import { sendCardByEmail } from '../app/Actions'
import BABY_IMAGES from '../../../lib/baby-img'
import './styles.scss'

let Souvenir = ({ bpoom, desktop, sendCardByEmail }) => {
  const [sent, setSent] = useState(false)

  function onSubmit(values, actions) {
    sendCardByEmail(bpoom.uuid, values.email)
      .then(() => {
        setSent(true)
        if (bpoom.shared_by_visits && values.email != bpoom.email){
          window.localStorage.showGiftOffer = true
        }
        actions.setSubmitting(false)
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
    <div styleName="souvenir-container">
      {bpoom.card_url && (
        <React.Fragment>
          <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={getPhoto(bpoom.photo_urls, 'thumbnail')}>
            {bpoom.souvenir_message}
          </BubbleSay>
          <Panel title={t(MSG.souvenir_title)}>
            {t(MSG.souvenir_description)}

            <img src={bpoom.card_url} />

            <div styleName="action">
              {sent ? (
                <div styleName="sent">{t(MSG.sent)}</div>
              ) : (
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
                          <Button disabled={isSubmitting} type="submit" color="app">
                            {t(MSG.ok)}
                          </Button>
                        </InputGroupAddon>
                        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                      </InputGroup>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </Panel>
        </React.Fragment>
      )}

      <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={imgPath('/mascot/says.png')}>
        <Transition />
      </BubbleSay>
    </div>
  )
}

export default connect(mapStateToProps, { sendCardByEmail })(Souvenir)

function mapStateToProps(state) {
  const {
    app: { bpoom },
    mediaQueries: { desktop },
  } = state
  return { bpoom, desktop }
}

const MSG = defineMessages({
  souvenir_title: {
    id: 'souvenir.souvenir_title',
    defaultMessage: 'Un faire-part original et personalisé à télécharger',
  },
  souvenir_description: {
    id: 'souvenir.souvenir_description',
    defaultMessage:
      'Mes parents sont heureux de t’offrir ce faire-part à télécharger, qui regroupe toutes les informations de ma naissance.',
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
})
