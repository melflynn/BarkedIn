import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './store/store';
import Root from './components/root';
import { fetchPosts, fetchPost } from './actions/post_actions';


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
  
  window.fetchPosts = fetchPosts;
  window.fetchPost = fetchPost;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store}/>, root);
})