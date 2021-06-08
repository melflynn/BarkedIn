import React from 'react';
import HeaderContainer from '../header/header_container';
import { Link } from 'react-router-dom';
import ConnectionItem from './connection_item';

class MyNetworkPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      usersRequestingConnection: undefined,
      accepted: 0
    }
    this.addAccept = this.addAccept.bind(this);
  }


  componentDidMount () {
    this.props.fetchUsers(this.props.usersRequestingConnection.ids.slice(0, 3))
      .then((users) => this.setState({
        usersRequestingConnection: Object.values(users.users)
      }))
  }

  addAccept (prevState) {
    this.setState((prevState) => ({
      accepted: prevState.accepted + 1
    }))
  }

  render () {

    if (this.state.usersRequestingConnection) {
      return (
        <div className="profile-page">
          <HeaderContainer photo={this.props.user.profilePhotoUrl} />
          <div className="network-page">
            <div className="network-left">
              <h3>Manage my network</h3>
              <Link to={`/users/${this.props.user.id}/connections`}>
                <i className="fas fa-user-friends"></i>
                <div>
                  <p>Connections</p>
                  <p>{this.props.user.connections.ids.length + this.state.accepted}</p>
                </div>
              </Link>
            </div>

            <div className="network-right">
              <div className="invitations">
                <div>
                  <h3>Invitations</h3>
                  <Link to="#">Manage</Link>
                </div>
                <ul>
                  { this.props.connectionRequests.ids.length > 0 ?
                    this.props.connectionRequests.ids.map((requestId, i) => {
                      return <ConnectionItem
                        key={i} 
                        requestId={requestId}
                        type="invitation"
                        user={this.state.usersRequestingConnection[i]} 
                        currentUser={this.props.user}
                        deleteConnection={this.props.deleteConnection}
                        acceptConnection={this.props.acceptConnection}
                        fetchUser={this.props.fetchUser}
                        addAccept={this.addAccept}
                      />
                    }) :
                    <li>No current invitations</li>
                  }
                </ul>
              </div>
              <div>

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

export default MyNetworkPage;