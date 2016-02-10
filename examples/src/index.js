import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import { Provider } from 'react-redux';

import configureStore from './redux';

const store = configureStore();

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
);