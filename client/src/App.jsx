import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "./pages/cart";
import Error from "./pages/error";
import Home from "./pages/home";
import Login from "./pages/login";
import Product from "./pages/product";
import ProductList from "./pages/productList";
import Register from "./pages/register";
import Success from "./pages/success";
import { UserContext } from "./UserContext";
import "./app.css"


function App() {
   
  const user = useSelector(state=>state.user.currentUser);
  const [quantity,setQuantity] = useState(1);

  useEffect(() => {
    window.process = {
      ...window.process,
    };
    },[])

  return( 
  <div>
    <BrowserRouter>
    <UserContext.Provider value={[quantity,setQuantity]}>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/products/:category" element={<ProductList/>}/>
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/success" element={<Success/>}/>
      <Route path="/login" element={user? <Navigate to="/" replace/> : <Login/>}/> 
      <Route path="/register" element={user?<Navigate to="/" replace/>:<Register/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  </div>
  )
}

export default App;