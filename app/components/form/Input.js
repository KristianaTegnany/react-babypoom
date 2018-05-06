import React, { Component } from 'react'

import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import FormText from 'reactstrap/lib/FormText';
import FormFeedback from 'reactstrap/lib/FormFeedback';


export default function({ hint, input, label, type, meta: { touched, error, warning }, ...inputProps }) {
  let feedback = touched && (error || warning);
  let status   = touched ? (error ? 'danger' : warning ? 'warning' : '') : '';

  inputProps = {...input, ...inputProps};
  return (
    <FormGroup color={status}>
      <Label className="form-control-label" for={input.id}>{label}</Label>
      <Input type={type || 'text'} autoComplete="off" state={status} {...inputProps} />
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
};