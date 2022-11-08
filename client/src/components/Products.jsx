import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from "axios"

const Container = styled.div`
padding:20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`




function Products({cat,filters,sort}) {

const [products,setProducts]=useState([]);
const [filteredProducts,setFilteredProducts]=useState([]);

// filte as size and color
useEffect(() => {
const getProducts = async () => {
   try {
    const res = await axios.get(cat
      ? `https://floating-bayou-48172.herokuapp.com/api/products?category=${cat}`
      : `https://floating-bayou-48172.herokuapp.com/api/products`);
    
      setProducts(res.data)

   } catch (error) {
    console.log(error)
   }
}
getProducts();
},[cat])


useEffect(() => {
  cat && setFilteredProducts(
    products.filter(item =>Object.entries(filters).every(([key,value]) => 
    item[key].includes(value)
    ))
  )
},[products,cat,filters])


// to arrange products 1) new 2) the low price 3) the hight price
useEffect(() => {
  if(sort === "newst") {
    setFilteredProducts(prev =>
      [...prev].sort((a,b) => 
      a.createdAt - b.createdAt
      )
    )
  }else if(sort === "asc") {
    setFilteredProducts(prev =>
      [...prev].sort((a,b) => 
      a.price - b.price
      )
    )
  }else {
    setFilteredProducts(prev =>
      [...prev].sort((a,b) => 
      b.price - a.price
      )
    )
  }
},[sort])

  return (
    <Container>
     {cat ? filteredProducts.map(product => (
        <Product item={product} key={product._id}/>
     )) : products.map(product => (
      <Product item={product} key={product._id}/>
   ))}
    </Container>
  )
}

export default Products