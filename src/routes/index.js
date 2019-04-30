import React, { Component } from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import Login from '../pages/login';
import Playlists from '../pages/playlists';

const PrivateRoute = ({ component: Components, location, ...rest }) => {
  const queryParams = qs.parse(location.hash);
  const accessToken = queryParams['#access_token'];

  if (accessToken) {
    localStorage.setItem('token', accessToken);
  }

  return (
    <Route
      {...rest}
      render={props => (isAuthenticated() ? (
        <Components {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ))
      }
    />
  );
};

class Routes extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/playlists" component={Playlists} />
          <Route path="*" component={() => <h1>Page 404</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

PrivateRoute.defaultProps = {
  location: null,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

Routes.defaultProps = {};

Routes.propTypes = {};

export default Routes;
