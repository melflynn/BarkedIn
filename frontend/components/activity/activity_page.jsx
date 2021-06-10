import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from '../home_page/user_sidebar';
import PostItem from './posts/post_item';
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
      this.posts(this.props.user.posts.ids);
    }
  }

  posts = (postIds) => {
    fetchPosts(postIds)
      .then((posts) => {
        this.setState({
          posts
        })
      })
  }

  componentDidMount() {
    if (!this.props.user || !this.props.user.posts) {
      this.props.fetchUser(this.props.userId, {posts: true})
        .then((user) => {
          this.posts(user.user.posts.ids);
        })
    } else {
      this.posts(this.props.user.posts.ids)
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

    if (this.props.user && this.state.posts) {
      console.log(this.props.modal)
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
                {this.state.posts.map((post, i) => {
                  return <PostItem 
                    key={i} 
                    user={this.props.user} 
                    currentUser={this.props.currentUser}
                    post={post} 
                    updateModal={this.props.updateModal}
                  />
                })}
              </ul>
            </div>
          </main>
        </div>
      </div>
    } else {
      return null;
    }
  }
}

export default ActivityPage;
