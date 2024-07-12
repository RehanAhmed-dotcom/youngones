import MyUserSlice from './MyUserSlice';
import MarkAsScreen from './MarkAsScreen';
import WhisListSlice from './WhisListSlice';
import cartSlice from './cartSlice';
import PinCodeSlice from './PinCodeSlice';
import BoardAssessmentSlice from './BoardAssessmentSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from '@react-native-async-storage/async-storage';

let persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'screen', 'wishlist', 'boardAssessment', 'cart', 'Pin'],
};
let rootReducer = combineReducers({
  user: MyUserSlice,
  screen: MarkAsScreen,
  wishlist: WhisListSlice,
  boardAssessment: BoardAssessmentSlice,
  cart: cartSlice,
  Pin: PinCodeSlice,
});
let persistedReducer = persistReducer(persistConfig, rootReducer);

const Mystore = configureStore({
  reducer: persistedReducer,
});
export default Mystore;
