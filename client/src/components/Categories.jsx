import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import { mobile, Tablate } from '../responsive'
import CatagoryItem from './CatagoryItem'



const Container = styled.div`
display: flex;
padding: 20px;
justify-content:space-between;
${Tablate({padding:"0px",flexDirection:"column"})}
${mobile({padding:"0px",flexDirection:"column"})}
`


function Categories() {
  return (
    <Container>
      {categories.map(category=>(
        <CatagoryItem item={category} key={category.id}/>
      ))}
    </Container>
  )
}

export default Categories