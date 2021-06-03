import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from './user_sidebar/user_sidebar';

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
      <header>  
        <HeaderContainer />
      </header>
      <main className="feed-main">
        <UserSidebar user={this.props.user} />
      </main>
    </div>
  }
}

export default Feed;