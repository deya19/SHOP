import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { Helmet } from "react-helmet-async";

function Home() {
  
 




  return (
    <>
      <Helmet>
        <title>HOME</title>
        <meta name="description" content="home"/>
      </Helmet>
      <div>
          <Announcement/>
          <Navbar />
          <Slider/>
          <Categories/>
          <Products/>
          <Newsletter/>
          <Footer/>
      </div>
    </>
  )
}

export default Home