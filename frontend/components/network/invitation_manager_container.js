import { connect } from "react-redux"
import { fetchUsers } from "../../actions/user_actions"
import InvitationManager from './invitation_manager';

const mapStateToProps = (state) => ({
  sentRequests: state.entities.users[state.session.currentUserId].requestedConnections,
  pendingUsers: state.entities.users[state.session.currentUserId].pendingUsers,
  receievedRequests: state.entities.users[state.session.currentUserId].connectionRequests,
  usersRequestingConnection: state.entities.users[state.session.currentUserId].usersRequestingConnection
})

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (userIds) => dispatch(fetchUsers(userIds))
})

export default connect(mapStateToProps, mapDispatchToProps)(InvitationManager);