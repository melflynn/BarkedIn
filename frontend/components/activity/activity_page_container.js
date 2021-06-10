import { connect } from "react-redux";
import ActivityPage from './activity_page';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUserId],
  user: state.entities.users[ownProps.match.params.userId],
  userId: ownProps.match.params.userId
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId, userOptions) => dispatch(fetchUser(userId, userOptions))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);