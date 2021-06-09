import React from 'react'
import HeaderContainer from '../header/header_container';

class InvitationManager extends React.Component {
  constructor (props) {
    super(props);
    this.state({
      page: "received";
    })
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState (state) {
    e.preventDefault();
    this.setState({
      page: state
    })
  }

  render () {
    return <div className="profile-page">
      <HeaderContainer photo={} />
      <div className="invitation-manager">
        <h3>Manage Invitations</h3>
        <div>
          <p onClick={(e) => this.toggleState('received')}>Received</p>
          <p onClick={(e) => this.toggleState('sent')}>Sent</p>
        </div>
        <ul>
          {this.state.page === 'received' ? 
            map(())
          :
          }
        </ul>

      </div>
    </div>
  }
}

export default InvitationManager;