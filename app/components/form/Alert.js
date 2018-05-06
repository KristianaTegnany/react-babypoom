import React, { Component } from 'react';
import Alert from 'reactstrap/lib/Alert';


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    }
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert isOpen={this.state.visible} toggle={::this.onDismiss} {...this.props}>
        {this.props.children}
      </Alert>
    );
  }
}
