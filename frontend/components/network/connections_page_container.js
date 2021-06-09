import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/user_actions';
import { requestConnection } from '../../actions/connection_actions';
import ConnectionsPage from './connections_page';

const mapStateToProps = (state, ownProps) => {
  // let connections;
  // let connectedUsers;
  // if (state.entities.users[ownProps.match.params.userId]) {
  //   connections = state.entities.users[ownProps.match.params.userId].connections;
  //   connectedUsers = state.entities.users[ownProps.match.params.userId].connectedUsers;
  // }
  return {
  userId: ownProps.match.params.userId,
  user: state.entities.users[ownProps.match.params.userId],
  currentUser: state.entities.users[state.session.currentUserId],
  // connections,
  // connectedUsers
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (userIds) => dispatch(fetchUsers(userIds)),
  fetchUser: (userId, userOptions) => dispatch(fetchUser(userId, userOptions)),
  requestConnection: (requesterId, requesteeId) => dispatch(requestConnection(requesterId, requesteeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsPage);