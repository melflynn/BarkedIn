import React from 'react';
import HeaderContainer from '../header/header_container';

class Profile extends React.Component {

  componentDidMount () {
    this.props.fetchUser(this.props.userId);
  }

  render () {
    return (
      <div className="profile">
        <HeaderContainer />
        <section>
          <div className="background">
            <div></div>
            <div></div>
          </div>
          <div>
            <img src={this.props.user.profilePhotoUrl} />
            <p>{this.props.user.firstName} {this.props.user.lastName}</p>
            <p>{this.props.user.breed}</p>
          </div>
        </section>
      </div>
    )
  }
}

export default Profile;