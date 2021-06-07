import { RECEIVE_CONNECTION, REMOVE_CONNECTION } from '../actions/connection_actions';

const connectionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CONNECTION:
      return Object.assign({}, state, { [action.connection.id]: action.connection });
    case REMOVE_CONNECTION:
      let newState = Object.assign({}, state);
      delete newState[action.connection.id];
      return newState;
    default: 
      return state;
  }
}

export default connectionsReducer;