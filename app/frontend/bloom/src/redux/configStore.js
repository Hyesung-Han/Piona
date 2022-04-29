import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import {UserReducer} from './reducers/UserReducer';
import {configureStore} from 'reduxjs/toolkit';

import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const allReducers = combineReducers({
  User: UserReducer,
});

const store = configureStore(
  persistReducer(persistConfig, allReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
