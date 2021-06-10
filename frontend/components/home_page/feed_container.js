import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { updateModal } from '../../actions/ui_actions';
import Feed from './feed';
import { createPost } from '../../actions/post_actions';

const mapStateToProps = (state) => {
  return {
  user: state.entities.users[state.session.currentUserId],
  userId: state.session.currentUserId,
  modal: state.ui.modal
}}

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  updateModal: (modalName) => dispatch(updateModal(modalName)),
  createPost: (body) => dispatch(createPost(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);