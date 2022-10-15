import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name:"cart",
  initialState:{
    products:[],
    quantity:0,
    total:0
  },
  reducers:{
    addProduct:(state,action)=>{
      state.quantity += 1;
      state.products.push(action.payload);
      state.total+=action.payload.price * action.payload.quantity;
    },
    deleteProduct:(state,action)=>{
      state.quantity -= 1;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload[0]),
        1);
      state.total-=action.payload[1] * action.payload[2];
    },
  }
})

export const {addProduct,deleteProduct,decreseQuantuty} = cartSlice.actions;

export default cartSlice.reducer;