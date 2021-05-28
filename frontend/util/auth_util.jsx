import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const LogoutAuth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={props => !loggedIn ? <Component {...props} /> : <Redirect to="/feed" />} /> 
);

const mapStateToProps = (state) => {
  return { loggedIn: Boolean(state.session.currentUserId)}
};

export const LogoutAuthRoute = withRouter(connect(mapStateToProps, null)(LogoutAuth));

const LoginAuth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={props => loggedIn ? <Component {...props} /> : <Redirect to="/login" />} />
);

export const LoginAuthRoute = withRouter(connect(mapStateToProps, null)(LoginAuth));