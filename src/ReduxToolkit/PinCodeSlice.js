import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userPin: false,
};
const PinCodeSlice = createSlice({
  name: 'Pin',
  initialState,
  reducers: {
    setPin: state => {
      state.userPin = true;
    },
  },
});
export const {setPin} = PinCodeSlice.actions;
export default PinCodeSlice.reducer;
