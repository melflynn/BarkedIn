import React from 'react';
import { Redirect } from 'react-router';
import HeaderContainer from '../header/header_container';
import Modal from '../modal/modal';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      photo: null,
      hiddenText: false,
      redirect: false,
    }
    this.updatePhoto = this.updatePhoto.bind(this);
    this.seeMore = this.seeMore.bind(this);
  }

  updatePhoto (photoUrl) {
    this.setState({
      photo: photoUrl
    })
  }

  seeMore (e) {
    e.preventDefault();
    this.setState({
      hiddenText: 'clicked'
    });
    $('.about').css('max-height', 'none');
  }

  seeLess () {
    this.setState({
      hiddenText: true
    })
    $('.about').css('max-height', '140px');
  }

  componentDidUpdate () {
    if (!this.state.redirect) {
      if (!this.props.user || this.props.userId !== this.props.user.id.toString()) {
        this.props.fetchUser(this.props.userId)
          .then(
            null,
            () => this.setState({
            redirect: true
          }))
      }
      if (this.props.user && !this.state.hiddenText && this.props.user.aboutMe && this.props.user.aboutMe.length > 316) {
        this.seeLess();
      }
    }
  }

  componentDidMount () {
    this.props.fetchUser(this.props.userId)
      .then(
        () => {if (this.props.user.aboutMe && this.props.user.aboutMe.length > 316) {
          this.seeLess() }},
        () => this.setState({
        redirect: true
      }))
    
  }

  render () {
    console.log(this.props);
    let modal;
    switch (this.props.modal) {
      case 'ContactInfo':
        modal = <Modal name={this.props.modal} user={this.props.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} />;
        break;
      case 'EditProfileIntro':
        modal = <Modal name={this.props.modal} user={this.props.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} updateUser={this.props.updateUser} />;
        break;
      case 'ProfilePhoto':
        modal = <Modal name={this.props.modal} user={this.props.user} updateModal={this.props.updateModal} updatePhoto={this.updatePhoto} />;
        break;
      case 'EditAboutMe':
        modal = <Modal name={this.props.modal} user={this.props.user} updateModal={this.props.updateModal} updateUser={this.props.updateUser} />;
        break;
      default:
        modal = '';
    }

    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="profile-page">
          {modal}
          <HeaderContainer />
          <div className="profile">
            <section className="intro">
              <div className="background">
                <div>
                  {this.props.userId === this.props.currentUser.id.toString() ? <i className="fas fa-camera"></i> : ''}
                </div>
                <div>
                  {this.props.userId === this.props.currentUser.id.toString() ? <i className="fas fa-pencil-alt" onClick={() => this.props.updateModal('EditProfileIntro')}></i> : ''}
                </div>
              </div>
              <div>
                {this.props.userId === this.props.currentUser.id.toString() ? 
                  <img src={this.state.photo ? this.state.photo : this.props.user ? this.props.user.profilePhotoUrl || window.defaultProfPic : ''} id="editable-prof-pic" onClick={() => this.props.updateModal('ProfilePhoto')} /> :
                  <img src={this.props.user ? this.props.user.profilePhotoUrl || window.defaultProfPic: ''}/>
                }
                <h3>{this.props.user ? this.props.user.firstName : ''} {this.props.user ? this.props.user.lastName : ''}</h3>
                <h4>{this.props.user ? this.props.user.breed : ''}</h4>
                <h5>{this.props.user ? `${this.props.user.region ? `${this.props.user.region}, ` : ''} ${this.props.user.country ? this.props.user.country : ''}` : ''}<p>•</p><p onClick={() => this.props.updateModal('ContactInfo')}>Contact info</p></h5>
              </div>
            </section>
            <section className="about">
              <div>
                <h3>About</h3>
                {this.props.userId === this.props.currentUser.id.toString() ? <i className="fas fa-pencil-alt" onClick={() => this.props.updateModal('EditAboutMe')}></i> : ''}
              </div>
              <div className="blurb">
                <p>{this.props.user ? this.props.user.aboutMe : ''}</p>
                {this.state.hiddenText && this.state.hiddenText !== 'clicked' ? <span>...<a onClick={this.seeMore}>see more</a></span> : ''}
              </div>
            </section>
          </div>

        </div>
      )
    }
  }
}

export default Profile;