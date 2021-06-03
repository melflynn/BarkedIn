import React from 'react';
import { Redirect } from 'react-router';
import HeaderContainer from '../header/header_container';
import Modal from '../modal/modal';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: undefined,
      redirect: false,
    }
  }

  updateUser () {
    this.props.fetchUser(this.props.userId)
      .then(
        (response) => this.setState({
          user: response.user
        }),
        () => this.setState({
          redirect: true
        })
      )
  }

  componentDidUpdate () {
    if (!this.state.redirect) {
      if (!this.state.user || this.props.userId !== this.state.user.id.toString()) {
        this.updateUser();
      }
    }
  }

  componentDidMount () {
    this.updateUser();
  }

  render () {

    let modal;
    if (this.props.modal === 'ContactInfo') {
      modal = <Modal name={this.props.modal} user={this.state.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} />;
    } else if (this.props.modal === 'EditProfileIntro') {
      modal = <Modal name={this.props.modal} user={this.state.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal} updateUser={this.props.updateUser}/>;
    } else {
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
                <div></div>
                <div>
                  {this.props.userId === this.props.currentUser.id.toString() ? <i className="fas fa-pencil-alt" onClick={() => this.props.updateModal('EditProfileIntro')}></i> : ''}
                </div>
              </div>
              <div>
                <img src={this.state.user ? this.state.user.profilePhotoUrl : ''} />
                <h3>{this.state.user ? this.state.user.firstName : ''} {this.state.user ? this.state.user.lastName : ''}</h3>
                <h4>{this.state.user ? this.state.user.breed : ''}</h4>
                <h5>{this.state.user ? this.state.user.location : ''}<p>•</p><p onClick={() => this.props.updateModal('ContactInfo')}>Contact info</p></h5>
              </div>
            </section>
          </div>

        </div>
      )
    }
  }
}

export default Profile;