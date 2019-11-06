import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Movie from '../Movie';
import Show from '../Show';
import Person from '../Person';
import MoviesByCategory from '../MoviesByCategory';
import MoviesByQuery from '../MoviesByQuery';
import ShowsByCategory from '../ShowsByCategory';
import ShowsByQuery from '../ShowsByQuery';
import Home from '../Home';
import ShowSeason from '../ShowSeason';
import MovieCollection from '../MovieCollection';
import Persons from '../Persons';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/movies">
      <MoviesByQuery />
    </Route>
    <Route exact path="/movies/:category">
      <MoviesByCategory />
    </Route>
    <Route path="/movies/collection/:collectionId">
      <MovieCollection />
    </Route>
    <Route path="/movie/:movieId">
      <Movie />
    </Route>
    <Route exact path="/shows">
      <ShowsByQuery />
    </Route>
    <Route exact path="/shows/:category">
      <ShowsByCategory />
    </Route>
    <Route path="/show/:showId">
      <Show />
    </Route>
    <Route path="/show/:showId/season/:seasonNumber">
      <ShowSeason />
    </Route>
    <Route path="/persons">
      <Persons />
    </Route>
    <Route path="/person/:personId">
      <Person />
    </Route>
    <Route>
      <Redirect to="/" />
    </Route>
  </Switch>
);

export default Routes;
