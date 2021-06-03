import React from 'react';
import HeaderContainer from '../header/header_container';
import ContactInfoModal from '../modal/contact_info_modal';

class Profile extends React.Component {

  componentDidMount () {
    this.props.fetchUser(this.props.userId);
  }

  render () {
    return (
      <div className="profile-page">
        {this.props.modal ? <ContactInfoModal user={this.props.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal}/> : ''}
        <HeaderContainer />
        <div className="profile">
          <section>
            <div className="background">
              <div></div>
              <div></div>
            </div>
            <div>
              <img src={this.props.user ? this.props.user.profilePhotoUrl : ""} />
              <h3>{this.props.user ? this.props.user.firstName : ""} {this.props.user ? this.props.user.lastName : ""}</h3>
              <h4>{this.props.user ? this.props.user.breed : ""}</h4>
              <h5>{this.props.user ? this.props.user.location : ""}<p>•</p><p onClick={this.props.updateModal}>Contact info</p></h5>
            </div>
          </section>
        </div>

      </div>
    )
  }
}

export default Profile;