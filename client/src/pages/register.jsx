import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile, Tablate } from '../responsive'
import { addUser } from '../redux/apiCalls';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const Container = styled.div`
width:100vw;
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
    ),
     url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: #fff;
border-radius:10px;
position: relative;



${Tablate({width:"60%"})}
${mobile({width:"75%"})}
`

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`

const Form = styled.form`
display: flex;
flex-wrap:wrap ;
`

const Input = styled.input`
flex:1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`

const Agreement = styled.span`
font-size: 12px;
margin: 10px 0px;
`

const Button = styled.button`
width: 100%;
border: none;
border-radius: 10px;
padding: 15px 20px ;
background-color: teal;
color:#fff;
cursor: pointer;
margin-bottom:10px
`
const Link1 = styled.span`
color: #000;
margin: 100px 3px;
font-size: 15px;
text-decoration: underline;
cursor: pointer;
`

const Error = styled.span`
color:red;
font-size: 15px;
position:absolute;
bottom:15px;
left:20px;
font-size: 18px;
`



function Register() {
 
  const [inputs,setInputs] = useState({});
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [password,setPassword] = useState("");
  const [repassword,setRePassword] = useState("");
  const {isFetching} = useSelector(state=>state.user)

  const handleChange = (e) =>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
    }




    const handleClick = (e) => {
      e.preventDefault();
       inputs && password && password===repassword && addUser({...inputs,password},dispatch) && navigate(`/login`);
    }




  return (
   <>
   <Helmet>
        <title>REGISTER</title>
        <meta name="description" content="register"/>
      </Helmet>
     <Container>
       <Wrapper>
         <Title>CREATE AN ACCOUNT</Title>
         <Form>
             <Input placeholder="Full Name" required onChange={handleChange} name="name"/>
             <Input placeholder="Phone Number" type="tel" required onChange={handleChange} name="phone"/>
             <Input placeholder="username" required type="text" onChange={handleChange} name="username"/>
             <Input placeholder="email" required type="email" onChange={handleChange} name="email"/>
             <Input placeholder="password" type="password" required onChange={(e)=>setPassword(e.target.value)} name="password"/>
             <Input required placeholder="confirm password" type="password" onChange={(e)=>setRePassword(e.target.value)}/>
             <Agreement>
                 By creating an account, I consent to the processing of my personal 
                 data in according with the <b>PRIVECY POLICY</b>
             </Agreement>
             <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
             {password !== repassword && 
              <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">The Passwords aren't the same — check!</Alert> 
              </Stack> 
             }
             {
              isFetching &&
               <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
              </Stack> 
            }
             <Link to="/login"><Link1>DO YOU HAVE AN ACCOUNT?</Link1></Link>
         </Form>
       </Wrapper>
     </Container>
   </>
  )
}

export default Register