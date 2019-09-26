import { combineReducers } from 'redux';
import notificationsReducer from './notifications/reducers';
import configureStore from './configureStore';
import moviesReducer from './movies/reducers';
import showsReducer from './shows/reducers';
import personsReducer from './persons/reducers';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  shows: showsReducer,
  persons: personsReducer,
  notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore(rootReducer);
