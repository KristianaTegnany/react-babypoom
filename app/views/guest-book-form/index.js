import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { defineMessages, injectIntl } from 'react-intl'
import { Formik, Form, Field } from 'formik'
import ReactGA from 'react-ga'
import required from 'redux-form-validators/lib/presence'
import email from 'redux-form-validators/lib/email'
import useScrollToTop from '../../hooks/scroll-top'
import BpoomImg from '../../components/bpoom-img'
import { saveMsg } from '../app/Actions'
import { flash } from '../../components/flash/Actions'
import config from '../../../config'
import Button from 'reactstrap/lib/Button'
import Progress from 'reactstrap/lib/Progress'
import MSUploader from '../../components/uploader'
import t from '../../i18n/i18n'
import FORM_MSG from '../../i18n/messages/form'
import { InputField, CheckField } from '../../../lib/redux-form-input'
import { extractParams } from '../../../lib/params'
import Ahoy from '../../../lib/ahoy-custom'
import imgPath from '../../../lib/img-path'
import Tracking from '../../../lib/tracking'
import getPhoto from '../../../lib/get-photo'
import api from '../../api'
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import styles from './styles.scss'
import { Prompt } from 'react-router'

// TODO: deleteFlash when going back to view (cancel or message saved)

const DEFAULT_PHOTO = imgPath('/avatars/selfie.svg' + config.avatarBackgroundQuerystring)

let GuestBookForm = ({ bpoom, btnColor, flash, api, saveMsg, onSave, onCancel, intl, msg }) => {
  const [imgSrc, setImgSrc] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [photoConfirmation, setPhotoConfirmation] = useState(false)
  const [uploadWithoutPhoto, setUploadWithoutPhoto] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    if (msg){
      setImgSrc(getPhoto(msg.photo_urls, 'thumbnail') || DEFAULT_PHOTO)
    }
    const className = document.body.className
    document.body.className = 'no-bars'
    return () => (document.body.className = className)
  }, [])

  const scrollElt = useScrollToTop()

  const onUploadBtnClick = (setFieldValue) => {
    Tracking.track("GuestbookForm_UploadPhoto_Click", {bpoom_id: bpoom.id})
    let uuid = bpoom.uuid
    new MSUploader({
      uploader: {
        url: config.s3UploadUrl,
        getSignature: (success) => api({ path: `/aws/s3_signature/bpooms/${uuid}`, success }),
        onStart: () => setUploading(true),
        onProgress: (p) => setProgress(Math.floor(p)),
        onDone: (xhr) => {
          setProgress(null)
          setUploading(false)
          const url = decodeURIComponent(xhr.responseXML.getElementsByTagName('Location')[0].innerHTML)
          setImgSrc(
            `${url
              .replace(`${config.s3UploadUrl}/uploads`, config.s3CloudFrontUrl)
              .replace('/original/', '/thumbnail/')}.jpg`,
          )
          setFieldValue('photo', url.replace(`${config.s3UploadUrl}/`, ''))
          Tracking.track("GuestbookForm_UploadPhoto_Success", {bpoom_id: bpoom.id})
        },
        onError: (e) => {
          setUploading(false)
          flash('danger', FORM_MSG.form_upload_error)
        },
      },
      cropper: {
        ratio: { v: 1, h: 1 },
        minWidth: 280,
        resizeToWidth: 1000,
        webpIfSupported: true,
      },
      googlePhotos: config.googleClientID ? { oAuthClientID: config.googleClientID } : null,
    })
  }

  const onSubmit = (values, actions) => {
    // Tracking
    let visitorId = Ahoy.getVisitorId()
    if (visitorId) values.uuid = visitorId
    if (!imgSrc && !uploadWithoutPhoto)
    {
      setPhotoConfirmation(true)
      return actions.setSubmitting(false)
    }
    return saveMsg(bpoom.uuid, extractParams(values))
      .then(() => {
        if (window.localStorage) {
          delete window.localStorage.babypoomFriendName
          delete window.localStorage.babypoomFriendNameTS
          delete window.localStorage.babypoomFriendEmail
          delete window.localStorage.babypoomFriendEmailTS
          delete window.localStorage.babypoomGuestBookMessage
          delete window.localStorage.babypoomGuestBookMessageTS
          if (bpoom.shared_by_visits && values.email != bpoom.email){
            window.localStorage.friendName = values.name
            window.localStorage.showGiftOffer = true
          }
        }
        actions.setSubmitting(false)
        onSave && onSave()
        flash('info', MSG.form_thanks)
        ReactGA.ga('send', 'guestbook-message')
        Tracking.track("Guestbook_Form_Success", {bpoom_id: bpoom.id})
      })
      .catch(() => actions.setSubmitting(false))
  }

  function submitWithoutPhoto(){
    setUploadWithoutPhoto(true)
    handleSubmit()
    setPhotoConfirmation(false)
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const saveFriendName = (event) => {
    if (window.localStorage) {
      window.localStorage.babypoomFriendName = event.target.value
      window.localStorage.babypoomFriendNameTS = new Date().getTime()
    }
  }

  const saveFriendEmail = (event) => {
    if (window.localStorage) {
      window.localStorage.babypoomFriendEmail = event.target.value
      window.localStorage.babypoomFriendEmailTS = new Date().getTime()
    }
  }

  const saveMessage = (event) => {
    if (window.localStorage) {
      window.localStorage.babypoomGuestBookMessage = event.target.value
      window.localStorage.babypoomGuestBookMessageTS = new Date().getTime()
    }
  }

  const initialValues = msg || {
    name: '',
    email: '',
    message: '',
    photo: '',
  }
  if (window.localStorage && window.localStorage.babypoomFriendNameTS) {
    if (new Date().getTime() - window.localStorage.babypoomFriendNameTS < 24 * 60 * 60 * 1000) {
      initialValues.name = window.localStorage.babypoomFriendName
    }
  }
  if (window.localStorage && window.localStorage.babypoomFriendEmailTS) {
    if (new Date().getTime() - window.localStorage.babypoomFriendEmailTS < 24 * 60 * 60 * 1000) {
      initialValues.email = window.localStorage.babypoomFriendEmail
    }
  }
  if (window.localStorage && window.localStorage.babypoomGuestBookMessageTS) {
    if (new Date().getTime() - window.localStorage.babypoomGuestBookMessageTS < 24 * 60 * 60 * 1000) {
      initialValues.message = window.localStorage.babypoomGuestBookMessage
    }
  }

  return (
    <div ref={scrollElt} styleName="styles.guest-book-form">
      <Formik onSubmit={onSubmit} ref={formRef} enableReinitialize={true} initialValues={initialValues}>
        {({ isSubmitting, setFieldValue, handleChange }) => (
          <Form noValidate>
            <Field
              name="name"
              label={t(FORM_MSG.form_name)}
              onChange={(e) => {
                handleChange(e)
                saveFriendName(e)
              }}
              component={InputField}
              autoFocus={true}
              validate={required({ msg: t(FORM_MSG.form_name_required) })}
            />
            <Field
              name="email"
              type="email"
              onChange={(e) => {
                handleChange(e)
                saveFriendEmail(e)
              }}
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
              onChange={(e) => {
                handleChange(e)
                saveMessage(e)
              }}
              label={t(FORM_MSG.form_message)}
              component={InputField}
              maxLength="500"
              validate={required({ msg: t(FORM_MSG.form_message_required) })}
            />
            <Field name="private" type="checkbox" label={t(FORM_MSG.form_private)} component={CheckField} />
            <Field name="id" component="input" type="hidden" />
            <div styleName="styles.upload-img">
              <BpoomImg imgSrc={imgSrc || DEFAULT_PHOTO} />
              <div styleName="styles.upload-desc">
                <div styleName="styles.incentive">{t(MSG.photo_incentive)}</div>
                <Button color={btnColor || 'secondary'} onClick={() => onUploadBtnClick(setFieldValue)}>
                  {t(FORM_MSG.form_import)}
                </Button>
                {null == progress ? (
                  <div>
                    <small>{t(FORM_MSG.form_import_formats)}</small>
                  </div>
                ) : (
                  <Progress styleName="styles.progress" value={progress}>
                    {progress}%
                  </Progress>
                )}
                <Field name="photo" component="input" type="hidden" />
              </div>
            </div>
            <div styleName="styles.actions">
              <Prompt
                when={isSubmitting}
                message={() => {
                  return !imgSrc
                    ? `Es-tu sûr de vouloir continuer sans photo :/ ?`
                    : true
                }}
              />
              <Button color="neutral-app" onClick={() => onCancel && onCancel()}>
                {t(FORM_MSG.form_cancel)}
              </Button>
              <Button disabled={isSubmitting || uploading} color="app" type="submit">
                {t(FORM_MSG.form_submit)}
              </Button>
            </div>
            <SweetAlert
              show={photoConfirmation}
              title="Une photo ?"
              confirmButtonText="Je valide sans photo"
              cancelButtonText="J'ajoute une photo"
              imageUrl={getPhoto(bpoom.photo_urls, 'thumbnail')}
              showCancelButton
              success
              showLoaderOnConfirm
              text={intl.formatMessage(MSG.photo_incentive_question)}
              onConfirm={() => submitWithoutPhoto()}
              onCancel={() => setPhotoConfirmation(false)}
            />
          </Form>
        )}

      </Formik>

    </div>
  )
}

export default injectIntl(connect(mapStateToProps, { api, saveMsg, flash })(GuestBookForm))

function mapStateToProps(state) {
  const {
    app: { bpoom },
    mediaQueries: { desktop },
  } = state
  return { bpoom, desktop }
}

const MSG = defineMessages({
  form_thanks: {
    id: 'guest_book.form.thanks',
    defaultMessage: 'Merci beaucoup pour ton petit message 💕 ',
  },
  photo_incentive: {
    id: 'guest_book.form.photo_incentive',
    defaultMessage: 'L’ajout d’une photo fait 5 fois plus plaisir à bébé :)',
  },
  photo_incentive_question: {
    id: 'guest_book.form.photo_incentive_question',
    defaultMessage: 'Une petite photo pour illustrer ton joli message me ferait vraiment plaisir ! Es-tu sûr de vouloir continuer sans photo ?',
  },
})
