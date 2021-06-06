import React, { Component, useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'
import { Route } from 'react-router-dom'
import config from '../../../config'
import computeThemeColors from '../../../lib/theme'
import CSSVariableApplicator from '../../components/css-var'
import BubbleSay from '../../components/bubble-say'
import MediaQueries from '../../components/media-queries'
import { Formik, Form, Field } from 'formik'
import { required, addValidator, combine } from 'redux-form-validators'
import FORM_MSG from '../../i18n/messages/form'
import { InputField, CheckField } from '../../../lib/redux-form-input'
import Button from 'reactstrap/lib/Button'
import t from '../../i18n/i18n'
import styles from './styles.scss'
import { flash } from '../../components/flash/Actions'
import imgPath from '../../../lib/img-path'
import getPhoto from '../../../lib/get-photo'

let LoginPage = ({ bpoom_pwd, desktop, msg, parents_photo, color_1, color_2 }) => {

  const [errorMessage, setErrorMessage] = useState()

  const validPwd = addValidator({
    validator: (_, value) => (value != bpoom_pwd ? FORM_MSG.login_pwd_error : void 0),
  })

  const onSubmit = (values, actions) => {
    if (bpoom_pwd === values.pwd && window.localStorage) {
      window.localStorage.pwd = values.pwd
      window.localStorage.user = values.name
      window.location.reload()
    }else{
      setErrorMessage("Ahh, désolé, il y a une petite erreur sur le mot de passe. Vérifie bien, le mot de passe que nous t'avons envoyé.")
    }
  }

  let photo = getPhoto(parents_photo, 'thumbnail')

  const initialValues = {
    name: '',
    pwd: '',
  }

      return (
        <CSSVariableApplicator data-variables={computeThemeColors(color_1, color_2)}>
          <main>
            <div styleName="styles.container">
              <div styleName="styles.wrapper">
                <BubbleSay speechDir={desktop ? 'left' : 'top'} imgSrc={photo ? photo : imgPath('/mascot/says.png')}>
                  {errorMessage ? errorMessage : msg}
                </BubbleSay>
                <div styleName="login-form">
                <Formik onSubmit={onSubmit} enableReinitialize={true} initialValues={initialValues}>
                  {({ isSubmitting, setFieldValue, handleChange }) => (
                    <Form noValidate>
                      <Field
                        name="name"
                        label={t(FORM_MSG.login_name)}
                        component={InputField}
                        autoFocus={true}
                        validate={required({ msg: t(FORM_MSG.form_name_required) })}
                      />
                      <Field
                        name="pwd"
                        label={
                          <span>
                            {t(FORM_MSG.login_pwd)} <small>{t(FORM_MSG.login_pwd_desc)}</small>
                          </span>
                        }
                        component={InputField}
                        validate={validPwd()}
                      />

                      <div styleName="actions">
                        <Button color="app" type="submit">
                          {t(FORM_MSG.form_submit)}
                        </Button>
                      </div>
                    </Form>
                )}
              </Formik>
              </div>
              </div>
            </div>
          </main>
          <MediaQueries />
        </CSSVariableApplicator>
      )
}

export default connect(mapStateToProps)(LoginPage)

function mapStateToProps(state) {
  const {
    app: { bpoom, noNav },
    mediaQueries: { desktop },
  } = state
  return { bpoom, noNav, desktop }
}

const MSG = defineMessages({
  not_found: {
    id: 'app.not_found',
    defaultMessage: "Ce lien est protégé par un mot de passe.Merci.",
  },
  disabled: {
    id: 'app.disabled',
    defaultMessage: 'Ce lien est protégé par un mot de passe.Merci de vous connecter.',
  },
})
