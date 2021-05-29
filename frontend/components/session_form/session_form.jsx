import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.updateItem = this.updateItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let header;
    let submitText;
    let redirectLogin;
    let passwordText;
    if (this.props.formType === "login") {
      header = (
        <header className="login-form-header">
          <img src="#" alt="in-logo" />
        </header>
      );
      passwordText = "Password";
      submitText = "Sign In";
      redirectLogin = (
        <p>New to BarkedIn? <Link to="/signup">Join now</Link></p>
        );
      } else if (this.props.formType === "signup1") {
        header = (
          <header className="top-form-text">
          <img src="#" alt="in-logo" />
          <h2>Make the most of your professional life</h2>
        </header>
      );
      passwordText = "Password (6 or more characters)"
      submitText = "Agree & Join";
      redirectLogin = (
        <p>Already on BarkedIn? <Link to="/login">Sign In</Link></p>
        );
      }
      
      return (
        <div className="signup-page">
        {header}
        <form>
          {this.props.formType === "login" ? (
            <div>
              <h3 className="top-form-text">Sign in</h3>
              <h4 className="top-form-text">Stay updated on your professional world</h4>
            </div>
          ) : '' }
          <label>Email
            <input type="text" className={ this.props.errors.email ? 'login-input-errors' : '' } value={this.state.email} onChange={this.updateItem('email')} />
          </label>
          {this.props.errors.email ? <p className="login-errors">{this.props.errors.email}</p> : ''}
          <label>{passwordText}
            <input type="password" className={this.props.errors.password ? 'login-input-errors' : ''} value={this.state.password} onChange={this.updateItem('password')} />
          </label>
          {this.props.errors.password ? <p className="login-errors">{this.props.errors.password}</p> : ''}
          <button onClick={this.handleSubmit}>{submitText}</button>
        </form>
        {redirectLogin}
      </div>
    )
  }
}

export default SessionForm;