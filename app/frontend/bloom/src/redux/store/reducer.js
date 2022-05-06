import {combineReducers} from 'redux';
import userSlice from '../slices/user';
import shopSlice from '../slices/shop';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  shop: shopSlice.reducer,
});

export default rootReducer;
