import React from 'react';
import EditPostDropdown from './edit_post_dropdown';
import MeDropdown from './me_dropdown';

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


    let { name, ...otherProps } = this.props;
    let dropdown;
    switch (this.props.name) {
      case 'MeDropdown':
        dropdown =  <MeDropdown 
          dropdownDisplay={this.dropdownDisplay}
          dropdownHide={this.dropdownHide}
          showDropdown={this.state.showDropdown}
          {...otherProps}
        />
        break;
      case 'EditPost':
        dropdown = <EditPostDropdown
          dropdownDisplay={this.dropdownDisplay}
          dropdownHide={this.dropdownHide}
          showDropdown={this.state.showDropdown}
          {...otherProps}
        />
        break;
      default: 
        dropdown = '';
    }

    return <div>{dropdown}</div>
  }
}

export default Dropdown;