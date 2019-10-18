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
import ShowSeason from '../ShowSeason';
import MovieCollection from '../MovieCollection';

interface RouteProps {
  path: string;
  component: React.ComponentType;
  exact: boolean;
}

const routes: RouteProps[] = [
  { path: '/', component: Home, exact: true },
  { path: '/movies', component: MoviesByQuery, exact: true },
  { path: '/movies/:category', component: MoviesByCategory, exact: true },
  { path: '/movies/collection/:collectionId', component: MovieCollection, exact: false },
  { path: '/movie/:movieId', component: Movie, exact: false },
  { path: '/shows', component: ShowsByQuery, exact: true },
  { path: '/shows/:category', component: ShowsByCategory, exact: false },
  { path: '/show/:showId', component: Show, exact: true },
  { path: '/show/:showId/season/:seasonNumber', component: ShowSeason, exact: false },
  { path: '/persons', component: PersonsList, exact: false },
  { path: '/person/:personId', component: Person, exact: false },
];

const Routes: React.FC = () => {
  const renderRoute = ({ path, component: Component, exact }: RouteProps) => (
    <Route path={path} exact={exact}>
      <Component />
    </Route>
  );

  return (
    <Switch>
      {routes.map(renderRoute)}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
