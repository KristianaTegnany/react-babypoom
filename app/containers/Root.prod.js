import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import { deleteFlash } from '../components/flash/Actions'

class Root extends Component {
  onRouteUpdate() {
    this.props.deleteFlash();
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Router history={history} routes={routes} onUpdate={this.onRouteUpdate.bind(this)} />
      </div>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired
};

export default connect(null, {
  deleteFlash
})(Root)