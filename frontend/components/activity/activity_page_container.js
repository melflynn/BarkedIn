import { connect } from "react-redux";
import ActivityPage from './activity_page';
import { fetchUser } from '../../actions/user_actions';
import { fetchPosts, updatePost } from '../../actions/post_actions';
import { updateModal } from "../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  user: state.entities.users[ownProps.match.params.userId],
  userId: ownProps.match.params.userId,
  posts: state.entities.posts,
  modal: state.ui.modal,
  modalPost: state.ui.post
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId, userOptions) => dispatch(fetchUser(userId, userOptions)),
  fetchPosts: (postIds) => dispatch(fetchPosts(postIds)),
  updateModal: (modalName, post) => dispatch(updateModal(modalName, post)),
  editPost: (post) => dispatch(updatePost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);