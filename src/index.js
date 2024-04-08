import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
// import { store } from './redux/store';
import { store } from './store/store';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ScrollToTop } from './components';

import './index.css';
import App from './App';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Router>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);