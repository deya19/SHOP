import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:{
    currentUser : null,
    currentError: null,
    isFetching:false,
    error:false,
  },
  reducers:{
  loginStart:(state)=>{
    state.isFetching=true   //get the data
    state.error = false
    state.currentError = null
  },
  loginSuccess:(state,action)=>{
    state.isFetching = false;
    state.currentUser = action.payload
  },
  loginFailure:(state,action)=>{
    state.isFetching = false;
    state.error = true
    state.currentError = action.payload
  },
  removeEveryAlert:(state)=>{
    state.isFetching = false;
    state.error = false;
    state.currentError = null;
    state.go = null  
  },
  logout1:(state)=>{
    state.currentUser = null;
    state.error=false;
    state.currentError=null;
    state.go = null 
  } 
  }
})

export const {loginStart,loginSuccess,loginFailure,removeEveryAlert,logout1} = userSlice.actions;

export default userSlice.reducer;