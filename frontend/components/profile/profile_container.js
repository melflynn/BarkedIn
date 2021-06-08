import { connect } from "react-redux";
import { updateModal } from "../../actions/ui_actions";
import { fetchUser, updateUser } from "../../actions/user_actions";
import Profile from './profile';
import { acceptConnection, deleteConnection, requestConnection } from "../../actions/connection_actions";


const mapStateToProps = (state, ownProps) => {
  return {
    userId: ownProps.match.params.userId,
    user: state.entities.users[ownProps.match.params.userId],
    currentUser: state.entities.users[state.session.currentUserId],
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId, userOptions) => dispatch(fetchUser(userId, userOptions)),
  updateUser: (user) => dispatch(updateUser(user)),
  updateModal: (modalName) => dispatch(updateModal(modalName)),
  deleteConnection: (connectionId) => dispatch(deleteConnection(connectionId)),
  acceptConnection: (connectionId) => dispatch(acceptConnection(connectionId)),
  requestConnection: (requesterId, requesteeId) => dispatch(requestConnection(requesterId, requesteeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);