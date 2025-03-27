import { createSlice } from "@reduxjs/toolkit";

const baseState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  data: null,
  status: null,
};

export const getBasicSlice = (name, initialState) => {
  return createSlice({
    name,
    initialState: { ...baseState, ...initialState },
    reducers: {
      fetchRequest: (state) => {

        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isSuccess = false;
        state.data = null;
        state.status = null;
      },
      fetchSuccess: (state, action) => {
        console.log("action", action);
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.isSuccess = true;
        state.data = action.payload;
        state.status = action.status || 200;
      },
      fetchFailure: (state, action) => {

        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.data;
        state.isSuccess = false;
        state.data = null;
        state.status = action.payload?.status || 500;
      },
    },
  });
};


// ✅ Cart Slice (Manages Cart Functionality)
const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cartItems: [],
    },
    reducers: {
      addToCart: (state, action) => {
        console.log("action", action);
        const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
      },
      removeFromCart: (state, action) => {
        console.log("action", action);
        const itemIndex = state.cartItems.findIndex((i) => i.id === action.payload.id);
        if (itemIndex !== -1) {
          if (action.payload.quantity > 0) {
            state.cartItems[itemIndex].quantity -= 1; // Reduce quantity
          } else {
            state.cartItems.splice(itemIndex, 1); // Remove item completely if quantity is 0
          }
        }
      },
    },
  });
  
  // ✅ Export Actions
  export const { addToCart, removeFromCart } = cartSlice.actions;
  export const cartReducer = cartSlice.reducer;