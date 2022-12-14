import React from 'react'
import styled from 'styled-components'
import {Facebook,Instagram,Twitter,Pinterest,Room,Phone,MailOutline,} from "@mui/icons-material"
import { mobile, Tablate } from '../responsive'
import { Dark } from '../dark-light'

const Container = styled.div`
display: flex;

${mobile({flexDirection:"column"})}

`
const Left = styled.div`
flex:1;
display:flex;
flex-direction: column;
padding: 20px;
`
const Logo = styled.h1`

${Dark({color:"gray"})}
`

const Desc = styled.p`
margin: 20px 0px;

${Dark({color:"gray"})}
`
const SocialContainer = styled.div`
display: flex;
`
const SocialIcon = styled.div`
width:40px;
height:40px;
border-radius: 50%;
color: #fff;
background-color: #${props=> props.color};
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;
`

const Center = styled.div`
flex: 1;
padding: 20px;

${Dark({color:"gray"})}
${Tablate({display:"none"})}
${mobile({display:"none"})}
`
const Title = styled.h3`
 margin-bottom: 30px;
`
const List = styled.ul`
list-style: none;
display: flex;
flex-wrap: wrap;
`
const ListItem = styled.li`
width: 50%;
margin-bottom: 10px;
`


const Right = styled.div`
flex: 1;
padding:20px;

${Dark({color:"gray"})}
${mobile({backGroundColor:"#fff8f8"})}
`

const ContactItem = styled.div`
 margin-bottom:20px;
 display: flex;
 align-items: center;
`
const Payment = styled.img`
width: 50%;
`

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>DEYA'A.</Logo>
        <Desc>
            There are many variations of passeges of lorem Ipsum available, but 
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly believable.
        </Desc>
        <SocialContainer>
            <SocialIcon color="3B5999">
                < Facebook/>
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram/>
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <Twitter/>
            </SocialIcon>
            <SocialIcon color="E60023" >
                <Pinterest/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
       <Title>Useful Links</Title>
       <List>
        <ListItem>Home</ListItem>
        <ListItem>Cart</ListItem>
        <ListItem>Man Fashion</ListItem>
        <ListItem>Woman Fashion</ListItem>
        <ListItem>Accessories</ListItem>
        <ListItem>My Account</ListItem>
        <ListItem>Order Tracking</ListItem>
        <ListItem>Wishlist</ListItem>
        <ListItem>Wishlist</ListItem>
        <ListItem>Terms</ListItem>
       </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem><Room style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobichester 983336</ContactItem>
        <ContactItem><Phone style={{marginRight:"10px"}} /> +1 234 56 78</ContactItem>
        <ContactItem><MailOutline style={{marginRight:"10px"}}/> Contact@email.com</ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
      </Right>
    </Container>
  )
}

export default Footer