import { publicRequest, userRequest } from "../requestMethod";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import {
  addUserFailure,
  addUserStart,
  addUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./OtherUserRedux.js";
import { loginFailure, loginStart, loginSuccess,logout } from "./userRedux";





///Login in or sign in 
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

///Login in or sign in for admin
export const loginAdmin = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/loginadmin", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

//Register
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (error) {
    dispatch(addUserFailure());
  }
};


//logout
export const logoutUser = async (dispatch) => {
  dispatch(logout());
};




///Products
// use dispatch only in paramts because we need to get all data
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id,product, dispatch) => {
  dispatch(updateProductStart());
  try {
     const res = await userRequest.put(`/products/${id}`,product)
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};


export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};



///Users
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(res.data));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id,user, dispatch) => {
  dispatch(updateUserStart());
  try {
     const res = await userRequest.put(`/users/${id}`,user)
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

