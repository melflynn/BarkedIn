import { connect } from "react-redux"
import MyNetworkPage from './my_network_page';
import { fetchUsers, fetchUser } from '../../actions/user_actions';
import { acceptConnection, deleteConnection } from "../../actions/connection_actions";

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.currentUserId],
    connectionRequests: state.entities.users[state.session.currentUserId].connectionRequests,
    usersRequestingConnection: state.entities.users[state.session.currentUserId].usersRequestingConnection
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId, userOptions) => dispatch(fetchUser(userId, userOptions)),
  fetchUsers: (userIds) => dispatch(fetchUsers(userIds)),
  deleteConnection: (connectionId) => dispatch(deleteConnection(connectionId)),
  acceptConnection: (connectionId) => dispatch(acceptConnection(connectionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyNetworkPage);