import * as APIUtil from '../util/post_util';

export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS'

export const receivePost = (post) => ({
  type: 'RECEIVE_POST',
  post
})

export const receivePostErrors = (errors) => ({
  type: 'RECEIVE_POST_ERRORS',
  errors
})

export const createPost = (body) => (dispatch) => (
  APIUtil.createPost(body)
    .then(
      (post) => dispatch(receivePost(post)),
      (errors) => dispatch(receivePostErrors(errors.responseJSON))
    )
)