import React from 'react'
import HeaderContainer from '../header/header_container';
import ConnectionItem from './connection_item';

class InvitationManager extends React.Component {
  constructor (props) {
    super(props);
    this.state = ({
      page: "received"
    })
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState (state) {
    this.setState({
      page: state
    })
  }

  componentDidMount () {
    this.props.fetchUsers(this.props.usersRequestingConnection.ids)
      .then((users) => this.setState({
        usersRequestingConnection: Object.values(users.users)
      }))
  }

  render () {
    console.log(this.props);
    console.log(this.state);
    if (this.state.usersRequestingConnection) {
      return <div className="profile-page">
        <HeaderContainer photo={this.props.currentUser.profilePhotoUrl} />
        <div className="invitation-manager">
          <h3 id="manage-invitations-header">Manage Invitations</h3>
          <div className={"invitation-manager-headers"}>
            <p className={this.state.page === 'received' ? 'selected' : ''} onClick={() => this.toggleState('received')}>Received</p>
            <p className={this.state.page === 'sent' ? 'selected' : ''} onClick={() => this.toggleState('sent')}>Sent</p>
          </div>
          <ul>
            {this.state.page === 'received' ? 
              this.state.usersRequestingConnection.length === 0 ?
                <li>No current invitations</li> :
              this.props.receivedRequests.ids.map((requestId, i) => {
                return <ConnectionItem 
                  key={i}
                  requestId={requestId}
                  type="invitation"
                  user={this.state.usersRequestingConnection[i]}
                  currentUser={this.props.currentUser}
                  deleteConnection={this.props.deleteConnection}
                  acceptConnection={this.props.acceptConnection}
                />
              })
            : ''
            }
          </ul>

        </div>
      </div>
    } else {
      return null;
    }
  }
}

export default InvitationManager;