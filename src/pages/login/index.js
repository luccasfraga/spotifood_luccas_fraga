import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getToken } from '../../services/auth';
import { Container } from './styles';
import { SPOTIFY_AUTHORIZE_URL } from '../../services/login';
import Logo from '../../assets/imgs/logo.png';

class Login extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    if (getToken()) {
      this.props.history.push({ pathname: '/playlists' });
    }
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container>
        <nav>
          <img src={Logo} alt="logo" />
        </nav>

        <div>
          <h1>Lorem Ipsum is simply dummy text of the printing and typesetting.</h1>
          <a href={SPOTIFY_AUTHORIZE_URL} onClick={() => this.setState({ loading: true })}>
            {this.state.loading ? (
              <CircularProgress size={20} />
            ) : (
              <Fragment>Login with Spotify</Fragment>
            )}
          </a>
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
