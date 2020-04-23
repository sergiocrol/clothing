import { createStore, applyMiddleware } from 'redux';
// redux-persist allow us to cache the store in base of some configuration
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];

// this is necessary if we want to show the logs only in local, and not in production
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };