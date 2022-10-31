import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:{
    currentUser : null,
    currentError:null,
    isFetching:false,
    error:false
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
    state.error = true;
    state.currentError = action.payload
  },
  logout:(state)=>{
    state.currentUser = null;
    state.error=false;
    state.currentError=null
  }
  }
})

export const {loginStart,loginSuccess,loginFailure,logout} = userSlice.actions;

export default userSlice.reducer;