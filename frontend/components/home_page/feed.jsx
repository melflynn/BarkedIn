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
    if (!this.props.currentUser) {
      this.props.fetchUser(this.props.userId)
    }
  }

  render () {
    let modal;
    switch (this.props.modal) {
      case 'NewPost':
        modal = <Modal 
          name={this.props.modal} 
          user={this.props.currentUser} 
          updateModal={this.props.updateModal}
          createPost={this.props.createPost}
          />
        break;
      default:
        modal = '';
    }

    return <div>
        {modal}
        <HeaderContainer photo={this.props.currentUser.profilePhotoUrl}/>
        <div className="feed-page">
          <main className="feed-main">
            <UserSidebar user={this.props.currentUser} />
            <div className="activity-feed">
              <NewPost user={this.props.currentUser} modal={this.props.modal} updateModal={this.props.updateModal}/>
              <ul>
                {/* {this.state.posts.map((post, i) => {
                  return <PostItem key={i} user={} post={post} />
                })} */}
              </ul>
            </div>
          </main>
        </div>
      </div>
  }
}

export default Feed;