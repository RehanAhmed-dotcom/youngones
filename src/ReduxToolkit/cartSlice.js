import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
        state.total += parseInt(action.payload.price);
      } else {
        state.items.push({...action.payload, quantity: 1});
        state.total += parseInt(action.payload.price);
      }
    },
    removeItem(state, action) {
      const itemToRemoveIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      const itemToRemove = state.items[itemToRemoveIndex];
      if (itemToRemove?.quantity > 1) {
        state.items[itemToRemoveIndex].quantity -= 1;
        state.total -= parseInt(itemToRemove?.price);
      } else {
        state.items.splice(itemToRemoveIndex, 1);
        state.total -= parseInt(itemToRemove?.price);
      }
    },
    updateQuantity(state, action) {
      const itemToUpdate = state.items.find(
        item => item.id === action.payload.id,
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = action.payload.quantity;
        state.total = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      }
    },
    removeFromCart(state, action) {
      const itemToRemoveIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      const itemToRemove = state.items[itemToRemoveIndex];
      if (itemToRemove) {
        state.items.splice(itemToRemoveIndex, 1);
        state.total -= itemToRemove.price;
      }
    },
    emptyCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {addItem, removeItem, updateQuantity, removeFromCart, emptyCart} =
  cartSlice.actions;

export default cartSlice.reducer;
