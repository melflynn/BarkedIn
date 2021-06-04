import React from 'react';
import { Redirect } from 'react-router';
import HeaderContainer from '../header/header_container';
import Modal from '../modal/modal';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false,
    }
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
    }
  }

  componentDidMount () {
    this.props.fetchUser(this.props.userId)
      .then(
        null,
        () => this.setState({
        redirect: true
      }))
  }

  render () {
    let modal;
    if (this.props.modal === 'ContactInfo') {
      modal = <Modal name={this.props.modal} user={this.props.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} />;
    } else if (this.props.modal === 'EditProfileIntro') {
      modal = <Modal name={this.props.modal} user={this.props.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} updateUser={this.props.updateUser}/>;
    } else if (this.props.modal === 'ProfilePhoto') {
      modal = <Modal name={this.props.modal} user={this.props.user} updateModal={this.props.updateModal}/>
    }else {
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
            <section>
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
                  <img src={this.props.user ? this.props.user.profilePhotoUrl : ''} id="editable-prof-pic" onClick={() => this.props.updateModal('ProfilePhoto')} /> :
                  <img src={this.props.user ? this.props.user.profilePhotoUrl : ''}/>
                }
                <h3>{this.props.user ? this.props.user.firstName : ''} {this.props.user ? this.props.user.lastName : ''}</h3>
                <h4>{this.props.user ? this.props.user.breed : ''}</h4>
                <h5>{this.props.user ? `${this.props.user.region ? `${this.props.user.region}, ` : ''} ${this.props.user.country ? this.props.user.country : ''}` : ''}<p>•</p><p onClick={() => this.props.updateModal('ContactInfo')}>Contact info</p></h5>
              </div>
            </section>
          </div>

        </div>
      )
    }
  }
}

export default Profile;