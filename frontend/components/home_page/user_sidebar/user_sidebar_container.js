import { connect } from 'react-redux';
import UserSidebar from './user_sidebar';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUserId]
})

export default connect(mapStateToProps, null)(UserSidebar);