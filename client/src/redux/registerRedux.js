import { createSlice } from "@reduxjs/toolkit";


const registerUserSlice = createSlice({
  name: "regiter",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //ADD NEW USER
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload)
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addUserStart,
  addUserSuccess,
  addUserFailure
} = registerUserSlice.actions;

export default registerUserSlice.reducer;