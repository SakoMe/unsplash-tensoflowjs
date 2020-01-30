import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AppRouter from './routers/AppRouter';
import UnsplashProvider from './contexts/UnsplashProvider';

ReactDOM.render(
  <UnsplashProvider>
    <AppRouter />
  </UnsplashProvider>,
  document.getElementById('root')
);
