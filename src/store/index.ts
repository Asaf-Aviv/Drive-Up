import { combineReducers } from 'redux'
import configureStore from './configureStore'
import searchReducer from './search/reducers'
import trendingReducer from './trending/reducers'
import showsByCategoryReducer from './showsByCategory/reducers'
import moviesByCategoryReducer from './moviesByCategory/reducers'
import showsByQueryReducer from './showsByQuery/reducers'
import moviesByQueryReducer from './moviesByQuery/reducers'
import personsByQueryReducer from './personsByQuery/reducers'
import shortMoviesReducer from './shortMoviesByIds/reducers'
import shortShowsReducer from './shortShowsByIds/reducers'
import fullMoviesReducer from './fullMoviesByIds/reducers'
import fullShowsReducer from './fullShowsByIds/reducers'
import movieReducer from './movie/reducers'
import showReducer from './show/reducers'
import personsReducer from './person/reducers'
import showSeasonsReducer from './showSeasons/reducers'
import collectionsReducer from './collections/reducers'

export const rootReducer = combineReducers({
  movie: movieReducer,
  show: showReducer,
  persons: personsReducer,
  collections: collectionsReducer,
  showSeasons: showSeasonsReducer,
  search: searchReducer,
  showsByCategory: showsByCategoryReducer,
  moviesByCategory: moviesByCategoryReducer,
  moviesByQuery: moviesByQueryReducer,
  showsByQuery: showsByQueryReducer,
  personsByQuery: personsByQueryReducer,
  trending: trendingReducer,
  fullMovies: fullMoviesReducer,
  fullShows: fullShowsReducer,
  shortMovies: shortMoviesReducer,
  shortShows: shortShowsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default configureStore(rootReducer)
