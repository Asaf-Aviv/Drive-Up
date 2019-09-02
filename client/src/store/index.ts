import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationsReducer from './notifications/reducers';
import moviesReducer from './movies/reducers';
import rootSaga from './sagas/rootSaga';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default () => {
  const devMode = process.env.NODE_ENV !== 'production';

  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [sagaMiddleware, thunkMiddleware];

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

  sagaMiddleware.run(rootSaga);

  return store;
};
