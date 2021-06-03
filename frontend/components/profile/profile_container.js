import { connect } from "react-redux";
import { updateModal } from "../../actions/ui_actions";
import { fetchUser, updateUser } from "../../actions/user_actions";
import Profile from './profile';

const mapStateToProps = (state, ownProps) => ({
  userId: ownProps.match.params.userId,
  user: state.entities.users[ownProps.match.params.userId],
  currentUser: state.entities.users[state.session.currentUserId],
  modal: state.ui.modal
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  updateUser: (user) => dispatch(updateUser(user)),
  updateModal: (modalName) => dispatch(updateModal(modalName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);