import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './store/store';
import Root from './components/root';
import {fetchUser} from './actions/user_actions';
// import {fetchUser} from './util/user_util';

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

  window.fetchUser = fetchUser;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store}/>, root);
})