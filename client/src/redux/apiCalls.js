import { publicRequest } from "../requestMethod";
import { addUserFailure, addUserStart, addUserSuccess } from "./registerRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async(dispatch,user)=>{
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login",user)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    dispatch(loginFailure())
  }
}


export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (error) {
    dispatch(addUserFailure());
  }
};