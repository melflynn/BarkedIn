import { RECEIVE_POST, RECEIVE_POSTS, REMOVE_POST } from '../actions/post_actions';

const postReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, { [action.post.id]: action.post });
    case RECEIVE_POSTS:
      return Object.assign({}, action.posts)
    case REMOVE_POST:
      let newState = Object.assign({}, state);
      delete newState[action.post.id];
      return newState;
    default: 
      return state;
  }
}

export default postReducer;