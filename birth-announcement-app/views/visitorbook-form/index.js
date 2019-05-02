import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import { reduxForm, Field } from 'redux-form'
import ReactGA from 'react-ga'
import required from 'redux-form-validators/lib/presence'
import email from 'redux-form-validators/lib/email'

import useScrollToTop from '../../hooks/scroll-top'

import BpoomImg from '../../components/bpoom-img'

import { saveMsg } from '../app/Actions'
import { flash } from '../../components/flash/Actions'
import apiCall from '../../../api/call'
import config from '../../../config/application'

// Components
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'
import Progress from 'reactstrap/lib/Progress'

import MSUploader from '../../components/uploader'

// i18n
import t from '../../i18n/i18n'
import FORM_MSG from '../../i18n/messages/form'

// Lib
import { InputField, CheckField } from '../../../lib/redux-form-input'
import { extractParams } from '../../../lib/params'
import Ahoy from '../../../lib/ahoy-custom'

// CSS
import styles from './styles.scss'

// TODO: deleteFlash when going back to view (cancel or message saved)

let VisitorBookForm = ({
  bpoom,
  btnColor,
  desktop,
  noNav,
  flash,
  change,
  submitting,
  handleSubmit,
  saveMsg,
  onSave,
  onCancel,
}) => {
  const [imgSrc, setImgSrc] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(null)

  const scrollElt = useScrollToTop()

  const onUploadBtnClick = () => {
    let uuid = bpoom.uuid
    new MSUploader({
      uploader: {
        url: config.s3UploadUrl,
        getSignature: callback =>
          apiCall('/s3_signature', { json: true, data: { uuid } }).then(([json, response]) => callback(json)),
        onStart: () => setUploading(true),
        onProgress: p => setProgress(Math.floor(p)),
        onDone: xhr => {
          const url = decodeURIComponent(xhr.responseXML.getElementsByTagName('Location')[0].innerHTML)
          setImgSrc(
            `${url
              .replace(`${config.s3UploadUrl}/uploads`, config.s3CloudFrontUrl)
              .replace('/original/', '/thumbnail/')}.jpg`,
          )
          change('photo', url.replace(`${config.s3UploadUrl}/`, ''))
          setProgress(null)
          setUploading(false)
        },
        onError: () => {
          setUploading(false)
          flash('danger', FORM_MSG.form_upload_error)
        },
      },
      cropper: {
        ratio: { v: 1, h: 1 },
        minWidth: 480,
        resizeToWidth: 1000,
        webpIfSupported: true,
      },
      facebook: {
        appId: config.fbAppId,
        locale: 'fr_FR', // TODO
      },
      googlePhotos: config.googleClientID ? { oAuthClientID: config.googleClientID } : null,
      instagram: config.instClientID ? { clientID: config.instClientID } : null,
    })
  }

  const onSubmit = values => {
    // Tracking
    let visitorId = Ahoy.getVisitorId()
    if (visitorId) values.uuid = visitorId

    return saveMsg(bpoom.uuid, extractParams(values, { name: 'bp_visitorbook_msg' })).then(() => {
      onSave && onSave()
      flash('info', MSG.form_thanks)
      ReactGA.ga('send', 'guestbook-message')
    })
  }

  return (
    <div ref={scrollElt} styleName="visitorbook-form">
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          name="name"
          label={t(FORM_MSG.form_name)}
          component={InputField}
          autoFocus={true}
          validate={required({ msg: t(FORM_MSG.form_name_required) })}
        />
        <Field
          name="email"
          type="email"
          label={
            <span>
              {t(FORM_MSG.form_email)} <small>{t(FORM_MSG.form_email_desc)}</small>
            </span>
          }
          component={InputField}
          validate={email({ allowBlank: true, msg: t(FORM_MSG.form_email_invalid) })}
        />
        <Field
          name="message"
          type="textarea"
          label={t(FORM_MSG.form_message)}
          component={InputField}
          maxLength="500"
          validate={required({ msg: t(FORM_MSG.form_message_required) })}
        />
        <Field name="private" type="checkbox" label={t(FORM_MSG.form_private)} component={CheckField} />

        <div styleName="upload-img">
          <BpoomImg imgSrc={imgSrc} />
          <div styleName="upload-desc">
            <div>
              {t(FORM_MSG.form_import)}
              <br />
              <small>{t(FORM_MSG.form_import_formats)}</small>
            </div>
            <Button color={btnColor || 'secondary'} onClick={onUploadBtnClick}>
              {t(FORM_MSG.form_image_import)}
            </Button>
            {null != progress && (
              <Progress styleName="progress" value={progress}>
                {progress}%
              </Progress>
            )}
            <Field name="photo" component="input" type="hidden" />
          </div>
        </div>
        <div styleName="actions">
          <Button color="neutral-app" onClick={() => onCancel && onCancel()}>
            {t(FORM_MSG.form_cancel)}
          </Button>
          <Button disabled={submitting || uploading} color="app" type="submit">
            {t(FORM_MSG.form_submit)}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default reduxForm({
  form: 'visitorBookForm',
  touchOnBlur: false,
  onSubmitFail: errors => {
    let fieldName = Object.keys(errors || {})[0]
    let firstField = document.querySelector(`[name="${fieldName}"]`)
    firstField && firstField.focus()
  },
})(
  connect(
    mapStateToProps,
    { saveMsg, flash },
  )(VisitorBookForm),
)

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
