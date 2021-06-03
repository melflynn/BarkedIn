import React from 'react';
import HeaderContainer from '../header/header_container';

class Profile extends React.Component {

  componentDidMount () {
    this.props.fetchUser(this.props.userId);
  }

  render () {
    return (
      <div className="profile-page">
        <HeaderContainer />
        <div className="profile">
          <section>
            <div className="background">
              <div></div>
              <div></div>
            </div>
            <div>
              <img src={this.props.user.profilePhotoUrl} />
              <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
              <h4>{this.props.user.breed}</h4>
              <p>{this.props.user.location }<p>•</p><p>Contact info</p></p>
            </div>
          </section>
        </div>

      </div>
    )
  }
}

export default Profile;