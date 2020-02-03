import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../history';

import Header from '../components/header/Header';
import Welcome from '../components/welcome/Welcome';
import ImageList from '../components/image-list/ImageList';
import Image from '../components/image/Image';
import NotFound from '../components/404/NotFound';

export default function AppRouter() {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/images' component={ImageList} />
        <Route path='/images/:id' component={Image} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
