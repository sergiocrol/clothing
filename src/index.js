import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Browser } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
  <Browser>
    <App />
  </Browser>,
  document.getElementById('root'));

