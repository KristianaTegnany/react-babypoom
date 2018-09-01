import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import { reduxForm, Field } from 'redux-form'
import required from 'redux-form-validators/lib/presence'
import email from 'redux-form-validators/lib/email'

import CloudinaryUploader from '../../components/cloudinary-uploader'

import BpoomImg from '../../components/bpoom-img'

import { saveMsg } from '../app/Actions'
import { flash } from '../../components/flash/Actions'

// Components
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'

// i18n
import t from '../../i18n/i18n'
import FORM_MSG from '../../i18n/messages/form'

// Lib
import { InputField, CheckField } from '../../../lib/redux-form-input'
import { extractParams } from '../../../lib/params'
import Ahoy from '../../../lib/ahoy-custom'

// CSS
import styles from './styles.scss'

let INPUTS

function refInput(input) {
  if (!input) return
  INPUTS[input.name] = input
}

// TODO: deleteFlash when going back to view (cancel or message saved)
@connect(
  mapStateToProps,
  { saveMsg, flash },
)
@reduxForm({
  form: 'visitorBookForm',
  touchOnBlur: false,
  onSubmitFail: errors => {
    let firstField = Object.keys(errors || {})[0]
    INPUTS[firstField] && INPUTS[firstField].focus()
  },
})
export default class VisitorBookForm extends Component {
  constructor(props) {
    super(props)

    INPUTS = {}
    this.state = {
      imgSrc: '',
      uploading: false,
    }

    this.onSubmit = ::this.onSubmit
    this.onCancel = ::this.onCancel
    this.onUploadStart = ::this.onUploadStart
    this.onUploadEnd = ::this.onUploadEnd
    this.onUploadError = ::this.onUploadError
  }

  componentDidMount() {
    if (this.props.desktop) {
      INPUTS.name.focus()
    }
    this.formContainer.parentNode.scrollTop = 0
  }

  onUploadStart() {
    this.setState({ uploading: true })
  }

  onUploadEnd(data) {
    let url = data.secure_url
    this.setState({
      uploading: false,
      imgSrc: url.replace('/upload', '/upload/w_250,h_250,c_fill,g_auto'),
    })
    this.props.change('photo', url.replace(/^.*?\/upload\/(.*?$)/, '$1'))
  }

  onUploadError() {
    this.setState({ uploading: false })
    this.props.flash('danger', FORM_MSG.form_upload_error)
  }

  onCancel(e) {
    this.props.onCancel && this.props.onCancel()
  }

  onSubmit(values) {
    // Tracking
    let visitorId = Ahoy.getVisitorId()
    if (visitorId) {
      values.uuid = visitorId
    }

    return this.props.saveMsg(this.props.bpoom.uuid, extractParams(values, { name: 'bp_visitorbook_msg' })).then(() => {
      this.props.onSave && this.props.onSave()
      this.props.flash('info', MSG.form_thanks)
    })
  }

  render() {
    let state = this.state
    let props = this.props

    return (
      <div ref={elt => (this.formContainer = elt)} styleName="visitorbook-form">
        <Form onSubmit={props.handleSubmit(this.onSubmit)} noValidate>
          <Field
            name="name"
            innerRef={refInput}
            label={t(FORM_MSG.form_name)}
            component={InputField}
            validate={[required({ msg: t(FORM_MSG.form_name_required) })]}
          />

          <Field
            name="email"
            innerRef={refInput}
            type="email"
            label={
              <span>
                {t(FORM_MSG.form_email)} <small>{t(FORM_MSG.form_email_desc)}</small>
              </span>
            }
            component={InputField}
            validate={[email({ allowBlank: true, msg: t(FORM_MSG.form_email_invalid) })]}
          />

          <Field
            name="message"
            innerRef={refInput}
            type="textarea"
            label={t(FORM_MSG.form_message)}
            component={InputField}
            maxLength="500"
            validate={[required({ msg: t(FORM_MSG.form_message_required) })]}
          />

          <Field
            name="private"
            innerRef={refInput}
            type="checkbox"
            label={t(FORM_MSG.form_private)}
            component={CheckField}
          />

          <div styleName="upload-img">
            <BpoomImg imgSrc={state.imgSrc} />
            <div styleName="upload-desc">
              <div>
                {t(FORM_MSG.form_import)}
                <br />
                <small>{t(FORM_MSG.form_import_formats)}</small>
              </div>
              <CloudinaryUploader
                cloudName="babypoom"
                uploadPreset="tdjjz08e"
                onUploadStart={this.onUploadStart}
                onUploadEnd={this.onUploadEnd}
                onUploadError={this.onUploadError}
                btnColor="neutral-app"
              />
              <Field name="photo" component="input" type="hidden" />
            </div>
          </div>
          <div styleName="actions">
            <Button color="neutral-app" onClick={this.onCancel}>
              {t(FORM_MSG.form_cancel)}
            </Button>
            <Button disabled={props.submitting || state.uploading} color="app" type="submit">
              {t(FORM_MSG.form_submit)}
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    app: { bpoom },
    mediaQueries: { desktop },
  } = state
  return { bpoom, desktop }
}

const MSG = defineMessages({
  form_thanks: {
    id: 'visitorbook.form.thanks',
    defaultMessage: 'Merci pour ton petit message =)',
  },
})
