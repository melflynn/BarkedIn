import React from 'react';
import { Redirect } from 'react-router';
import HeaderContainer from '../header/header_container';
import Modal from '../modal/modal';
import { findConnection } from '../../util/connection_util';
import ProfileIntro from './profile_intro';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      photo: null,
      hiddenText: true,
      redirect: false,
      currentPageUserId: props.userId,
      aboutMeUpdated: false,
      accepted: 0
    }
    this.updatePhoto = this.updatePhoto.bind(this);
    this.seeMore = this.seeMore.bind(this);
    this.toggleAboutMe = this.toggleAboutMe.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
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

  removeConnection (e) {
    e.preventDefault();
    findConnection(this.props.currentUser.id, this.props.user.id)
      .then((connection) => {
        this.props.deleteConnection(connection.id);
        this.props.fetchUser(this.props.currentUser.id)
          .then(() => {
            this.addAccept(-1);
            this.setState({
              status: "not connected"
            })
          });
      })
  }

  makeRequest(e) {
    e.preventDefault();
    this.props.requestConnection(this.props.currentUser.id, this.props.user.id)
      .then(() => {
        this.props.fetchUser(this.props.currentUser.id)
          .then(() => this.setState({
            status: "pending"
          }))
      })
  }

  acceptRequest(e) {
    e.preventDefault();

    findConnection(this.props.currentUser.id, this.props.user.id)
      .then((connection) => {
        this.props.acceptConnection(connection.id)
          .then(() => {
            this.addAccept(1);
            this.setState({
              status: "connected"
            })
          });
      })
  }

  addAccept (num) {
    this.setState((prevState) => ({
      accepted: prevState.accepted + num
    }))
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
        this.props.fetchUser(this.props.userId)
          .then(
            () => {
              this.setState({
                currentPageUserId: this.props.userId,
                hiddenText: true,
                aboutMeUpdated: false,
                accepted: 0
              });
              $('.blurb').addClass('clipped');
              this.setConnectionStatus();
            },
            () => this.setState({
            redirect: true
          }))
      }
    }
  }

  componentDidMount () {

    
    this.props.fetchUser(this.props.userId)
      .then(() => this.props.fetchUser(this.props.currentUser.id))
      .then(
        () => this.setConnectionStatus(),
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
                accepted={this.state.accepted}
                status={this.state.status}
                removeConnection={this.removeConnection}
                acceptRequest={this.acceptRequest}
                makeRequest={this.makeRequest}
              />
              
              <section className="about">
                <div>
                  <h3>About</h3>
                  {this.props.userId === this.props.currentUser.id.toString() ? <i className="fas fa-pencil-alt" onClick={() => this.props.updateModal('EditAboutMe')}></i> : ''}
                </div>
                <div>
                  <p className="blurb clipped">{this.props.user ? this.props.user.aboutMe : ''}</p>
                  {this.state.hiddenText && ($('.blurb').prop('scrollHeight') > $('.blurb').prop('clientHeight') 
                  || this.props.user && this.props.user.aboutMe && this.props.user.aboutMe.length > 315) ? 
                  <span>...<a onClick={this.seeMore}>see more</a></span> : ''}
                </div>
              </section>
            </div>
          </div>

        </div>
      )
    }
  }
}

export default Profile;