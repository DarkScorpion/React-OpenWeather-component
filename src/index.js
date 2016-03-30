
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App.js'
import getStore from './store/store.js'

var store = getStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  
  document.getElementById('root')
);
