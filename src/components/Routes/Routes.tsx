import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import {
  Episode,
  Featured,
  MoviesByQuery,
  MoviesByCategory,
  ShowsByCategory,
  ShowsByQuery,
  Movie,
  Show,
  Person,
  ShowSeason,
  MovieCollection,
  Persons,
} from 'components'

const Routes = () => (
  <Switch>
    <Route exact path="/featured">
      <Featured />
    </Route>
    <Route exact path="/movies">
      <MoviesByQuery />
    </Route>
    <Route exact path="/movies/:category">
      <MoviesByCategory />
    </Route>
    <Route exact path="/shows/:category">
      <ShowsByCategory />
    </Route>
    <Route path="/persons">
      <Persons />
    </Route>
    <Route exact path="/shows">
      <ShowsByQuery />
    </Route>
    <Route path="/movie/:movieId">
      <Movie />
    </Route>
    <Route exact path="/show/:showId">
      <Show />
    </Route>
    <Route path="/person/:personId">
      <Person />
    </Route>
    <Route exact path="/show/:showId/season/:seasonNumber">
      <ShowSeason />
    </Route>
    <Route path="/show/:showId/season/:seasonNumber/episode/:episodeNumber">
      <Episode />
    </Route>
    <Route path="/movies/collections/:collectionId">
      <MovieCollection />
    </Route>
    <Route>
      <Redirect to="/featured" />
    </Route>
  </Switch>
)

export default Routes
