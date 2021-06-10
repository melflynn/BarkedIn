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
  }

  componentDidMount() {
    const posts = (postIds) => {
      fetchPosts(postIds)
        .then((posts) => {
          this.setState({
            posts
          })
        })
    }

    if (!this.props.user || !this.props.user.posts) {
      this.props.fetchUser(this.props.userId, {posts: true})
        .then((user) => {
          posts(user.user.posts.ids);
        })
    } else {
      posts(this.props.user.posts.ids)
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
        />
        break;
      default:
        modal = '';

    }

    if (this.props.user && this.state.posts) {
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
