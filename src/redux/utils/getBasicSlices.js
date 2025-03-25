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