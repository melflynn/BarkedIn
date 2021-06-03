import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import Profile from './profile';

const mapStateToProps = (state, ownProps) => ({
  userId: ownProps.match.params.userId,
  user: state.entities.users[ownProps.match.params.userId]
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);