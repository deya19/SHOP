import { createSlice } from "@reduxjs/toolkit";


const registerUserSlice = createSlice({
  name: "register",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
    currentError: null,
    go:null
  },
  reducers: {
    //ADD NEW USER
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.currentError = null;
      state.go = null
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
      state.go = true
    },
    addUserFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.currentError = action.payload
      state.go = null;
    },
    removeEveryAlert:(state)=>{
      state.isFetching = false;
      state.error = false;
      state.currentError = null;
      state.go = null  
    }
  },
});

export const {
  addUserStart,
  addUserSuccess,
  addUserFailure,
  removeEveryAlert

} = registerUserSlice.actions;

export default registerUserSlice.reducer;