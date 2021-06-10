import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from './user_sidebar';
import NewPost from './new_post';
import Modal from '../modal/modal';

class Feed extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (!this.props.user) {
      this.props.fetchUser(this.props.userId)
    }
  }

  render () {
    let modal;
    switch (this.props.modal) {
      case 'NewPost':
        modal = <Modal 
          name={this.props.modal} 
          user={this.props.user} 
          updateModal={this.props.updateModal}
          createPost={this.props.createPost}
          />
        break;
      default:
        modal = '';
    }

    return <div className="feed-page">
      {modal}
      <header>  
        <HeaderContainer photo={this.props.user.profilePhotoUrl}/>
      </header>
      <main className="feed-main">
        <UserSidebar user={this.props.user} />
        <NewPost user={this.props.user} modal={this.props.modal} updateModal={this.props.updateModal}/>
      </main>
    </div>
  }
}

export default Feed;