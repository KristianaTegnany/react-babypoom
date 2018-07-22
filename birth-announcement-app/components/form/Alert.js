import React, { Component } from 'react'
import Alert from 'reactstrap/lib/Alert'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: true,
    }

    this.onDismiss = ::this.onDismiss
  }

  onDismiss() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <Alert isOpen={this.state.visible} toggle={this.onDismiss} {...this.props}>
        {this.props.children}
      </Alert>
    )
  }
}
