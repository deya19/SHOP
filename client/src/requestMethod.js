import axios from "axios";

const BASE_URL = "https://floating-bayou-48172.herokuapp.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accsessToken;





export const publicRequest = axios.create({
  baseURL:BASE_URL,
});


export const userRequest = axios.create({
  baseURL:BASE_URL,
  headers:{token:`Bearer ${TOKEN}` }
})