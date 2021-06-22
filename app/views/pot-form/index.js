import React, {useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { defineMessages, injectIntl } from 'react-intl'
import { Formik, Form, Field } from 'formik'
import ReactGA from 'react-ga'
import { required, email, length, addValidator, date, numericality, combine } from 'redux-form-validators'
import useScrollToTop from '../../hooks/scroll-top'
import mangoPay from 'mangopay-cardregistration-js-kit'
import { saveMangopayAccount, saveMangopayPayment } from '../app/Actions'
import { flash } from '../../components/flash/Actions'
import Button from 'reactstrap/lib/Button'
import t from '../../i18n/i18n'
import FORM_MSG from '../../i18n/messages/form'
import MP_MSG from '../../i18n/messages/mangopay'
import { InputField, SelectField } from '../../../lib/redux-form-input'
import { extractParams } from '../../../lib/params'
import Tracking from '../../../lib/tracking'
import { visaMastercardNum, cardDate, int } from '../../../lib/normalizer'
import FaSpinner from 'react-icons/lib/fa/spinner'
import imgPath from '../../../lib/img-path'
import styles from './styles.scss'
import { Prompt } from 'react-router'

const MANGOPAY_ACCOUNT_FIELDS = ['email', 'first_name', 'last_name', 'last_sumcent']
const MANGOPAY_REGISTRATION_FIELDS = ['cardRegistrationURL', 'preregistrationData', 'accessKey', 'Id']
const MANGOPAY_DATE_FORMAT = 'mmyy'

const visaMC = addValidator({
  validator: (_, value) => (int(value).length !== 16 ? FORM_MSG.form_visa_mc_len : void 0),
})

let PotForm = ({ bpoom, intl, flash, onSave, onCancel, saveMangopayAccount, saveMangopayPayment }) => {
  const scrollElt = useScrollToTop()

  useEffect(() => {
    const className = document.body.className
    document.body.className = 'no-bars'
    return () => document.body.className = className
  }, [])

  const [userIp, setUserIp] = useState({})
  useEffect(() => {
    async function getUserIp() {
      let response = await fetch('https://api.ipify.org?format=json')
      response = await response.json()
      setUserIp(response)
    }
    getUserIp()
  }, [])

  let format = intl.formatMessage(FORM_MSG.form_card_expiration_date_format)
  let ymd = intl.formatMessage(FORM_MSG.form_card_expiration_date_ymd)




  const onSubmit = (values, actions) => {
    let mangopayAccountParams = extractParams(values, { only: MANGOPAY_ACCOUNT_FIELDS })
    return saveMangopayAccount(mangopayAccountParams)
      .then((json) => {
        if (json.error) throw new Error('FAIL')

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
          (res) => {
            var browserInfo = {
              AcceptHeader: "*/*",
              TimeZoneOffset: new Date().getTimezoneOffset().toString(),
              UserAgent: navigator.userAgent,
              Language: navigator.language,
              JavaEnabled: navigator.javaEnabled(),
              ScreenWidth: window.screen.width,
              ScreenHeight: window.screen.height,
              ColorDepth: window.screen.colorDepth,
              JavascriptEnabled: true,
            }

            saveMangopayPayment(bpoom.uuid, {
              mangopay_card_id: res.CardId,
              mangopay_account_id: json.mpaid,
              sumcent: json.sumcent,
              browser_info: JSON.stringify(browserInfo),
              ip_address: userIp.ip,
            })
              .then((json) => {
                if (json.error) {
                  actions.setSubmitting(false)
                  flash('danger', MP_MSG.error_default)
                  throw new Error('FAIL')
                }
                if (json.redirect) {
                  actions.setSubmitting(false)
                  document.location.href=json.redirect
                }
                onSave && onSave()
                flash('info', MSG.thanks)
                ReactGA.ga('send', 'charity-gift')
                Tracking.track("Pot_Form_Success", {bpoom_id: bpoom.id})
              })
              .catch(() => actions.setSubmitting(false))
          },
          (res) => {
            actions.setSubmitting(false)
            flash('danger', MP_MSG[`error_${res.ResultCode}`] || MP_MSG.error_default)
          },
        )
      })
      .catch(() => actions.setSubmitting(false))
  }

  const initialValues = {
    last_sumcent: 10,
    first_name: '',
    last_name: '',
    email: '',
    card_number: '',
    card_expiration_date: '',
    card_cvx: '',
  }

  return (
    <div ref={scrollElt} styleName="pot-form">
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form noValidate>
            <Field
              name="last_sumcent"
              label={t(FORM_MSG.form_last_sumcent)}
              component={SelectField}
              options={[10, 20, 30, 50, 100].map((x) => [
                { ...MSG.charity_form_amount, values: { amount: x } },
                x * 100,
              ])}
              i18n="true"
              includeBlank="--"
              validate={required({ msg: t(FORM_MSG.form_last_sumcent_required) })}
            />

            <div styleName="col-2">
              <div>
                <Field
                  name="first_name"
                  label={t(FORM_MSG.form_first_name)}
                  component={InputField}
                  validate={required()}
                />
              </div>
              <div>
                <Field
                  name="last_name"
                  label={t(FORM_MSG.form_last_name)}
                  component={InputField}
                  validate={required()}
                />
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

            <img styleName="powered-by" src={imgPath('/payments/powered-by-mangopay.png')} alt="Powered by Mangopay" />

            <div styleName="actions">
              <Prompt
                when={!isSubmitting}
                message={(location) => {
                  return location.pathname.endsWith('/souvenir')
                    ? `Es-tu sûr de vouloir continuer sans valider ton cadeau?`
                    : true
                }}
              />
              <Button disabled={isSubmitting} color="neutral-app" onClick={() => onCancel && onCancel()}>
                {t(FORM_MSG.form_cancel)}
              </Button>
              <Button disabled={isSubmitting} color="app" type="submit">
                {isSubmitting ? <FaSpinner styleName="icon" className="icon-pulse" /> : ''}
                {t(FORM_MSG.form_submit)}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default injectIntl(connect(mapStateToProps, { saveMangopayAccount, saveMangopayPayment, flash })(PotForm))

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
    defaultMessage:
      "Paiement bien effectué!\nMerci beaucoup pour cette attention 🙏🏼  Un mail de confirmation vous a été envoyé ainsi qu'aux parents de bébé.",
  },
})
