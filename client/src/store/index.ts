import { combineReducers } from 'redux';
import notificationsReducer from './notifications/reducers';
import moviesReducer from './movies/reducers';
import configureStore from './configureStore';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore(rootReducer);
