import * as APIUtil from '../util/connection_util';
import { fetchUsers } from '../actions/user_actions';

export const RECEIVE_CONNECTION = 'RECEIVE_CONNECTION';
export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';

export const receiveConnection = (connection) => ({
  type: 'RECEIVE_CONNECTION',
  connection
})

export const removeConnection = (connection) => ({
  type: 'REMOVE_CONNECTION',
  connection
})

export const requestConnection = (requesterId, requesteeId) => (dispatch) => (
  APIUtil.requestConnection(requesterId, requesteeId)
    .then(
      (connection) => {
        dispatch(receiveConnection(connection));
        dispatch(fetchUsers([connection.user_id1, connection.user_id2]))
      }
    )
)

export const acceptConnection = (connectionId) => (dispatch) => (
  APIUtil.acceptConnection(connectionId)
    .then((connection) => dispatch(receiveConnection(connection)))
)

export const deleteConnection = (connectionId) => (dispatch) => (
  APIUtil.deleteConnection(connectionId)
    .then(
      (connection) => {
        dispatch(removeConnection(connection));
      
      }
    )
)