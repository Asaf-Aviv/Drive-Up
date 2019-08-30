import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationsReducer from './notifications/reducers';
import moviesReducer from './movies/reducers';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default () => {
  const devMode = process.env.NODE_ENV !== 'production';
  const middlewares: Middleware[] = [thunkMiddleware];

  if (devMode) {
    middlewares.push(logger);
  }

  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    devMode
      ? composeWithDevTools(middleWareEnhancer)
      : middleWareEnhancer,
  );

  return store;
};
