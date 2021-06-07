

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  connections: state.entities.users[ownProps.match.params.userId].connections,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUsers = (ids) => dispatch(fetchUsers(ids))
})