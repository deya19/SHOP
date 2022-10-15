import React, {useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile, Tablate,largeTablate} from '../responsive'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from "react-stripe-checkout"
import { useEffect } from 'react'
import { userRequest } from '../requestMethod'
import { deleteProduct } from '../redux/cartRedux'
import { Helmet } from "react-helmet-async";
import { Dark } from '../dark-light'



const Container = styled.div``

const Wrapper = styled.div`
padding: 20px;

${Tablate({padding:"15px"})}
${mobile({padding:"10px"})}
`

const Title = styled.h1`
font-weight: 300;
text-align: center;
`

const Top  = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type==="filled" && "none"};
    background-color: ${props=>props.type==="filled"? "black" : "transparent"};
    color: #${props=>props.type==="filled" && "fff"};
    border-radius: 5px;
`

const TopTexts = styled.div`

${Tablate({display:"none"})}
${mobile({display:"none"})}
`

const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px;
`

const Bottom = styled.div`
display: flex;
justify-content: space-between;

${mobile({flexDirection:"column"})}
`

const Info = styled.div`
flex: 3;
`
const Product = styled.div`
display: flex;
justify-content: space-between;
position: relative;

${mobile({flexDirection:"column"})}
`


const ProductDetails = styled.div`
flex:2;
display: flex;
`

const Image = styled.img`
width: 200px;
`

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;

${Dark({color:"gray"})}
${largeTablate({fontSize:"15px",padding:"10px",width:"50px"})}
${Tablate({fontSize:"15px",padding:"10px",width:"50px"})}
${mobile({fontSize:"15px",padding:"10px",width:"50px"})}
`

const ProductName = styled.span`

${Tablate({marginBottom:"20px"})}
`

const ProductId = styled.span`

${largeTablate({fontSize:"13px"})}
${Tablate({marginBottom:"20px",fontSize:"11px"})}
${mobile({fontSize:"12px"})}
`

const ProductColor = styled.div`
width: 20px;
height:20px;
border-radius: 50%;
background-color: ${props=>props.color};

${Tablate({marginBottom:"20px"})}
`

const ProductSize = styled.span`

${Tablate({marginBottom:"20px"})}
`

const PriceDetails = styled.span`
flex:1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

${Dark({color:"gray"})}
`
const ProductAmmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`

const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;

${largeTablate({fontSize:"22px"})}
${Tablate({fontSize:"18px"})}
${mobile({margin:"5px 15px"})}
`

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;

${Tablate({fontSize:"28px"})}
${mobile({marginBottom:"20px"})}
`
const HrCart = styled.hr`
background-color: #eee;
border: none;
height: 1px;
margin-bottom:20px;
`

const Summary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height:55%;

${largeTablate({height:"35vh"})}
${Tablate({height:"38vh"})}
`
const SummaryTitle = styled.h1`
font-weight: 200;
`


const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props=>props.type === "total" && "500"} ;
font-size: ${props=>props.type === "total" && "24px"} ;
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const SummaryButton = styled.button`
width: 100%;
padding: 10px;
background-color: #000;
color: #fff;
font-weight: 600;
cursor: pointer;
border-radius: 5px;


${Dark({backgroundColor:"gray",border:"none"})}
`

const DeleteButton = styled.button`
width:15%;
height: 20%;
position:absolute;
top:5px;
right:50px;
color:#fff;
background-color:#000;
border-radius: 5px;
cursor: pointer;

${Dark({backgroundColor:"gray",border:"none"})}
${mobile({bottom:"20px",left:"5px",width:"100px",height:"40px",border:"none"})}
`
    
const KEY = process.env.REACT_APP_KEY;


function Cart() {
    const cart =useSelector(state=>state.cart)
    const [stripeToken,SetStripeToken] = useState(null);
    const navigate = useNavigate();
    const quantityCart = useSelector(state=>state.cart.quantity);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);



    const onToken = (token) =>{ 
     SetStripeToken(token);

    }
  
    

    useEffect(()=>{
    const makeRequest = async() =>{
      try {
        const res = await userRequest.post("/checkout/payment",{
          tokenId:stripeToken.id,
          amount:cart.total*100,
          
        });
        navigate(`/success`,{state:{stripeData:res.data,products:cart}});
      } catch (error) {
        console.log(error)
      }
    }
    stripeToken && makeRequest();
    },[stripeToken, cart.total, navigate, cart])


  return (
  <>
      <Helmet>
        <title>BASKET OF PRODUCTS</title>
        <meta name="description" content="basket of products"/>
      </Helmet>
      <Container>
          <Announcement/>
          <Navbar/>
          <Wrapper>
              <Title>YOUR BAG</Title>
              <Top>
                 <Link to="/"><TopButton>CONTINUE SHOPPING</TopButton></Link>
                  <TopTexts>
                      <TopText>Shopping Bag({quantityCart})</TopText>
                      <TopText>Your Wishlist (0)</TopText>
                  </TopTexts>
                  <TopButton type='filled' style={{visibility:"hidden"}}>CHECKOUT NOW</TopButton>
              </Top>
              <Bottom>
                  <Info>
                      {cart.products.map(product=>(
                        
                        <Product key={product._id} >
                          <ProductDetails>
                              <Image src={product.img}/>
                               <Details>
                                  <ProductName><b>Product: </b>{product.title}</ProductName>
                                  <ProductId><b>ID: </b>{product._id}</ProductId>
                                  <ProductColor color={product.color}/>
                                  <ProductSize><b>Size: </b>{product.size}</ProductSize>
                               </Details>
                          </ProductDetails>
                          <PriceDetails>
                           <ProductAmmountContainer>
                              <ProductAmount><b>Quantity: </b>{product.quantity}</ProductAmount>
                           </ProductAmmountContainer>
                           <ProductPrice><b>${product.price*product.quantity}</b></ProductPrice>
                          </PriceDetails>
                          <DeleteButton onClick={()=>dispatch(deleteProduct([product._id,product.price,product.quantity]))}>Delete Product</DeleteButton>
                          <HrCart/>
                      </Product>
                        ))}
                  </Info>
                  <Summary>
                      <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                      <SummaryItem>
                          <SummaryItemText>Subtotal</SummaryItemText>
                          <SummaryItemPrice>$ {cart.total ? cart.total : "0"}</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Estimated Shipping</SummaryItemText>
                          <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Shipping Discount</SummaryItemText>
                          <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem type="total">
                          <SummaryItemText>Total</SummaryItemText>
                          <SummaryItemPrice>$ {cart.total ? cart.total : "0"}</SummaryItemPrice>
                      </SummaryItem>
                      {currentUser? 
                      <StripeCheckout
                      name="Shop App"
                      image="https://cdn.icon-icons.com/icons2/1182/PNG/128/1490129392-rounded28_82189.png"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${cart.total}`}
                      amount={cart.total*100}
                      token={onToken}
                      stripeKey={KEY}
                      >
                      <SummaryButton>CHECHOUT NOW</SummaryButton>
                    </StripeCheckout>
                      :
                      <Link to="/register"><SummaryButton>Create Acount</SummaryButton></Link>}
                  </Summary>
              </Bottom>
          </Wrapper>
          <Footer/>
      </Container>
  </>
  )
}

export default Cart