import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/user_actions';
import ConnectionsPage from './connections_page';

const mapStateToProps = (state, ownProps) => ({
  userId: ownProps.match.params.userId,
  user: state.entities.users[ownProps.match.params.userId],
  connections: state.entities.users[ownProps.match.params.userId].connections,
  connectedUsers: state.entities.users[ownProps.match.params.userId].connectedUsers,
  currentUser: state.entities.users[state.session.currentUserId]
  // ownProps
})

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (userIds) => dispatch(fetchUsers(userIds)),
  fetchUser: (userId) => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsPage);