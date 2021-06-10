import React from 'react';
import { Link } from 'react-router-dom'; 
import { findConnection } from '../../util/connection_util';

class ProfileIntro extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      accepted: 0,
      currentPageUserId: props.userId,
    }
    this.removeConnection = this.removeConnection.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this)
  }

  removeConnection(e) {
    e.preventDefault();
    findConnection(this.props.currentUser.id, this.props.user.id)
      .then((connection) => {
        this.props.deleteConnection(connection.id);
        this.props.fetchUser(this.props.currentUser.id)
          .then(() => {
            this.addAccept(-1);
            this.setState({
              status: "not connected"
            })
          });
      })
  }

  makeRequest(e) {
    e.preventDefault();
    this.props.requestConnection(this.props.currentUser.id, this.props.user.id)
      .then(() => {
        this.props.fetchUser(this.props.currentUser.id)
          .then(() => this.setState({
            status: "pending"
          }))
      })
  }

  acceptRequest(e) {
    e.preventDefault();

    findConnection(this.props.currentUser.id, this.props.user.id)
      .then((connection) => {
        this.props.acceptConnection(connection.id)
          .then(() => {
            this.addAccept(1);
            this.setState({
              status: "connected"
            })
          });
      })
  }

  addAccept(num) {
    this.setState((prevState) => ({
      accepted: prevState.accepted + num
    }))
  }

  componentDidUpdate () {
    if (this.props.userId !== this.state.currentPageUserId) {
      this.setState({
        currentPageUserId: this.props.userId,
        accepted: 0
      })
    }
  }


  render () {
    console.log(`intro: `, this.props)
    const connectionCount = this.props.user.connections ? this.props.user.connections.ids.length + this.state.accepted : null;
    let interact;
    switch (this.state.status || this.props.status) {
      case "self":
        interact = '';
        break;
      case "connected":
        interact =
          <div className="connection-response">
            <p>Connected</p>
            <button className="remove-connection" onClick={this.removeConnection}>Remove Connection</button>
          </div>;
        break;
      case "requested":
        interact =
          <div className="connection-response">
            <button onClick={this.acceptRequest}>Accept</button>
            <button onClick={this.removeConnection}>Ignore</button>
          </div>;
        break;
      case "pending":
        interact =
          <p className="connection-response">Pending</p>;
        break;
      default:
        interact =
          <div className="connection-response">
            <button onClick={this.makeRequest}>Connect</button>
          </div>;
    }
    
    return <section className="intro">
      <div className="background">
        <div>
        </div>
        <div>
          {this.props.userId === this.props.currentUser.id.toString() ? <i className="fas fa-pencil-alt" onClick={() => this.props.updateModal('EditProfileIntro')}></i> : ''}
        </div>
      </div>
      <div>
        {this.props.userId === this.props.currentUser.id.toString() ?
          <img src={this.props.photo ? this.props.photo : this.props.user ? this.props.user.profilePhotoUrl || window.defaultProfPic : ''}
            id="editable-prof-pic"
            onClick={() => this.props.updateModal('ProfilePhoto')} /> :
          <img src={this.props.user.profilePhotoUrl || window.defaultProfPic} />
        }
        <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
        <h4>{this.props.user.breed ? this.props.user.breed : ''}</h4>
        <h5>{`${this.props.user.region ? `${this.props.user.region}, ` : ''} ${this.props.user.country ? this.props.user.country : ''}`}
          <p>•</p>
          <p onClick={() => this.props.updateModal('ContactInfo')}>Contact info</p>
        </h5>
        <Link to={`/users/${this.props.user.id}/connections`}><p id="connectionCount">{connectionCount === 1 ? `${connectionCount} connection` : connectionCount > 500 ? `500+ connections` : `${connectionCount} connections`}</p></Link>
    
        {interact}
    
      </div>
    </section>
  }
}


export default ProfileIntro;