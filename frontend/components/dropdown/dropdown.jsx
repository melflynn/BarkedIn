import React from 'react';
import MeDropdown from '../header/me_dropdown';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    }
    this.dropdownDisplay = this.dropdownDisplay.bind(this);
    this.dropdownHide = this.dropdownHide.bind(this);
  }


  componentWillUnmount() {
    window.removeEventListener('click', this.dropdownHide);
  }

  componentDidUpdate() {

    setTimeout(() => {
      if (this.state.showDropdown) {
        window.addEventListener('click', this.dropdownHide)
      } else {
        window.removeEventListener('click', this.dropdownHide)
      }
    }, 0)

  }

  dropdownDisplay(e) {
    debugger;
    e.preventDefault();
    this.setState({
      showDropdown: true
    })
  }

  dropdownHide(e) {
    e.preventDefault();
    this.setState({
      showDropdown: false
    })
  }

  render() {

    debugger;

    let { name, ...otherProps } = this.props;

    switch (this.props.name) {
      case 'meDropdown':
        return <MeDropdown 
          dropdownDisplay={this.dropdownDisplay}
          dropdownHide={this.dropdownHide}
          showDropdown={this.state.showDropdown}
          {...otherProps}
        />
    }
  }
}

export default Dropdown;