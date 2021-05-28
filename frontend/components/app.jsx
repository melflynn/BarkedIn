import React from "react";
import HomePage from './home_page/home_page';
import { Route } from 'react-router-dom';
import { LogoutAuthRoute, LoginAuthRoute } from '../util/auth_util';
import LoginContainer from './session_form/login_container';
import SignupContainer from './session_form/signup_container';
import FeedContainer from './home_page/feed_container';

const App = () => (
  <div>
    <LogoutAuthRoute exact path="/" component={HomePage} />
    <LoginAuthRoute path="/feed" component={FeedContainer} />
    <LogoutAuthRoute path="/login" component={LoginContainer} />
    <LogoutAuthRoute path="/signup" component={SignupContainer} />
  </div>
);

export default App;