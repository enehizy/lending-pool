import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import WalletProvider from './globalState/WalletProvider';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WalletProvider>
         <App />
       </WalletProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

