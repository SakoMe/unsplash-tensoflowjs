import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AuthProvider from './contexts/AuthProvider';
import AppRouter from './routers/AppRouter';

ReactDOM.render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>,
  document.getElementById('root')
);
