import { createSlice } from "@reduxjs/toolkit";

const MarkAsScreen = createSlice({
  name: 'screen',
  initialState: {
    completed: false,
    completed2: false,
  },
  reducers: {
    markAsSeen: state => {
      state.completed = true;
    },
    markAsSeen2: state => {
      state.completed2 = true;
    },
  },
});

export const {markAsSeen,markAsSeen2} = MarkAsScreen.actions;
export default MarkAsScreen.reducer;
