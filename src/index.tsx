import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { StoreProvider } from './Store';
import App from './App';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>, document.getElementById('root'));


