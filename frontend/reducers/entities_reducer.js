import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import connectionsReducer from './connection_reducer';

export default combineReducers({
  users: usersReducer, 
  connections: connectionsReducer
});