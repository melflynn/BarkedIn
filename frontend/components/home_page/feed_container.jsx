import { connect } from 'react-redux';
import Feed from './feed';

const mapStateToProps = (state) => ({
  user: state.entities.users[state.session.currentUserId]
})

export default connect(mapStateToProps, null)(Feed);