import React from 'react';
import { Redirect } from 'react-router';
import HeaderContainer from '../header/header_container';
import Modal from '../modal/modal';
import ProfileIntro from './profile_intro';
import ProfileAboutMe from './profile_about_me';
import ProfileActivity from './profile_activity';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      photo: null,
      hiddenText: true,
      redirect: false,
      currentPageUserId: props.userId,
      aboutMeUpdated: false,
      // accepted: 0
    }
    this.updatePhoto = this.updatePhoto.bind(this);
    this.seeMore = this.seeMore.bind(this);
    this.toggleAboutMe = this.toggleAboutMe.bind(this);
  }

  updatePhoto (photoUrl) {
    this.setState({
      photo: photoUrl
    })
  }

  seeMore (e) {
    e.preventDefault();
    this.setState({
      hiddenText: false
    });
    $('.blurb').removeClass('clipped');
  }

  toggleAboutMe () {
    this.setState({
      aboutMeUpdated: true
    })
  }

  setConnectionStatus () {
    if (this.props.userId === this.props.currentUser.id.toString()) {
      this.setState({
        status: "self"
      })
    } else if (this.props.currentUser.connectedUsers.ids.includes(this.props.user.id)) {
      this.setState({
        status: "connected"
      })
    } else if (this.props.currentUser.usersRequestingConnection.ids.includes(this.props.user.id)) {
      this.setState({
        status: "requested"
      })
    } else if (this.props.currentUser.pendingUsers.ids.includes(this.props.user.id)) {
      this.setState({
        status: "pending"
      })
    } else {
      this.setState({
        status: "not connected"
      })
    }
  }

  componentDidUpdate () {
    if (!this.state.redirect) {
      if (!this.props.user || !this.props.user.connections || this.props.userId !== this.state.currentPageUserId || this.state.aboutMeUpdated) {
        this.props.fetchUser(this.props.userId, {posts: true})
          .then(
            (user) => {
              this.props.fetchPost(user.user.posts.ids[user.user.posts.ids.length - 1])
                .then((post) => {
                  this.setState({
                    currentPageUserId: this.props.userId,
                    hiddenText: true,
                    aboutMeUpdated: false,
                    post: post.post
                  });
                  $('.blurb').addClass('clipped');
                  this.setConnectionStatus();
                })
            },
            () => this.setState({
            redirect: true
          }))
      }
    }
  }

  componentDidMount () {

    
    this.props.fetchUser(this.props.userId, {posts: true})
      .then((user) => {
          this.props.fetchPost(user.user.posts.ids[user.user.posts.ids.length - 1])
            .then((post) => this.setState({
              post: post.post
            }))
      })
      .then(() => this.props.fetchUser(this.props.currentUser.id))
      .then(
        () => this.setConnectionStatus(),
        null,
        () => this.setState({
          redirect: true
        }));   
  }

  render () {
    let modal;
    switch (this.props.modal) {
      case 'ContactInfo':
        modal = <Modal name={this.props.modal} user={this.props.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} />;
        break;
      case 'EditProfileIntro':
        modal = <Modal name={this.props.modal} user={this.props.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} updateUser={this.props.updateUser} />;
        break;
      case 'ProfilePhoto':
        modal = <Modal name={this.props.modal} user={this.props.user} photo={this.state.photo} updateModal={this.props.updateModal} updatePhoto={this.updatePhoto} />;
        break;
      case 'EditAboutMe':
        modal = <Modal name={this.props.modal} user={this.props.user} updateModal={this.props.updateModal} updateUser={this.props.updateUser} toggleAboutMe={this.toggleAboutMe}/>;
        break;
      default:
        modal = '';
    }

    

    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (!this.props.user) {
      return null;
    } else {
      return (
        <div>
          {modal}
          <HeaderContainer photo={this.state.photo ? this.state.photo : this.props.currentUser.profilePhotoUrl}/>
          <div className="profile-page">
            <div className="profile">
              <ProfileIntro 
                currentUser={this.props.currentUser}
                updateModal={this.props.updateModal}
                userId={this.props.userId}
                photo={this.state.photo}
                user={this.props.user}
                status={this.state.status}
                deleteConnection={this.props.deleteConnection}
                requestConnection={this.props.requestConnection}
                acceptConnection={this.props.acceptConnection}
                fetchUser={this.props.fetchUser}
              />

              <ProfileAboutMe 
                userId={this.props.userId}
                currentUser={this.props.currentUser}
                updateModal={this.props.updateModal}
                user={this.props.user}
                hiddenText={this.state.hiddenText}
                seeMore={this.seeMore}
              />

              <ProfileActivity 
                userId={this.props.userId}
                user={this.props.user}
                currentUser={this.props.currentUser}
                post={this.state.post}
              />
            </div>
          </div>

        </div>
      )
    }
  }
}

export default Profile;