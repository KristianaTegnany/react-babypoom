import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import required from 'redux-form-validators/lib/presence';
import email from 'redux-form-validators/lib/email';

import CloudinaryUploader from '../../components/cloudinary-uploader/Component';

import BpoomImg from '../../components/bpoom-img/Component';

import { saveMsg } from '../app/Actions';
import { flash } from '../../components/flash/Actions';

// Components
import Form from 'reactstrap/lib/Form';
import Button from 'reactstrap/lib/Button';

// i18n
import t from '../../i18n/i18n';
import FORM_MSG from '../../i18n/messages/form';

// Lib
import { InputField } from '../../../lib/redux-form-input';
import { extractParams } from '../../../lib/params';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';



// TODO: deleteFlash when going back to view (cancel or message saved)
@connect(mapStateToProps, { saveMsg, flash })
@reduxForm({ form: 'visitorBookForm' })
@CSSModules(styles, { allowMultiple: true })

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: '',
      uploading: false
    };
  }

  componentDidMount() {
    this.firstField.focus();
  }

  onUploadStart() {
    this.setState({ uploading: true });
  }

  onUploadEnd(data) {
    let url = data.secure_url;
    this.setState({
      uploading: false,
      imgSrc: url.replace('/upload', '/upload/a_auto,w_263,h_300,c_fill,g_faces'),
    });
    this.props.change('photo', url.replace(/^.*?\/upload\/(.*?$)/, "$1"));
  }

  onUploadError() {
    this.setState({ uploading: false });
    this.props.flash('danger', FORM_MSG.form_upload_error);
  }

  onCancel() {
    this.props.onCancel && this.props.onCancel();
  }

  onSubmit(values) {
    return this.props.saveMsg(this.props.bpoom, extractParams(values, { name: 'bp_visitorbook_msg' }))
      .then(dispatch => {
        this.props.onSave && this.props.onSave();
        this.props.flash('info', MSG.form_thanks);
      });
  }

  render() {
    let state = this.state;
    let props = this.props;

    return (
      <div styleName="visitorbook-form">
        <Form onSubmit={props.handleSubmit(::this.onSubmit)} noValidate>

          <Field name="name"
            getRef={input => this.firstField = input}
            label={t(FORM_MSG.form_name)}
            component={InputField}
            validate={[required({ msg: t(FORM_MSG.form_name_required) })]} />

          <Field name="email"
            type="email"
            label={(<span>{t(FORM_MSG.form_email)} <small>{t(FORM_MSG.form_email_desc)}</small></span>)}
            component={InputField}
            validate={[email({ allowBlank: true, msg: t(FORM_MSG.form_email_invalid) })]} />

          <Field name="message"
            type="textarea"
            label={t(FORM_MSG.form_message)}
            component={InputField}
            maxLength="500"
            validate={[required({ msg: t(FORM_MSG.form_message_required) })]} />

          <div styleName="upload-img">
            <BpoomImg imgSrc={state.imgSrc} />
            <div styleName="upload-desc">
              <div>
                {t(FORM_MSG.form_import)}
                <br /><small>{t(FORM_MSG.form_import_formats)}</small>
              </div>
              <CloudinaryUploader cloudName="babypoom" uploadPreset="tdjjz08e"
                onUploadStart={::this.onUploadStart} onUploadEnd={::this.onUploadEnd} onUploadError={::this.onUploadError}
                btnColor="neutral-app" btnText="Importer une image" />
              <Field name="photo" component="input" type="hidden" />
            </div>
          </div>
          <div styleName="actions">
            <Button color="neutral-app" onClick={::this.onCancel}>{t(FORM_MSG.form_cancel)}</Button>
            <Button disabled={props.submitting || state.uploading} color="app" type="submit">{t(FORM_MSG.form_submit)}</Button>
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
  form_thanks: {
    id: 'visitorbook.form.thanks',
    defaultMessage: "Merci pour ton petit message =)"
  }
});


