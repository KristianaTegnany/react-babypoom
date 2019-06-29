import React, { Component } from 'react'
import Alert from 'reactstrap/lib/Alert'
import useToggle from '../../hooks/toggle'

export default props => {
  const alert = useToggle(true)

  return (
    <Alert isOpen={alert.visible} toggle={alert.hide} {...props}>
      {props.children}
    </Alert>
  )
}
