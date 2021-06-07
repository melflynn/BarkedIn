import React from 'react';

class ConnectionsPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount () {
    this.props.fetchUsers(this.props.connectedUsers.ids.slice(0,10))
      .then((users => (
        this.setState({
          connectedUsers: users.users
        })))
      )
    
  }

  render () {
    console.log(this.props);
    console.log(this.state);
    return <h2>Connections Page</h2>
  }
}

export default ConnectionsPage;