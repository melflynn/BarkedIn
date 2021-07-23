import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from '../home_page/user_sidebar';
import PostItem from '../posts/post_item';
import CreaterSidebar from '../ads/creater_sidebar';
import { fetchPosts } from '../../util/post_util';
import Modal from '../modal/modal';

class ActivityPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
    this.updatedPost = this.updatedPost.bind(this);
  }

  updatedPost () {
    this.setState({
      updatedPost: true
    })
  }

  componentDidUpdate () {
    if (this.state.updatedPost) {
      this.setState({
        updatedPost: false
      })
      this.props.fetchPosts(this.props.user.posts.ids);
    }
  }

  componentDidMount() {
    if (!this.props.user || !this.props.user.posts) {
      this.props.fetchUser(this.props.userId, {posts: true})
        .then((user) => {
          this.props.fetchPosts(user.user.posts.ids);
        })
    } else {
      this.props.fetchPosts(this.props.user.posts.ids)
    }

  }

  render () {
    let modal;
    switch (this.props.modal) {
      case 'EditPost':
        modal = <Modal 
          name={this.props.modal}
          user={this.props.currentUser}
          updateModal={this.props.updateModal}
          editPost={this.props.editPost}
          post={this.props.modalPost}
          updatedPost={this.updatedPost}
        />
        break;
      case 'DeletePost':
        modal = <Modal 
          name={this.props.modal}
          post={this.props.modalPost}
          deletePost={this.props.deletePost}
          updateModal={this.props.updateModal}
          updatedPost={this.updatedPost}
        />
        break;
      default:
        modal = '';

    }

    if (this.props.user && Object.keys(this.props.posts).length !== 0) {
      console.log(this.props.posts)
      return <div> 
        {modal}
        <HeaderContainer photo={this.props.currentUser.profilePhotoUrl} />
        <div className="feed-page">
          <main className="feed-main">
            <UserSidebar user={this.props.user} />
            <div className="activity-feed">
              <header>
                <h3>{`${this.props.user.firstName}'s Activity`}</h3>
                <p>Posts</p>
              </header>
              <ul>
                {Object.keys(this.props.posts).length > 0 ? Object.values(this.props.posts).map((post, i) => {
                  return <PostItem 
                    key={i} 
                    user={this.props.user} 
                    currentUser={this.props.currentUser}
                    post={post} 
                    updateModal={this.props.updateModal}
                  />
                }) :
                <li className="post-item">
                    <p>{"No posts yet :("}</p>
                </li>}
              </ul>
            </div>
            <CreaterSidebar />
          </main>
        </div>
      </div>
    } else {
      return null;
    }
  }
}

export default ActivityPage;
