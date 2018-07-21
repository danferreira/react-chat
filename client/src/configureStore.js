import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  const persistor = persistStore(store);

  if (process.env.NODE_ENV !== "production") {

    if (module.hot) {
      module.hot.accept('./reducers/rootReducer', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return { store, persistor }
}


export default configureStore;