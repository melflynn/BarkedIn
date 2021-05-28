import React from "react";
import HomePage from './home_page/home_page';
import { Route } from 'react-router-dom';
import { LogoutAuthRoute } from '../util/auth_util';
import LoginContainer from './session_form/login_container';
import SignupContainer from './session_form/signup_container';

const App = () => (
  <div>
    <Route path="/" component={HomePage} />
    <LogoutAuthRoute path="/login" component={LoginContainer} />
    <LogoutAuthRoute path="/signup" component={SignupContainer} />
  </div>
);

export default App;