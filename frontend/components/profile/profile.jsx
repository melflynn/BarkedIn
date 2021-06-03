import React from 'react';
import HeaderContainer from '../header/header_container';
import ContactInfoModal from '../modal/contact_info_modal';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modal: false
    }
    this.displayModal = this.displayModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount () {
    this.props.fetchUser(this.props.userId);
  }

  

  displayModal (e) {
    e.preventDefault();
    this.setState({
      modal: true
    })
  }

  hideModal (e) {
    e.preventDefault();
    this.setState({
      modal: false
    })
  }

  render () {
    return (
      <div className="profile-page">
        {this.state.modal ? <ContactInfoModal user={this.props.user} currentUser={this.props.currentUser}/> : ''}
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
              <h5>{this.props.user.location }<p>•</p><p onClick={this.displayModal}>Contact info</p></h5>
            </div>
          </section>
        </div>

      </div>
    )
  }
}

export default Profile;