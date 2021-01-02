import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import reducer from './root.reducer';
import rootSaga from './root.saga';

/**
 * Creates redux store and configures middleware
 */
const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const store = configureStore({ reducer, middleware, devTools: true });
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore;
