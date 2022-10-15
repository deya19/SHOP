import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";
import { Helmet } from "react-helmet-async";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
   
 

   
  useEffect(() => {
    const createOrder = async() => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch(error) {
        console.log(error)
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
  <>
      <Helmet>
        <title>SUCCESS</title>
        <meta name="description" content="SUCCESS"/>
      </Helmet>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:"teal"
        }}
      >
        <img style={{width:70,height:70,marginBottom:15}} src="https://cdn.icon-icons.com/icons2/1182/PNG/128/1490129392-rounded28_82189.png" alt="" />
        {orderId
          ?  <span style={{color:"#fff"}}>Order has been created successfully. Your order number is : <b>{orderId}</b></span>
          : <span style={{color:"#fff"}}>Successfull. Your order is being prepared...</span>}
        <Link to="/"><button style={{ padding: 10, marginTop: 20 ,backgroundColor:"black",color:"white" , borderRadius:10, cursor:"pointer"}}>Go to Homepage</button></Link>
      </div>
  </>
  );
};

export default Success;


