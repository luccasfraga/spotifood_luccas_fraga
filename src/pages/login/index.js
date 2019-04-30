import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getToken } from '../../services/auth';
import { Container } from './styles';
import { SPOTIFY_AUTHORIZE_URL } from '../../services/login';
import Logo from '../../assets/imgs/logo.png';

class Login extends Component {
  state = {};

  componentDidMount() {
    if (getToken()) {
      this.props.history.push({ pathname: '/playlists' });
    }
  }

  render() {
    return (
      <Container>
        <nav>
          <img src={Logo} alt="logo" />
        </nav>

        <div>
          <h1>Lorem Ipsum is simply dummy text of the printing and typesetting.</h1>
          <a href={SPOTIFY_AUTHORIZE_URL}>Login with Spotify</a>
        </div>
      </Container>
    );
  }
}

Login.defaultProps = {};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Login);
