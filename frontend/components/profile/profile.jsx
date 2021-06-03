import React from 'react';
import { Redirect } from 'react-router';
import HeaderContainer from '../header/header_container';
import ContactInfoModal from '../modal/contact_info_modal';

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
      console.log(this.state);
      console.log(this.props);
      if (this.state.redirect) {
        return <Redirect to="/" />;
      } else {
        return (
          <div className="profile-page">
            {this.props.modal ? <ContactInfoModal user={this.state.user} currentUser={this.props.currentUser} updateModal={this.props.updateModal}/> : ''}
            <HeaderContainer />
            <div className="profile">
              <section>
                <div className="background">
                  <div></div>
                  <div>
                    <i className="fas fa-pencil-alt"></i>
                  </div>
                </div>
                <div>
                  <img src={this.state.user ? this.state.user.profilePhotoUrl : ''} />
                  <h3>{this.state.user ? this.state.user.firstName : ''} {this.state.user ? this.state.user.lastName : ''}</h3>
                  <h4>{this.state.user ? this.state.user.breed : ''}</h4>
                  <h5>{this.state.user ? this.state.user.location : ''}<p>•</p><p onClick={this.props.updateModal}>Contact info</p></h5>
                </div>
              </section>
            </div>
    
          </div>
        )
      }
    // } else {
    //   return null;
    // }
  }
}

export default Profile;