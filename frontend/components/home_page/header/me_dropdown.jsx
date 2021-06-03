import React from 'react';

class MeDropdown extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDropdown: false
    }
    this.dropdownDisplay = this.dropdownDisplay.bind(this);
    this.dropdownHide = this.dropdownHide.bind(this);
  }
  
  componentDidUpdate () {

    setTimeout(() => {
      if (this.state.showDropdown) {
        window.addEventListener('click', this.dropdownHide)
      } else {
        window.removeEventListener('click', this.dropdownHide)
      }
    }, 0)

  }

  dropdownDisplay (e) {
    e.preventDefault();
    this.setState({
      showDropdown: true
    })
  }

  dropdownHide (e) {
    e.preventDefault();
    this.setState({
      showDropdown: false
    })
  }

  render () {
    return (
      <div>
        <div id="me-dropdown-parent" onClick={this.dropdownDisplay}>
          <img src={this.props.user.profilePhotoUrl} />
          <div>
            <p>Me</p>
            <p></p>
          </div>
        </div>
        {this.state.showDropdown ? (
          <div id="me-dropdown" onClick={(e) => e.stopPropogation()}>
            <p>{this.props.user.firstName} {this.props.user.lastName}</p>
            <p>{this.props.user.breed}</p>
            <button onClick={this.props.logout}>Sign Out</button>
          </div>
        ) : ''
        }
      </div>
    )
  }
}

export default MeDropdown;
