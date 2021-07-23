import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/user_actions';
import { updateModal } from '../../actions/ui_actions';
import Feed from './feed';
import { createPost, fetchNewsFeed, deletePost, updatePost } from '../../actions/post_actions';

const mapStateToProps = (state) => {
  return {
  currentUser: state.entities.users[state.session.currentUserId],
  userId: state.session.currentUserId,
  users: state.entities.users,
  modal: state.ui.modal,
  posts: state.entities.posts,
  modalPost: state.ui.post
}}

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId, userOptions) => dispatch(fetchUser(userId, userOptions)),
  fetchUsers: (userIds) => dispatch(fetchUsers(userIds)),
  updateModal: (modalName, post) => dispatch(updateModal(modalName, post)),
  createPost: (body) => dispatch(createPost(body)),
  fetchNewsFeed: (userIds) => dispatch(fetchNewsFeed(userIds)),
  deletePost: (postId) => dispatch(deletePost(postId)),
  editPost: (post) => dispatch(updatePost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);