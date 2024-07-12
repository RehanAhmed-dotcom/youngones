import { createSlice } from "@reduxjs/toolkit";


const WishListSlice = createSlice({
  name: 'wishlist',
  initialState: {
    Favorite: false,
  },
  reducers: {
    addToWishlist: state => {
      state.Favorite = true;
    },
  },
});

export const { addToWishlist } = WishListSlice.actions;

export default WishListSlice.reducer;