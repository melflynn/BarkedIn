import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin (e) {
    e.preventDefault();
    this.setState({
      email: '',
      password: '',
    });
    $('.login-errors').text("");
    $('#email').removeClass('login-input-errors');
    $('#password').removeClass('login-input-errors');
    const email = 'demodog@dogs.com'.split('');
    email.forEach((input, i) => {
      setTimeout(() => {
        let emailVal = $('#email').val();
        emailVal += input;
        $('#email').val(emailVal);
      }, 100 * i);
    })
    const password = 'password'.split('');
    password.forEach((input, i) => {
      setTimeout(() => {
        let passwordVal = $('#password').val();
        passwordVal += input;
        $('#password').val(passwordVal);
      }, 100 * i);
    })

    const user = { email: 'demodog@dogs.com', password: 'password' };
    setTimeout(() => this.props.formAction(user), 1700);
  }

  updateItem(type) {
    return (e) => {
      this.setState({
        [type]: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.formAction(user);
  }

  render () {
    return (
      <div className="signup-page">
        <header className="login-form-header">
          <img id="in-logo-login" src={ window.inLogoWhite } />
        </header>
        <form>
            <div>
              <h3 className="top-form-text">Sign in</h3>
            <h4 className="top-form-text">Stay updated on your pawfessional world</h4>
            </div>
          <label>
            <input type="text" id="email" className={`${this.props.errors.email ? ' login-input-errors' : ''}`} value={this.state.email} placeholder="Email" onChange={this.updateItem('email')} />
          </label>
          {this.props.errors.email ? <p className="login-errors">{this.props.errors.email}</p> : ''}
          <label>
            <input type="password" id="password" className={`${this.props.errors.password ? ' login-input-errors' : ''}`} value={this.state.password} placeholder="Password" onChange={this.updateItem('password')} />
          </label>
          {this.props.errors.password ? <p className="login-errors">{this.props.errors.password}</p> : ''}
          <button onClick={this.handleSubmit}>Sign In</button>
          <button id="demo-login" onClick={this.demoLogin}>Demo User</button>
        </form>
        <p>New to BarkedIn? <Link to="/signup">Join now</Link></p>
      </div>
    )
  }
}

export default LoginForm;