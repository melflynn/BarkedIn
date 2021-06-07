import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import ConnectionsPage from './connections_page';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  connections: state.entities.users[ownProps.match.params.userId].connections,
  connectedUsers: state.entities.users[ownProps.match.params.userId].connectedUsers
  // ownProps
})

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (ids) => dispatch(fetchUsers(ids))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsPage);