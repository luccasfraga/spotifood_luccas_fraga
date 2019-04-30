import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getToken } from '../../services/auth';
import { SPOTIFY_AUTHORIZE_URL } from '../../services/login';

class Login extends Component {
  state = {};

  componentDidMount() {
    if (getToken()) {
      this.props.history.push({ pathname: '/playlists' });
    }
  }

  render() {
    return (
      <Fragment>
        <h1>Login</h1>
        <a href={SPOTIFY_AUTHORIZE_URL}>Logar</a>
      </Fragment>
    );
  }
}

Login.defaultProps = {};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Login);
