import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';
import React from 'react';


const Root = ({store}) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
) 

export default Root;