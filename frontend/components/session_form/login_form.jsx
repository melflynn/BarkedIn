import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
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
      return (
        <div className="signup-page">
          <header className="login-form-header">
            <img src="#" alt="in-logo" />
          </header>
          <form>
              <div>
                <h3 className="top-form-text">Sign in</h3>
              <h4 className="top-form-text">Stay updated on your pawfessional world</h4>
              </div>
            <label className={`login-label${this.props.errors.email ? ' login-input-errors' : ''}`} value={this.state.email}>Email
              <input type="text" className="login-input" onChange={this.updateItem('email')} />
            </label>
            {this.props.errors.email ? <p className="login-errors">{this.props.errors.email}</p> : ''}
            <label className={`login-label${this.props.errors.password ? ' login-input-errors' : ''}`}>Password
              <input type="password" className="login-input" value={this.state.password} onChange={this.updateItem('password')} />
            </label>
            {this.props.errors.password ? <p className="login-errors">{this.props.errors.password}</p> : ''}
            <button onClick={this.handleSubmit}>Sign In</button>
          </form>
          <p>New to BarkedIn? <Link to="/signup">Join now</Link></p>
        </div>
      )
  }
}

export default LoginForm;