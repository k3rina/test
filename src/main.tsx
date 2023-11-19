import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';

import './styles/index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>
);
