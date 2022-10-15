import React from 'react'
import styled from 'styled-components'
import { mobile, Tablate} from '../responsive'

const FixedAnn = styled.div`
  position:relative;
  height:30px;

`


const Container = styled.div`
height: 30px;
background-color:teal;
color:#fff;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
position: fixed;
top:0;
right: 0;
left:0;
z-index: 99;


`





function Announcement() {
  return (
    <FixedAnn>
      <Container>
        Super Deal! Free Shipping on Orders Over $50
      </Container>
    </FixedAnn>
  )
}

export default Announcement