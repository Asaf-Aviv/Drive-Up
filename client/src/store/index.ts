import { combineReducers } from 'redux';
import notificationsReducer from './notifications/reducers';
import configureStore from './configureStore';
import moviesReducer from './movies/reducers';
import showsReducer from './shows/reducers';
import personsReducer from './persons/reducers';
import searchReducer from './search/reducers';
import seasonsReducer from './seasons/reducers';

export const rootReducer = combineReducers({
  search: searchReducer,
  movies: moviesReducer,
  shows: showsReducer,
  seasons: seasonsReducer,
  persons: personsReducer,
  notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore(rootReducer);
