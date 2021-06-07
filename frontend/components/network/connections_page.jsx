import React from 'react';
import HeaderContainer from '../header/header_container';
import ConnectedUserItem from './connected_user_item';

class ConnectionsPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount () {

    const mountFunction = (connectedUserIds) => {
      this.props.fetchUsers(connectedUserIds)
        .then((users => (
          this.setState({
            connectedUsers: Object.values(users.users)
          })))
        )
    }

    if (!this.props.user) {
      this.props.fetchUser(this.props.userId)
        .then((user) => mountFunction(user.connectedUsers.ids.slice(0,10)))
    } else {
      mountFunction(this.props.connectedUsers.ids.slice(0, 10));
    } 
  }

  render () {
    console.log(this.props);
    if (this.state.connectedUsers) {
      console.log(Object.values(this.state.connectedUsers));
    }

    if (this.state.connectedUsers) {
      return (
        <div className="profile-page">
            <HeaderContainer photo={this.props.currentUser.profilePhotoUrl} />
            <div className="connections">
              <ul>
                {this.state.connectedUsers.map((connectedUser, i) => {
                  return <ConnectedUserItem key={i} connectedUser={connectedUser}/>
                })}
              </ul>
            </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default ConnectionsPage;