import * as APIUtil from '../util/user_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

export const receiveUser = (user) => ({
  type: 'RECEIVE_USER',
  user
});

export const receiveErrors = (errors) => ({
  type: 'RECEIVE_USER_ERRORS',
  errors
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