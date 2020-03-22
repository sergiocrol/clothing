import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Browser } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Browser>
      <App />
    </Browser>
  </Provider>,
  document.getElementById('root'));

