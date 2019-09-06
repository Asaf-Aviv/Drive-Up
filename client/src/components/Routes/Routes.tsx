import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import MovieShowcaseList from '../MovieShowcaseList';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={MovieShowcaseList} />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
