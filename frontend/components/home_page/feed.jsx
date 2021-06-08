import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from './user_sidebar/user_sidebar';

class Feed extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchUser(this.props.userId)
  }

  render () {
    console.log(this.props)
    return <div className="feed-page">
      <header>  
        <HeaderContainer photo={this.props.user.profilePhotoUrl}/>
      </header>
      <main className="feed-main">
        <UserSidebar user={this.props.user} />
      </main>
    </div>
  }
}

export default Feed;