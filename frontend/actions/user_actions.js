import * as APIUtil from '../util/user_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUser = (user) => ({
  type: 'RECEIVE_USER',
  user
});

export const receiveErrors = (errors) => ({
  type: 'RECEIVE_USER_ERRORS',
  errors
})

export const receiveUsers = (users) => ({
  type: 'RECEIVE_USERS',
  users
})

export const fetchUser = (userId) => (dispatch) => (
  APIUtil.fetchUser(userId)
    .then(
      ((user) => dispatch(receiveUser(user))),
      ((errors) => dispatch(receiveErrors(errors.responseJSON)))
    )
)

export const updateUser = (user) => (dispatch) => (
  APIUtil.updateUser(user)
    .then(
      ((user) => dispatch(receiveUser(user))),
      ((errors) => dispatch(receiveErrors(errors.responseJSON)))
    )
)

export const fetchUsers = (userIds) => (dispatch) => (
  APIUtil.fetchUsers(userIds)
    .then(
      ((users) => dispatch(receiveUsers(users))),
      ((errors) => dispatch(receiveErrors(errors.responseJSON)))
    )
)