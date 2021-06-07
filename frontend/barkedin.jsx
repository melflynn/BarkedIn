import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './store/store';
import Root from './components/root';
import { requestConnection, acceptConnection, deleteConnection } from './actions/connection_actions';


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        }
      },
      session: {
        "currentUserId": window.currentUser.id
      }
    }

    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.requestConnection = requestConnection;
  window.acceptConnection = acceptConnection;
  window.deleteConnection = deleteConnection;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store}/>, root);
})