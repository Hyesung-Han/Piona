import {combineReducers} from 'redux';
import userSlice from '../slices/user';
import shopSlice from '../slices/shop';
import cartSlice from '../slices/cart';
import picnicSlice from '../slices/picnic';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  shop: shopSlice.reducer,
  cart: cartSlice.reducer,
  picnic: picnicSlice.reducer,
});

export default rootReducer;
