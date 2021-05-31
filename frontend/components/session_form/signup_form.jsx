import React from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import SignupForm2 from './signup_form_2';

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
    this.updateItem = this.updateItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  // componentDidUpdate () {
  //   if (this.props.errors.includes("Email has already been taken")) {
  //     this.setState({
  //       emailAndPassword: false,
  //       errors: {
  //         email: "Someone's already using that email"
  //       }
  //     })
  //   }
  // }

  demoLogin (e) {
    e.preventDefault();
    const user = {email: 'demodog@dogs.com', password: 'password'};
    this.props.demoLogin(user);
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
    if (!this.state.email) {
      if (!this.state.password) {
        this.setState({
          errors: {
            email: 'Please enter your email address',
            password: 'Please enter your password'
          }
        })
      } else {
        this.setState({
          errors: {
            email: 'Please enter your email address'
          }
        })
      }
    } else if (!this.state.password) {
      this.setState({
        errors: {
          password: 'Please enter your password'
        }
      })
    } else if (this.state.password.length < 6) {
      this.setState({
        errors: {
          password: 'Password must be 6 characters or more'
        }
      })
    } else if (!this.state.emailAndPassword) {
      this.setState({
          emailAndPassword: true,
          errors: {}
      })
    } else {
        const user = {
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName
        };
        console.log(user);
        this.props.formAction(user);
    }
    
  }

  render() {
    console.log(this.state);
    let firstInput;
    let secondInput;
    let button;
    let demo;
    if (!this.state.emailAndPassword) {
      firstInput = 'email';
      secondInput = 'password';
      button = "Agree & Join";
      demo = <button onClick={this.demoLogin}>Demo User</button>
      this.state.firstInput = this.state.email;
      this.state.secondInput = this.state.secondInput;
      this.state.errors.firstInput = this.state.errors.email;
      this.state.errors.secondInput = this.state.errors.password;
    } else {
      firstInput = 'firstName';
      secondInput = 'lastName';
      button = 'continue';
      this.state.firstInput = this.state.firstName;
      this.state.secondInput = this.state.lastName;
    }

    return (
      <div>
        <div className="feed-page"></div>
        <div className="signup-page">
          <header className="top-form-text">
            <img src="#" alt="in-logo" />
            <h2>Make the most of your p<i className="fas fa-paw" style={{ 'fontSize': '20px' }}></i>wfessional life</h2>
          </header>
          <form>
            <label>{firstInput === 'email' ? 'Email' : 'First Name'}
                <input type="text" className={this.state.errors.firstInput ? 'login-input-errors' : ''} value={this.state.firstInput} onChange={this.updateItem(firstInput)} />
            </label>
            {this.state.errors.firstInput ? <p className="login-errors">{this.state.errors.firstInput}</p> : ''}
            <label>{secondInput === 'password' ? "Password (6 or more characters)" : "Last Name"}
                <input type={secondInput === "password" ? "password" : "text"} className={this.state.errors.secondInput ? 'login-input-errors' : ''} value={this.state.secondInput} onChange={this.updateItem(secondInput)} />
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