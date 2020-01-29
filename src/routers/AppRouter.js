import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../history';

import Header from '../components/header/Header';
import Welcome from '../components/welcome/Welcome';
import ImageList from '../components/image-list/ImageList';

export default function AppRouter() {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route path='/images' component={ImageList} />
      </Switch>
    </Router>
  );
}
