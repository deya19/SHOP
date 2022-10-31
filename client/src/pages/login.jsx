import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import {mobile, Tablate} from "../responsive"
import { Helmet } from "react-helmet-async";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { removeEveryAlert } from '../redux/userRedux'



const Container = styled.div`
width:100vw;
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
    ),
     url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div`
width: 25%;
padding: 20px;
background-color: #fff;
border-radius:10px;

${Tablate({width:"60%"})}
${mobile({width:"75%"})}
`

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const Input = styled.input`
flex:1;
min-width: 40%;
margin: 10px 0px;
padding: 10px;
`


const Button = styled.button`
width: 100%;
border: none;
border-radius: 10px;
padding: 15px 20px ;
background-color: teal;
color:#fff;
cursor: pointer;
margin-bottom: 10px;
&:disabled{
  color:green;
  cursor: not-allowed;
}
`
const Link1 = styled.span`
color: #000;
margin: 5px 0px;
font-size: 15px;
text-decoration: underline;
cursor: pointer;
`


function Login() {
 
  const[username,SetUsername] = useState("")
  const[password,SetPassword] = useState("")
  const dispatch = useDispatch();
  const {isFetching,error,currentError} = useSelector(state=>state.user)
  



  const handleClick = (e) => {
    e.preventDefault();
    username && password && login(dispatch,{username, password});
  }



  return (
  <>
      <Helmet>
        <title>SIGN IN</title>
        <meta name="description" content="login"/>
      </Helmet>
      <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
            <Input 
             placeholder="name"
             onChange={(e) => SetUsername(e.target.value)}
             required
            />
            <Input 
            type="password"
            placeholder="Password" 
            onChange={(e) => SetPassword(e.target.value)}
            required
            />
            <Button onClick={handleClick} disabled={isFetching} >LOGIN</Button>
            {error && 
              <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">{currentError} — check it out!</Alert> 
              </Stack>
            }
            {
              isFetching &&
               <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
              </Stack> 
            }
            
            <Link1>DO NOT YOU REMEMBER THE PASSWORD?</Link1>
            <Link to="/register"><Link1 onClick={()=>dispatch(removeEveryAlert())}>CREATE A NEW ACCOUNT</Link1></Link>
        </Form>
      </Wrapper>
    </Container>
  </>
  )
}

export default Login