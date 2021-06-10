import * as APIUtil from '../util/post_util';

export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS'

export const receivePost = (post) => ({
  type: 'RECEIVE_POST',
  post
})

export const receivePosts = (posts) => ({
  type: 'RECEIVE_POSTS',
  posts
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

export const fetchPosts = (postIds) => (dispatch) => (
  APIUtil.fetchPosts(postIds)
    .then(
      (posts) => dispatch(receivePosts(posts)),
      (errors) => dispatch(receivePostErrors(errors.responseJSON))
    )
)

export const fetchPost = (postId) => (dispatch) => (
  APIUtil.fetchPost(postId)
    .then(
      (post) => dispatch(receivePost(post)),
      (errors) => dispatch(receivePostErrors(errors.responseJSON))
    )
)