import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AuthProvider from './contexts/AuthProvider';
import AppRouter from './routers/AppRouter';
import UnsplashProvider from './contexts/UnsplashProvider';

ReactDOM.render(
  <AuthProvider>
    <UnsplashProvider>
      <AppRouter />
    </UnsplashProvider>
  </AuthProvider>,
  document.getElementById('root')
);
