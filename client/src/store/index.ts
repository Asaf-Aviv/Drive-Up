import { combineReducers } from 'redux';
import notificationsReducer from './notifications/reducers';
import configureStore from './configureStore';
import moviesReducer from './movies/reducers';
import showsReducer from './shows/reducers';

export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  movies: moviesReducer,
  shows: showsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore(rootReducer);
