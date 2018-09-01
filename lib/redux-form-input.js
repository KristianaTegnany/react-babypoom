import React from 'react'
import { FormattedMessage } from 'react-intl'

import FormGroup from 'reactstrap/lib/FormGroup'
import Label from 'reactstrap/lib/Label'
import Input from 'reactstrap/lib/Input'
import FormText from 'reactstrap/lib/FormText'
import FormFeedback from 'reactstrap/lib/FormFeedback'

export function InputField({ hint, input, label, type, meta: { touched, error } = {}, ...inputProps }) {
  inputProps = { ...input, ...inputProps }
  let feedback = touched && error
  let htmlId = sanitizeId(inputProps.id || inputProps.name)

  return (
    <FormGroup>
      <Label className="form-control-label" for={htmlId}>
        {label}
      </Label>
      <Input type={type || 'text'} id={htmlId} invalid={!!feedback} autoComplete="off" {...inputProps} />
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

export function SelectField({
  hint,
  input,
  label,
  options,
  i18n,
  includeBlank,
  meta: { touched, error } = {},
  ...inputProps
}) {
  inputProps = { ...input, ...inputProps }
  let feedback = touched && error
  let htmlId = sanitizeId(inputProps.id || inputProps.name)

  return (
    <FormGroup>
      <Label className="form-control-label" for={htmlId}>
        {label}
      </Label>
      <Input type="select" id={htmlId} invalid={!!feedback} autoComplete="off" {...inputProps}>
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

export function CheckField({ hint, input, label, type, meta: { touched, error } = {}, ...inputProps }) {
  inputProps = { ...input, ...inputProps }
  let feedback = touched && error
  let htmlId = sanitizeId(inputProps.id || inputProps.name)

  return (
    <FormGroup>
      <Label check className="form-control-label" for={htmlId}>
        <Input type={type} id={htmlId} invalid={!!feedback} autoComplete="off" {...inputProps} />
        {` `}
        {label}
      </Label>
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

// private
function sanitizeId(s) {
  return s.replace(/[^a-z_]+/g, '_').replace(/^_|_$/g, '')
}
