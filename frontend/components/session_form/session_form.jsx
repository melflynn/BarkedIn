import React from 'react';

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
    if (this.props.formType === "login") {
      header = (
        <header className="login-form-header">
          <img src="#" alt="in-logo" />
        </header>
      )
      submitText = "Sign In"
    } else if (this.props.formType === "signup1") {
      header = (
        <header className="signup-form-header">
          <img src="#" alt="in-logo" />
          <h2>Make the most of your professional life</h2>
        </header>
      )
      submitText = "Agree & Join"
    }

    return (
      <div>
        {header}
        <form>
          <label>Email
            <input type="text" value={this.state.email} onChange={this.updateItem('email')} />
          </label>
          <label>Password
            <input type="password" value={this.state.password} onChange={this.updateItem('password')} />
          </label>
          <button onClick={this.handleSubmit}>{submitText}</button>
        </form>
      </div>
    )
  }
}

export default SessionForm;