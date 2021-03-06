import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {},
      emailAndPassword: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin (e) {
    e.preventDefault();
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {},
      emailAndPassword: false
    });
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

    const user = {email: 'demodog@dogs.com', password: 'password'};
    setTimeout(() => this.props.demoLogin(user), 1700);
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
    if (!this.state.emailAndPassword) {
      let page1Errors = {};
      const emailAndPasswordChecks = () => {
        if (Object.keys(page1Errors).length === 0) {
        this.setState({
          emailAndPassword: true,
          errors: {}
        })
        } else {
          this.setState({
            errors: page1Errors
          })
        }
      };
      
      if (!this.state.password) {
        page1Errors['password'] = 'Please enter your password';
      } else if (this.state.password.length < 6) {
        page1Errors['password'] = 'Password must be 6 characters or more';
      }

      if (!this.state.email) {
        page1Errors['email'] = 'Please enter your email address';
        emailAndPasswordChecks();
      } else {
        this.props.validateEmail(this.state.email)
          .then(
            (user) => {
              if (user) {
                page1Errors['email'] = "Someone's already using that email";
              }
              emailAndPasswordChecks();
            },
            () => emailAndPasswordChecks()
          )
      }



    } else {
      let page2Errors = {};

      if (!this.state.firstName) {
        page2Errors['firstName'] = 'Please enter your first name.'
      }

      if (!this.state.lastName) {
        page2Errors['lastName'] = 'Please enter your last name.'
      }

      if (Object.keys(page2Errors).length === 0) {
        const user = {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        };
        this.props.formAction(user)
      } else {
        this.setState({
          errors: page2Errors
        })
      }
    }
    
  }

  render() {
    let firstInput;
    let secondInput;
    let button;
    let demo;
    if (!this.state.emailAndPassword) {
      firstInput = 'email';
      secondInput = 'password';
      button = "Join";
      demo = <button id="demo-login" onClick={this.demoLogin}>Demo User</button>
      this.state.firstInput = this.state.email;
      this.state.secondInput = this.state.password;
      this.state.errors.firstInput = this.state.errors.email;
      this.state.errors.secondInput = this.state.errors.password;
    } else {
      firstInput = 'firstName';
      secondInput = 'lastName';
      button = 'continue';
      this.state.firstInput = this.state.firstName;
      this.state.secondInput = this.state.lastName;
      this.state.errors.firstInput = this.state.errors.firstName;
      this.state.errors.secondInput = this.state.errors.lastName;
    }

    return (
      <div>
        <div className="feed-page-no-header"></div>
        <div className="signup-page">
          <header className="top-form-text" id="signup-header">
            <img id="in-logo-signup" src={window.inLogoBeige} />
            <h2>Make the most of your p<i className="fas fa-paw" style={{ 'fontSize': '20px' }}></i>wfessional life</h2>
          </header>
          <form>
            <label>{firstInput === 'email' ? 'Email' : 'First Name'}
                <input type="text" id={firstInput === 'email' ? 'email' : ''} className={this.state.errors.firstInput ? 'login-input-errors' : ''} value={this.state.firstInput} onChange={this.updateItem(firstInput)} />
            </label>
            {this.state.errors.firstInput ? <p className="login-errors">{this.state.errors.firstInput}</p> : ''}
            <label>{secondInput === 'password' ? "Password (6 or more characters)" : "Last Name"}
              <input type={secondInput === "password" ? "password" : "text"} id={secondInput === 'password' ? 'password' : ''} className={this.state.errors.secondInput ? 'login-input-errors' : ''} value={this.state.secondInput} onChange={this.updateItem(secondInput)} />
            </label>
            {this.state.errors.secondInput ? <p className="login-errors">{this.state.errors.secondInput}</p> : ''}
            <button onClick={this.handleSubmit}>{button}</button>
            {this.state.emailAndPassword ? '' : demo}
          </form>
          <p>Already on BarkedIn? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    )
  }
}

export default SignupForm;