import React from 'react';
import HeaderContainer from '../header/header_container';
import ConnectionItem from './connection_item';

class ConnectionsPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPageUserId: props.userId
    }
  }

  componentDidUpdate () {
    if (this.props.user.id !== this.state.currentPageUserId) {
      this.componentDidMount();
      this.setState({
        currentPageUserId: this.props.user.id
      })
    }
  }

  componentDidMount () {

    const mountFunction = (connectedUserIds, currentUser) => {
      this.props.fetchUsers(connectedUserIds)
        .then((users) => {
          if (currentUser) {
            let connectedUsers = Object.values(users.users)
            connectedUsers.push(this.props.currentUser)
            this.setState({
              connectedUsers
            })
          } else {
            this.setState({
              connectedUsers: Object.values(users.users)
            })
          }
      })
    }

    if (!this.props.user || !this.props.user.connectedUsers) {
      this.props.fetchUser(this.props.userId, {connectedUsers: true, pendingUsers: true})
        .then((user) => {
          const currentUser = (user.user.connectedUsers.ids.includes(this.props.currentUser.id)) ? true : false;
          const userIds = user.user.connectedUsers.ids.filter((val) => val !== this.props.currentUser.id).slice(0, 10);
          mountFunction(userIds, currentUser);
        })
    } else {
      const currentUser = (this.props.user.connectedUsers.ids.includes(this.props.currentUser.id)) ? true : false;
      const userIds = this.props.user.connectedUsers.ids.filter((val) => val !== this.props.currentUser.id).slice(0, 10);
      mountFunction(userIds, currentUser);
    } 
  }

  render () {
    if (this.state.connectedUsers) {
      return (
          <div>
            <HeaderContainer photo={this.props.currentUser.profilePhotoUrl} />
            <div className="profile-page">
              <div className="connections-page">
                <div className="connections">
                  <div className="connections-header">
                    {this.props.currentUser.id === this.props.user.id ? `Your connections` : `${this.props.user.firstName}'s connections`}
                  </div>
                  {this.state.connectedUsers.length > 0 ? 
                    <ul>
                      {this.state.connectedUsers.map((user, i) => {
                        return <ConnectionItem 
                          key={i} 
                          type="connection"
                          user={user} 
                          currentUser={this.props.currentUser}
                          requestConnection={this.props.requestConnection}
                          fetchUser={this.props.fetchUser}
                        />
                      })}
                    </ul>
                    :
                    <div>
                      You don't have any connections yet 
                    </div>}
                </div>
              </div>
            </div>
          </div>
      )
    } else {
      return null;
    }
  }
}

export default ConnectionsPage;