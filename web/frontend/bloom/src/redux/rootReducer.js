import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import productReducer from './slices/product';
import authReducer from './slices/auth';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const AuthPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user_id', 'shop_number', 'name', 'phone', 'access_token'],
};

const rootReducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),
  auth: persistReducer(AuthPersistConfig, authReducer),
});

export { rootPersistConfig, rootReducer };
