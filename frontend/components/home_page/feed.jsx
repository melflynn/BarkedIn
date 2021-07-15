import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from './user_sidebar';
import NewPost from './new_post';
import Modal from '../modal/modal';
import PostItem from '../activity/posts/post_item';
import { NavLink } from 'react-router-dom';

class Feed extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const mountFunction = (user) => {
      this.props.fetchNewsFeed(user.connectedUsers.ids)
      this.props.fetchUsers(user.connectedUsers.ids)
    }

    if (!this.props.currentUser) {
      this.props.fetchUser(this.props.userId)
        .then((user) => mountFunction(user))
    } else {
      mountFunction(this.props.currentUser)
    }

  }

  render () {
    console.log(this.props)
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
               {Object.keys(this.props.posts).length > 0 ? Object.values(this.props.posts).map((post, i) => {
                  let item;
                  post.authorId in this.props.users ? 
                    item = <PostItem 
                      key={i} 
                      user={this.props.users[`${post.authorId}`]}
                      currentUser={this.props.currentUser}
                      post={post} 
                      updateModal={this.props.updateModal}
                    /> : item = null;
                    return item;
                }) :
                <li className="post-item">
                    <p>{"No posts yet :("}</p>
                </li>}
              </ul>
            </div>
          </main>
        </div>
      </div>
  }
}

export default Feed;