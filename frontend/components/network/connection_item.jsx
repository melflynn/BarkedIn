import React from 'react';
import { Link } from 'react-router-dom';
import { findConnection } from '../../util/connection_util';

class ConnectionItem extends React.Component {
  constructor (props) {
    super(props);
    const pending = this.props.currentUser.pendingUsers.ids.includes(this.props.user.id);
    const connected = this.props.currentUser.connectedUsers.ids.includes(this.props.user.id);
    const requested = this.props.currentUser.usersRequestingConnection.ids.includes(this.props.user.id);
    this.state = {
      pending,
      connected,
      requested,
      accepted: false,
      declined: false,
      withdrawn: false
    }
    this.makeRequest = this.makeRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
    this.withdrawRequest = this.withdrawRequest.bind(this);
  }

  makeRequest (e) {
    e.preventDefault();
    this.props.requestConnection(this.props.currentUser.id, this.props.user.id)
    this.setState({
      pending: true
    })
  }

  acceptRequest (e) {
    e.preventDefault();
    findConnection(this.props.currentUser.id, this.props.user.id)
      .then((connection) => {
        this.props.acceptConnection(connection.id);
        this.setState({
          accepted: true
        })
        this.props.addAccept();
      })
  }

  declineRequest (e) {
    e.preventDefault();
    findConnection(this.props.currentUser.id, this.props.user.id)
      .then((connection) => {
        this.props.deleteConnection(connection.id);
        this.setState({
          declined: true
        });
      })
  }

  withdrawRequest (e) {
    e.preventDefault();
    findConnection(this.props.currentUser.id, this.props.user.id)
      .then((connection) => {
        this.props.deleteConnection(connection.id);
        this.setState({
          withdrawn: true
        })
      })
  }

  render () {

    let actions;
    switch (this.props.type) {
      case "connection":
        actions =
          this.state.connected || this.props.user.id === this.props.currentUser.id ? '' :
          this.state.pending ?
            <p>Pending</p> :
          this.state.requested ?
              <div className="connection-response">
                <button onClick={this.declineRequest}>Ignore</button>
                <button onClick={this.acceptRequest}>Accept</button>
              </div> :
            <button onClick={this.makeRequest}>Connect</button>;
        break;
      case "invitation":
        actions = 
          <div className="connection-response">
            <button onClick={this.declineRequest}>Ignore</button>
            <button onClick={this.acceptRequest}>Accept</button>
          </div>;
        break;
      case "sentRequest":
        actions = 
          <p className="button" onClick={this.withdrawRequest}>Withdraw</p>
    }

    return (
      <li className="connection-item">
        <img src={this.props.user.profilePhotoUrl || window.defaultProfPic} />
        
          {this.state.accepted ? 
            <div>{`${this.props.user.firstName} is now a connection`}</div>
          : this.state.declined ?
            <div>Invitation declined</div>
          : this.state.withdrawn ?
            <div>Invitation withdrawn</div>
          :
            <div> 
              <article>
                <Link to={`/users/${this.props.user.id}`}><h3>{this.props.user.firstName} {this.props.user.lastName}</h3></Link>
                <p>{this.props.user.breed ? this.props.user.breed : ''}</p>
                <p>{this.props.user.region ? `${this.props.user.region}, ` : ''} {this.props.user.country ? `${this.props.user.country}` : ''}</p>
              </article>
              {actions}
            </div>
          }
      </li>
    )
  }
}

export default ConnectionItem;