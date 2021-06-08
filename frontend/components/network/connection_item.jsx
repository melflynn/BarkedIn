import React from 'react';
import { Link } from 'react-router-dom';

class ConnectionItem extends React.Component {
  constructor (props) {
    super(props);
    const requested = this.props.currentUser.pendingUsers.ids.includes(this.props.user.id);
    const connected = this.props.currentUser.connectedUsers.ids.includes(this.props.user.id);
    this.state = {
      requested,
      connected,
      accepted: false
    }
    this.makeRequest = this.makeRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
  }

  makeRequest (e) {
    e.preventDefault();
    this.props.requestConnection(this.props.currentUser.id, this.props.user.id)
    this.setState({
      requested: true
    })
  }

  acceptRequest (e) {
    e.preventDefault();

    this.props.acceptConnection(this.props.requestId);
    // debugger;
    this.setState({
      accepted: true
    })
    // debugger;
    this.props.addAccept();
  }

  render () {

    let actions;
    switch (this.props.type) {
      case "connection":
        actions =
          this.state.connected ? '' :
          this.state.requested ?
            <p>Pending</p> :
            <button onClick={this.makeRequest}>Connect</button>;
        break;
      case "invitation":
        actions = 
          <div className="connection-response">
            <button onClick={() => this.props.deleteConnection(this.props.requestId)}>Ignore</button>
            <button onClick={this.acceptRequest}>Accept</button>
          </div>;
        break;
    }

    console.log(this.props)
    console.log(this.state)
    return (
      <li className="connection-item">
        <img src={this.props.user.profilePhotoUrl || window.defaultProfPic} />
        
          {this.state.accepted ? 
            <div>{`${this.props.user.firstName} is now a connection`}</div>
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