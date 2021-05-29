import React from 'react';
import HeaderContainer from '../header/header_container';

class Feed extends React.Component {
  constructor (props) {
    super(props);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  hideDropdown (e) {
    e.preventDefault();
    const dropdown = document.getElementById("me-dropdown");
    dropdown.classList.remove('shown');
  }

  render () {
    return <div className="feed-page">
      <div id="hide-dropdown" onClick={this.hideDropdown}></div>
      <HeaderContainer />
    </div>
  }
}

export default Feed;