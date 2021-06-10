import { connect } from "react-redux";
import ActivityPage from './activity_page';
import { fetchUser } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/post_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  user: state.entities.users[ownProps.match.params.userId],
  userId: ownProps.match.params.userId,
  posts: state.entities.posts
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId, userOptions) => dispatch(fetchUser(userId, userOptions)),
  fetchPosts: (postIds) => dispatch(fetchPosts(postIds))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);