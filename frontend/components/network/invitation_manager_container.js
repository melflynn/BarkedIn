import { connect } from "react-redux"
import { acceptConnection, deleteConnection } from "../../actions/connection_actions";
import { fetchUsers } from "../../actions/user_actions"
import InvitationManager from './invitation_manager';

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  sentRequests: state.entities.users[state.session.currentUserId].requestedConnections,
  pendingUsers: state.entities.users[state.session.currentUserId].pendingUsers,
  receievedRequests: state.entities.users[state.session.currentUserId].connectionRequests,
  usersRequestingConnection: state.entities.users[state.session.currentUserId].usersRequestingConnection
})

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (userIds) => dispatch(fetchUsers(userIds)),
  deleteConnection: (connectionId) => dispatch(deleteConnection(connectionId)),
  acceptConnection: (connectionId) => dispatch(acceptConnection(connectionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(InvitationManager);