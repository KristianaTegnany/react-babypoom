import React, { Component, useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl'
import { reduxForm, Field } from 'redux-form'
import ReactGA from 'react-ga'
import { required, email, length, addValidator, date, numericality, combine } from 'redux-form-validators'

import useScrollToTop from '../../hooks/scroll-top'

// Payment
import mangoPay from 'mangopay-cardregistration-js-kit'

import { saveMangopayAccount, saveMangopayPayment } from '../app/Actions'
import { flash } from '../../components/flash/Actions'

// Components
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'

// i18n
import t from '../../i18n/i18n'
import FORM_MSG from '../../i18n/messages/form'
import MP_MSG from '../../i18n/messages/mangopay'

// Lib
import { InputField, SelectField } from '../../../lib/redux-form-input'
import { extractParams } from '../../../lib/params'
import { visaMastercardNum, cardDate, int } from '../../../lib/normalizer'

// CSS
import styles from './styles.scss'

// Images
import poweredBy from '../../images/powered-by-mangopay.png'

// Icon
import FaSpinner from 'react-icons/lib/fa/spinner'

const MANGOPAY_ACCOUNT_FIELDS = ['email', 'first_name', 'last_name', 'last_sumcent']
const MANGOPAY_REGISTRATION_FIELDS = ['cardRegistrationURL', 'preregistrationData', 'accessKey', 'Id']
const MANGOPAY_DATE_FORMAT = 'mmyy'

const visaMC = addValidator({
  validator: (_, value) => (int(value).length !== 16 ? FORM_MSG.form_visa_mc_len : void 0),
})

let GiftCharityForm = ({
  bpoom,
  intl,
  flash,
  onSave,
  onCancel,
  handleSubmit,
  submitting,
  saveMangopayAccount,
  saveMangopayPayment,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const scrollElt = useScrollToTop()

  let format = intl.formatMessage(FORM_MSG.form_card_expiration_date_format)
  let ymd = intl.formatMessage(FORM_MSG.form_card_expiration_date_ymd)

  const onSubmit = values => {
    setIsSubmitting(true)
    let mangopayAccountParams = extractParams(values, { name: 'mangopay_account', only: MANGOPAY_ACCOUNT_FIELDS })
    return saveMangopayAccount(mangopayAccountParams)
      .then(json => {
        let cardRegistration = mangoPay.cardRegistration
        cardRegistration.baseURL = json.cardRegistrationBaseURL
        cardRegistration.clientId = json.cardRegistrationClientId
        cardRegistration.init(extractParams(json, { only: MANGOPAY_REGISTRATION_FIELDS }))
        cardRegistration.registerCard(
          {
            cardNumber: int(values.card_number),
            cardExpirationDate: date.formatDate(
              date.parseDate(values.card_expiration_date, format, ymd),
              MANGOPAY_DATE_FORMAT,
            ),
            cardCvx: int(values.card_cvx),
            cardType: 'CB_VISA_MASTERCARD',
          },
          res => {
            saveMangopayPayment(
              bpoom.uuid,
              extractParams(
                {
                  mangopay_card_id: res.CardId,
                  mangopay_account_id: json.mpaid,
                  sumcent: json.sumcent,
                },
                { name: 'mangopay_payment' },
              ),
            )
              .then(() => {
                onSave && onSave()
                flash('info', MSG.thanks)
                ReactGA.ga('send', 'charity-gift')
              })
              .catch(e => setIsSubmitting(false))
          },
          res => {
            setIsSubmitting(false)
            flash('danger', MP_MSG[`error_${res.ResultCode}`] || MP_MSG.error_default)
          },
        )
      })
      .catch(e => setIsSubmitting(false))
  }

  submitting = submitting || isSubmitting

  return (
    <div ref={scrollElt} styleName="visitorbook-form">
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          name="last_sumcent"
          label={t(FORM_MSG.form_last_sumcent)}
          component={SelectField}
          options={[10, 20, 30, 50, 100].map(x => [{ ...MSG.charity_form_amount, values: { amount: x } }, x * 100])}
          i18n="true"
          includeBlank="--"
          validate={required({ msg: t(FORM_MSG.form_last_sumcent_required) })}
        />

        <div styleName="col-2">
          <div>
            <Field name="first_name" label={t(FORM_MSG.form_first_name)} component={InputField} validate={required()} />
          </div>
          <div>
            <Field name="last_name" label={t(FORM_MSG.form_last_name)} component={InputField} validate={required()} />
          </div>
        </div>

        <Field
          name="email"
          type="email"
          label={t(FORM_MSG.form_email)}
          component={InputField}
          validate={combine(
            required({ msg: t(FORM_MSG.form_email_required) }),
            email({ msg: t(FORM_MSG.form_email_invalid) }),
          )}
        />

        <hr />

        <Field
          name="card_number"
          label={
            <span>
              {t(FORM_MSG.form_card_number)} <small>{t(FORM_MSG.form_card_number_type)}</small>
            </span>
          }
          className={styles['card-number']}
          component={InputField}
          placeholder="____ ____ ____ ____"
          normalize={visaMastercardNum}
          maxLength="19"
          validate={combine(required(), visaMC())}
        />

        <div styleName="col-2">
          <div>
            <Field
              name="card_expiration_date"
              label={t(FORM_MSG.form_card_expiration_date)}
              component={InputField}
              placeholder={format}
              normalize={cardDate}
              validate={combine(required(), date({ format, ymd }))}
            />
          </div>
          <div>
            <Field
              name="card_cvx"
              label={t(FORM_MSG.form_card_cvx)}
              className={styles['card-number']}
              component={InputField}
              placeholder="___"
              normalize={int}
              maxLength="3"
              validate={combine(required(), length({ is: 3 }), numericality({ int: true }))}
            />
          </div>
        </div>

        <img styleName="powered-by" src={poweredBy} alt="Powered by Mangopay" />

        <div styleName="actions">
          <Button disabled={submitting} color="neutral-app" onClick={() => onCancel && onCancel()}>
            {t(FORM_MSG.form_cancel)}
          </Button>
          <Button disabled={submitting} color="app" type="submit">
            {submitting ? <FaSpinner styleName="icon" className="icon-pulse" /> : ''}
            {t(FORM_MSG.form_submit)}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default injectIntl(
  reduxForm({
    form: 'giftCharityForm',
    touchOnBlur: false,
    onSubmitFail: errors => {
      let fieldName = Object.keys(errors || {})[0]
      let firstField = document.querySelector(`[name="${fieldName}"]`)
      firstField && firstField.focus()
    },
  })(
    connect(
      mapStateToProps,
      { saveMangopayAccount, saveMangopayPayment, flash },
    )(GiftCharityForm),
  ),
)

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
}

const MSG = defineMessages({
  charity_form_amount: {
    id: 'charity.form.amount',
    defaultMessage: '{amount, number} {amount, plural, one {Euro} other {Euros}}',
  },
  thanks: {
    id: 'charity.thanks',
    defaultMessage: 'Paiement effectué.\nMerci beaucoup pour cette attention.',
  },
})
