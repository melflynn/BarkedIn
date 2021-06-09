import React from 'react';
import HeaderContainer from '../header/header_container';
import { Link, Redirect } from 'react-router-dom';
import ConnectionItem from './connection_item';


class MyNetworkPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      usersRequestingConnection: undefined,
      accepted: 0,
      redirect: false
    }
    this.addAccept = this.addAccept.bind(this);
  }


  componentDidMount () {
    this.props.fetchUsers(this.props.usersRequestingConnection.ids)
      .then((users) => this.setState({
        usersRequestingConnection: Object.values(users.users)
      }))
  }

  addAccept () {
    this.setState((prevState) => ({
      accepted: prevState.accepted + 1
    }))
  }

  render () {
    console.log(this.state.connectionRequests);
    console.log(this.state.usersRequestingConnection);
    if (this.state.redirect === 'connections') {
      return <Redirect to={`/users/${this.props.user.id}/connections`}/>
    } else if (this.state.redirect === 'manage') {
      return <Redirect to="/mynetwork/invitation-manager" />
    } else if (this.state.usersRequestingConnection) {
      return (
        <div>
          <HeaderContainer photo={this.props.user.profilePhotoUrl} />
          <div className="profile-page">
            <div className="network-page">
              <div className="network-left">
                <h3>Manage my network</h3>
                <a onClick={() => {this.props.fetchUser(this.props.user.id).then(() => this.setState({redirect: 'connections'}))}}>
                  <i className="fas fa-user-friends"></i>
                  <div>
                    <p>Connections</p>
                    <p>{this.props.user.connections.ids.length + this.state.accepted}</p>
                  </div>
                </a>
              </div>

              <div className="network-right">
                <div className="invitations">
                  <div>
                    <h3>Invitations</h3>
                    <a className="manage" onClick={() => { this.props.fetchUser(this.props.user.id).then(() => this.setState({ redirect: 'manage' })) }}>
                      Manage
                    </a>
                  </div>
                  <ul>
                    { this.props.connectionRequests.ids.length > 0 ?
                      this.state.usersRequestingConnection.map((user, i) => {
                        return <ConnectionItem
                          key={i} 
                          type="invitation"
                          user={user} 
                          currentUser={this.props.user}
                          deleteConnection={this.props.deleteConnection}
                          acceptConnection={this.props.acceptConnection}
                          addAccept={this.addAccept}
                        />
                      }) :
                      <li className="empty-connection-item">No current invitations</li>
                    }
                  </ul>
                </div>
                <div>

                </div>
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