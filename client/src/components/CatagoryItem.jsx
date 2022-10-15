import React from 'react'
import styled from 'styled-components'
import { mobile, Tablate } from '../responsive'
import {Link} from "react-router-dom"
import { Dark } from '../dark-light'

const Container = styled.div`
flex: 1;
margin: 3px;
height: 70vh;
position: relative;
`

const Image = styled.img`
width:100%;
height:100%;
object-fit: cover;

${Tablate({height:"50vh"})}
${mobile({height:"30vh"})}
`
const Info = styled.div`
position: absolute;
top:0;
left:0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title = styled.h1`
color:#fff;
margin-bottom: 20px;


${Dark({color:"gray"})}
`


const Button = styled.button`
border:none;
padding: 10px;
background-color: #fff;
color:gray;
cursor: pointer;
font-weight: 600;

${Dark({color:"#fff",backgroundColor:"gray"})}
`


function CatagoryItem({item}) {
  return (
    <Container>
     <Link to={`/products/${item.cat}`}>
       <Image src={item.img} loading= "lazy" />
        <Info>
         <Title>{item.title}</Title>
         <Button>SHOP NOW</Button>
        </Info>
     </Link>
    </Container>
  )
}

export default CatagoryItem