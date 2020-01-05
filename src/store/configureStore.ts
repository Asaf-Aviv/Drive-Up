import {
  createStore,
  applyMiddleware,
  Middleware,
  Reducer,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas/rootSaga'

const configureStore = (rootReducer: Reducer, preloadedState = {}) => {
  const DEV_MODE = process.env.NODE_ENV !== 'production'

  const sagaMiddleware = createSagaMiddleware()
  const middlewares: Middleware[] = [sagaMiddleware]
  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(
    rootReducer,
    preloadedState,
    DEV_MODE
      ? composeWithDevTools(middleWareEnhancer)
      : middleWareEnhancer,
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
