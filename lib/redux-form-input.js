import React from 'react'
import { FormattedMessage } from 'react-intl'

import FormGroup from 'reactstrap/lib/FormGroup'
import Label from 'reactstrap/lib/Label'
import Input from 'reactstrap/lib/Input'
import FormText from 'reactstrap/lib/FormText'
import FormFeedback from 'reactstrap/lib/FormFeedback'

export function InputField({ field, form: { touched, errors }, hint, normalize, label, type, ...props }) {
  let feedback = touched[field.name] && errors[field.name]
  let htmlId = sanitizeId(props.id || field.name)

  return (
    <FormGroup>
      <Label className="form-control-label" for={htmlId}>
        {label}
      </Label>
      <Input type={type || 'text'} id={htmlId} invalid={!!feedback} autoComplete="off" {...field} {...props} />
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

export function SelectField({
  field,
  form: { touched, errors },
  hint,
  normalize,
  label,
  options,
  i18n,
  includeBlank,
  ...props
}) {
  let feedback = touched[field.name] && errors[field.name]
  let htmlId = sanitizeId(props.id || field.name)

  return (
    <FormGroup>
      <Label className="form-control-label" for={htmlId}>
        {label}
      </Label>
      <Input type="select" id={htmlId} invalid={!!feedback} autoComplete="off" {...field} {...props}>
        {includeBlank ? (
          <option key={0} value="">
            {'string' === typeof includeBlank ? includeBlank : ''}
          </option>
        ) : (
          ''
        )}
        {(options || []).map((opt, index) => {
          if (!Array.isArray(opt)) {
            opt = [opt, opt]
          } else if (opt.length < 2) {
            opt = [opt[0], opt[0]]
          }
          return i18n && 'false' !== i18n ? (
            <FormattedMessage key={index + 1} {...opt[0]}>
              {message => <option value={opt[1]}>{message}</option>}
            </FormattedMessage>
          ) : (
            <option key={index + 1} value={opt[1]}>
              {opt[0]}
            </option>
          )
        })}
      </Input>
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

export function CheckField({ field, form: { touched, errors }, hint, normalize, label, type, ...props }) {
  let feedback = touched[field.name] && errors[field.name]
  let htmlId = sanitizeId(props.id || field.name)

  return (
    <FormGroup>
      <Label check className="form-control-label" for={htmlId}>
        <Input type={type} id={htmlId} invalid={!!feedback} autoComplete="off" {...field} {...props} />
        {` `}
        {label}
      </Label>
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

// private
const REG_SANITIZE_1 = /[^a-z_]+/g
const REG_SANITIZE_2 = /^_|_$/g
function sanitizeId(s) {
  return s.replace(REG_SANITIZE_1, '_').replace(REG_SANITIZE_2, '')
}
