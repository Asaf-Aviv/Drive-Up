import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import PersonsList from '../PersonsList';
import Movie from '../Movie';
import Show from '../Show';
import Person from '../Person';
import MoviesByCategory from '../MoviesByCategory';
import MoviesByQuery from '../MoviesByQuery';
import ShowsByCategory from '../ShowsByCategory';
import ShowsByQuery from '../ShowsByQuery';
import Home from '../Home';
import ShowSeason from '../../ShowSeason';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/movies" component={MoviesByQuery} />
    <Route path="/movies/:category" component={MoviesByCategory} />
    <Route path="/movie/:movieId" component={Movie} />
    <Route exact path="/shows" component={ShowsByQuery} />
    <Route path="/shows/:category" component={ShowsByCategory} />
    <Route exact path="/show/:showId" component={Show} />
    <Route path="/show/:showId/season/:seasonNumber" component={ShowSeason} />
    <Route path="/persons" component={PersonsList} />
    <Route path="/person/:personId" component={Person} />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
