import React from 'react'
import HeaderContainer from '../header/header_container';
import ConnectionItem from './connection_item';

class InvitationManager extends React.Component {
  constructor (props) {
    super(props);
    this.state = ({
   
    })
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState (state) {
    this.setState((prevState) => ({
      page: state,
      prevPage: prevState.page
    }))
  }

  componentDidMount () {
    this.props.fetchUsers(this.props.usersRequestingConnection.ids)
      .then((users) => this.setState({
        usersRequestingConnection: Object.values(users.users)
      }))
    this.props.fetchUsers(this.props.pendingUsers.ids)
      .then((users) => this.setState({
        pendingUsers: Object.values(users.users)
      }))
  }

  componentDidUpdate () {
    if (this.state.page === 'received' && this.state.prevPage !== this.state.page) {
      this.props.fetchUser(this.props.currentUser.id)
        .then(() => this.props.fetchUsers(this.props.usersRequestingConnection.ids)
          .then((users) => this.setState((prevState) => ({
            usersRequestingConnection: Object.values(users.users),
            prevPage: prevState.page
          })))
        )
    } else if (this.state.page === 'sent' && this.state.prevPage !== this.state.page) {
      this.props.fetchUser(this.props.currentUser.id)
        .then(() => this.props.fetchUsers(this.props.pendingUsers.ids)
          .then((users) => this.setState((prevState) => ({
            pendingUsers: Object.values(users.users),
            prevPage: prevState.page
          })))
        )
    }
  }

  render () {
    if (this.state.usersRequestingConnection) {
      return <div>
        <HeaderContainer photo={this.props.currentUser.profilePhotoUrl} />
        <div className="profile-page">
          <div className="invitation-manager">
            <h3 id="manage-invitations-header">Manage Invitations</h3>
            <div className={"invitation-manager-headers"}>
              <p className={!this.state.page || this.state.page === 'received' ? 'selected' : ''} onClick={() => this.toggleState('received')}>Received</p>
              <p className={this.state.page === 'sent' ? 'selected' : ''} onClick={() => this.toggleState('sent')}>Sent</p>
            </div>
            <ul>
              {!this.state.page || this.state.page === 'received'? 
                this.state.usersRequestingConnection.length === 0 ?
                  <li className="empty-connection-item">No current invitations</li> :
                this.state.usersRequestingConnection.map((user, i) => {
                  return <ConnectionItem 
                    key={i}
                    type="invitation"
                    user={user}
                    currentUser={this.props.currentUser}
                    deleteConnection={this.props.deleteConnection}
                    acceptConnection={this.props.acceptConnection}
                  />
                })
              : this.state.page === 'sent' ?
                this.state.pendingUsers.length === 0 ?
                    <li className="empty-connection-item">No sent invitations </li> :
                this.state.pendingUsers.map((user, i) => {
                  return <ConnectionItem 
                    key={i}
                    type="sentRequest"
                    user={user}
                    currentUser={this.props.currentUser}
                    deleteConnection={this.props.deleteConnection}
                  />
                }) :
              ''
              }
            </ul>

          </div>
        </div>
      </div>
    } else {
      return null;
    }
  }
}

export default InvitationManager;