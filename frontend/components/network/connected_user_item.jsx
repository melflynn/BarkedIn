import React from 'react';
import { Link } from 'react-router-dom';

class ConnectedUserItem extends React.Component {
  constructor (props) {
    super(props);
    const requested = this.props.currentUser.pendingUsers.ids.includes(this.props.connectedUser.id);
    const connected = this.props.currentUser.connectedUsers.ids.includes(this.props.connectedUser.id);
    this.state = {
      requested,
      connected
    }
    this.makeRequest = this.makeRequest.bind(this);
  }

  makeRequest (e) {
    e.preventDefault();
    this.props.requestConnection(this.props.currentUser.id, this.props.connectedUser.id)
    this.setState({
      requested: true
    })
  }

  render () {
    return (
      <li className="connected-user-item">
        <img src={this.props.connectedUser.profilePhotoUrl || window.defaultProfPic} />
        <div>
          <article>
            <Link to={`/users/${this.props.connectedUser.id}`}><h3>{this.props.connectedUser.firstName} {this.props.connectedUser.lastName}</h3></Link>
            <p>{this.props.connectedUser.breed ? this.props.connectedUser.breed : ''}</p>
            <p>{this.props.connectedUser.region ? `${this.props.connectedUser.region}, ` : ''} {this.props.connectedUser.country ? `${this.props.connectedUser.country}` : ''}</p>
          </article>
          {this.state.connected ? '' :
          this.state.requested ?
          <p>Pending</p> :
          <button onClick={this.makeRequest}>Connect</button>}
        </div>
      </li>
    )
  }
}

export default ConnectedUserItem;