import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  permanantEmail: '',
  MapSeen: false,
  showLanding: true,
};
const MyUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.isAuthenticated = true;
      state.user = action.payload;
    },
    setVerification: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logoutUser: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setPermanatEmail: (state, action) => {
      state.permanantEmail = action.payload;
    },
    setMapSeen: (state, action) => {
      state.MapSeen = action.payload;
    },
    removeLandingPage: state => {
      state.showLanding = false;
    },
  },
});

export const {
  setUser,
  setVerification,
  logoutUser,
  removeLandingPage,
  setPermanatEmail,
  setMapSeen,
  markAsSeen,
} = MyUserSlice.actions;

export default MyUserSlice.reducer;
