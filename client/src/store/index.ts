import { combineReducers } from 'redux';
import notificationsReducer from './notifications/reducers';
import configureStore from './configureStore';
import moviesReducer from './movies/reducers';
import showsReducer from './shows/reducers';
import personsReducer from './persons/reducers';
import moviesByIdsReducer from './moviesByIds/reducers';
import showsByIdsReducer from './showsByIds/reducers';
import personsByIdsReducer from './personsByIds/reducers';

export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  movies: moviesReducer,
  moviesByIds: moviesByIdsReducer,
  shows: showsReducer,
  showsByIds: showsByIdsReducer,
  persons: personsReducer,
  personsByIds: personsByIdsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore(rootReducer);
