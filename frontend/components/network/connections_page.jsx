import React from 'react';
import HeaderContainer from '../header/header_container';
import ConnectionItem from './connection_item';

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

    if (!this.props.user || !this.props.user.connectedUsers) {
      this.props.fetchUser(this.props.userId, {connectedUsers: true, pendingUsers: true})
        .then((user) => {
          const userIds = user.user.connectedUsers.ids.filter((val) => val !== this.props.currentUser.id).slice(0,10);
          mountFunction(userIds)
        })
    } else {
      const userIds = this.props.connectedUsers.ids.filter((val) => val !== this.props.currentUser.id).slice(0, 10);
      mountFunction(userIds);
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

            {this.props.currentUser.id === this.props.user.id ? `Your connections` : `${this.props.user.firstName}'s connections`}
            
            {this.state.connectedUsers.length > 0 ? 
              <div className="connections">
                <ul>
                  {this.state.connectedUsers.map((user, i) => {
                    return <ConnectionItem 
                      key={i} 
                      type="connection"
                      user={user} 
                      currentUser={this.props.currentUser}
                      requestConnection={this.props.requestConnection}/>
                  })}
                </ul>
              </div> :
              <div>
                You don't have any connections yet 
              </div>}
        </div>
      )
    } else {
      return null;
    }
  }
}

export default ConnectionsPage;