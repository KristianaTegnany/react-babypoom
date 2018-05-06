import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import required from 'redux-form-validators/lib/presence';
import email from 'redux-form-validators/lib/email';
import length from 'redux-form-validators/lib/length';
import addValidator from 'redux-form-validators/lib/add-validator';
import date from 'redux-form-validators/lib/date';
import numericality from 'redux-form-validators/lib/numericality';

// Payment
import mangoPay from 'mangopay-cardregistration-js-kit';

import { saveMangopayAccount, saveMangopayPayment } from '../app/Actions';
import { flash } from '../../components/flash/Actions';

// Components
import Form from 'reactstrap/lib/Form';
import Button from 'reactstrap/lib/Button';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

// i18n
import t from '../../i18n/i18n';
import FORM_MSG from '../../i18n/messages/form';
import MP_MSG from '../../i18n/messages/mangopay';

// Lib
import { InputField, SelectField } from '../../../lib/redux-form-input';
import { extractParams } from '../../../lib/params';
import { visaMastercardNum, cardDate, int } from '../../../lib/normalizer';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

// Images
import poweredBy from '../../images/powered-by-mangopay.png';


const MANGOPAY_ACCOUNT_FIELDS = ['email', 'first_name', 'last_name', 'last_sumcent'];
const MANGOPAY_REGISTRATION_FIELDS = ['cardRegistrationURL', 'preregistrationData', 'accessKey', 'Id'];
const MANGOPAY_DATE_FORMAT = 'mmyy';

const visaMC = addValidator({
  defaultMessage: <FormattedMessage id="form.errors.visa_mc_len" defaultMessage="must contain 16 digits" />,
  validator: function(options, value) {
    return int(value).length === 16
  }
})

@connect(mapStateToProps, { saveMangopayAccount, saveMangopayPayment, flash })
@reduxForm({ form: 'giftCharityForm' })
@CSSModules(styles, { allowMultiple: true })
export default class extends Component {
  constructor(props) {
    super(props);

    this.inputs = {};
    this.state = {
      submitting: false
    };
  }

  componentDidMount() {
    // this.firstField.focus();
  }

  onCancel() {
    this.props.onCancel && this.props.onCancel();
  }

  onSubmit(values) {
    this.setState({ submitting: true });

    let props = this.props;

    let inputs = this.inputs;
    let dateFormat = inputs.dateFormat.value;
    let dateYmd = inputs.dateYmd.value;

    let mangopayAccountParams = extractParams(values, { name: 'mangopay_account', only: MANGOPAY_ACCOUNT_FIELDS });
    return props.saveMangopayAccount(mangopayAccountParams)
      .then((json) => {
        mangoPay.cardRegistration.baseURL  = json.cardRegistrationBaseURL;
        mangoPay.cardRegistration.clientId = json.cardRegistrationClientId;
        mangoPay.cardRegistration.init(extractParams(json, { only: MANGOPAY_REGISTRATION_FIELDS }));
        mangoPay.cardRegistration.registerCard({
            cardNumber:         int(values.card_number),
            cardExpirationDate:
              date.formatDate(date.parseDate(values.card_expiration_date, dateFormat, dateYmd), MANGOPAY_DATE_FORMAT),
            cardCvx:            int(values.card_cvx),
            cardType:           'CB_VISA_MASTERCARD'
          }, (res) => {
            props.saveMangopayPayment(props.bpoom, extractParams({
              mangopay_card_id:    res.CardId,
              mangopay_account_id: json.mpaid,
              sumcent:             json.sumcent
            }, { name: 'mangopay_payment' })).then(() => {
              props.onSave && props.onSave();
              props.flash('info', MSG.thanks);
            }).catch(() => {
              this.setState({ submitting: false });
            });
          }, (res) => {
            this.setState({ submitting: false });

            let errorKey = `error_${res.ResultCode}`;
            props.flash('danger', MP_MSG[errorKey] || MP_MSG.error_default);

            // TODO: Rollbar
            // var message = 'Erreur<br />';
            // message += 'Code: ' + res.ResultCode + ', message: ' + res.ResultMessage;
            // Rollbar.warning(message);

            // TODO: mixpanel
            // mixpanel.track("payment_error", {
            //  "error_code": res.ResultCode,
            //  "error_msg": t(MP_MSG[errorKey] || MP_MSG.error_default)
            // });
        });
      }).catch(() => {
        this.setState({ submitting: false });
      });
  }

  render() {
    let props = this.props;
    let state = this.state;
    let submitting = props.submitting || state.submitting;

    return (
      <div styleName="visitorbook-form">
        <Form onSubmit={props.handleSubmit(::this.onSubmit)} noValidate>

          <Field name="last_sumcent"
            label={t(FORM_MSG.form_last_sumcent)}
            component={SelectField}
            options={[10, 20, 30, 50, 100].map(x => [{...MSG.charity_form_amount, values: { amount: x } }, x])}
            i18n="true"
            includeBlank="--"
            validate={[required({msg: t(FORM_MSG.form_last_sumcent_required)})]}/>

          <Row>
            <Col className="pr-0">
              <Field name="first_name"
                label={t(FORM_MSG.form_first_name)}
                component={InputField}
                validate={[required()]} />
            </Col>
            <Col>
              <Field name="last_name"
                label={t(FORM_MSG.form_last_name)}
                component={InputField}
                validate={[required()]} />
            </Col>
          </Row>

          <Field name="email"
            type="email"
            label={t(FORM_MSG.form_email)}
            component={InputField}
            validate={[required({ msg: t(FORM_MSG.form_email_required) }), email({ msg: t(FORM_MSG.form_email_invalid) })]} />

          <hr />

          <Field name="card_number"
            label={<span>{t(FORM_MSG.form_card_number)} <small>{t(FORM_MSG.form_card_number_type)}</small></span>}
            component={InputField}
            placeholder="_ _ _ _    _ _ _ _    _ _ _ _    _ _ _ _"
            normalize={visaMastercardNum}
            maxLength="19"
            validate={[required(), visaMC()]} />

          <Row>
            <FormattedMessage {...FORM_MSG.form_card_expiration_date_format}>{ (format) => {
              return <FormattedMessage {...FORM_MSG.form_card_expiration_date_ymd}>{ (ymd) => {
                return (
                  <Col className="pr-0">
                    <input type="hidden" ref={input => this.inputs.dateFormat = input} value={format} />
                    <input type="hidden" ref={input => this.inputs.dateYmd = input} value={ymd} />
                    <Field name="card_expiration_date"
                      label={t(FORM_MSG.form_card_expiration_date)}
                      component={InputField}
                      placeholder={format}
                      normalize={cardDate}
                      validate={[required(), date({ format: format, ymd: ymd })]} />
                  </Col>
                )
              } }</FormattedMessage>
            } }</FormattedMessage>
            <Col>
              <Field name="card_cvx"
                label={t(FORM_MSG.form_card_cvx)}
                component={InputField}
                placeholder="_ _ _"
                normalize={int}
                maxLength="3"
                validate={[required(), length({ is: 3 }), numericality({ int: true })]} />
            </Col>
          </Row>

          <img className="img-fluid" styleName="powered-by" src={poweredBy} alt="Powered by Mangopay" />

          <div styleName="actions">
            <Button disabled={submitting} color="neutral-app" onClick={::this.onCancel}>{t(FORM_MSG.form_cancel)}</Button>
            <Button disabled={submitting} color="app" type="submit">
              {submitting ? <span className="fa fa-spinner fa-pulse mr-3"></span> : ''}
              {t(FORM_MSG.form_submit)}
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom } } = state;
  return { bpoom };
}

const MSG = defineMessages({
  charity_form_amount: {
    id: 'charity.form.amount',
    defaultMessage: "{amount, number} {amount, plural, one {Euro} other {Euros}}"
  },
  thanks: {
    id: 'charity.thanks',
    defaultMessage: "Paiement effectué.\nMerci beaucoup pour cette attention."
  }
});

