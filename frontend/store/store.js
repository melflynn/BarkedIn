import { createStore, applyMiddleware } from "redux";
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let myMiddlewares;
if (process.env.NODE_ENV === "production") {
  myMiddlewares = thunk;
} else {
  myMiddlewares = [thunk, logger];
}

export const configureStore = (preloadedState = {}) => (
  createStore(rootReducer, preloadedState, applyMiddleware(...myMiddlewares))
);