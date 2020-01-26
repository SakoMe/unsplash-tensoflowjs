import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import App from '../components/App';
import Header from '../components/header/Header';
import Welcome from '../components/welcome/Welcome';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Welcome} />
      </Switch>
    </BrowserRouter>
  );
}
