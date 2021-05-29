import React from 'react';

class MeDropdown extends React.Component {
  constructor (props) {
    super(props);
    this.dropdownDisplay = this.dropdownDisplay.bind(this);
    this.dropdownHide = this.dropdownHide.bind(this);
  }
  
  dropdownDisplay (e) {
    e.preventDefault();
    const dropdown = document.getElementById("me-dropdown");
    dropdown.classList.add('shown');
  }

  dropdownHide (e) {
    e.preventDefault();
    const dropdown = document.getElementById("me-dropdown");
    dropdown.classList.remove('shown');
  }

  render () {
    return (
      <div>
        <div id="me-dropdown-parent" onClick={this.dropdownDisplay}>
          Me
        </div>
        <div id="me-dropdown">
          <p>{this.props.user.firstName} {this.props.user.lastName}</p>
          <p>{this.props.user.jobTitle}</p>
          <button onClick={this.props.logout}>Sign Out</button>
        </div>
      </div>
    )
  }
}

export default MeDropdown;
