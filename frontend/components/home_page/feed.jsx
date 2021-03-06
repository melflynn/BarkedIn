import React from 'react';
import HeaderContainer from '../header/header_container';
import UserSidebar from './user_sidebar';
import NewPost from './new_post';
import Modal from '../modal/modal';
import PostItem from '../posts/post_item';
import CreatorSidebar from '../ads/creator_sidebar';
import { NavLink } from 'react-router-dom';
import { sortPosts } from '../../util/post_util';

class Feed extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      newsFeed: []
    }
    this.updatedPost = this.updatedPost.bind(this);
  }

  updatedPost () {
    this.setState({
      updatedPost: true
    })
  }

  componentDidMount () {
    const mountFunction = (user) => {
      this.props.fetchNewsFeed(user.connectedUsers.ids.concat(this.props.currentUser.id))
      this.props.fetchUsers(user.connectedUsers.ids)
    }

    if (!this.props.currentUser) {
      this.props.fetchUser(this.props.userId)
        .then((user) => mountFunction(user))
    } else {
      mountFunction(this.props.currentUser)
    }

  }

  componentDidUpdate () {
    if (this.props.posts && this.state.newsFeed.length != Object.values(this.props.posts).length) {
      this.setState(() => {
        let posts = sortPosts(Object.values(this.props.posts)).slice();

        return {
        newsFeed: posts
      }})
      
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

    // let posts = sortPosts(Object.values(this.props.posts))

    let postList = <ul>
               {this.state.newsFeed.length > 0 ? this.state.newsFeed.map((post, i) => {
                    return <PostItem 
                      key={i} 
                      user={this.props.users[`${post.authorId}`]}
                      currentUser={this.props.currentUser}
                      post={post} 
                      updateModal={this.props.updateModal}
                      fetchPost={this.props.fetchPost}
                    /> 
                }) :
                <li className="post-item">
                    <p>{"No posts yet :("}</p>
                </li>}
              </ul>

    return <div>
        {modal}
        <HeaderContainer photo={this.props.currentUser.profilePhotoUrl}/>
        <div className="feed-page">
          <main className="feed-main">
            <UserSidebar user={this.props.currentUser} />
            <div className="activity-feed">
              <NewPost user={this.props.currentUser} modal={this.props.modal} updateModal={this.props.updateModal}/>
              {/* <ul>
               {this.state.newsFeed.length > 0 ? this.state.newsFeed.map((post, i) => {
                    return <PostItem 
                      key={i} 
                      user={this.props.users[`${post.authorId}`]}
                      currentUser={this.props.currentUser}
                      post={post} 
                      updateModal={this.props.updateModal}
                    /> 
                }) :
                <li className="post-item">
                    <p>{"No posts yet :("}</p>
                </li>}
              </ul> */}
              {postList}
            </div>
            <CreatorSidebar />
          </main>
        </div>
      </div>
  }
}

export default Feed;