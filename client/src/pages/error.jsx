import React from 'react'
import styled from 'styled-components'
import { Helmet } from "react-helmet-async";

const ErrorCon = styled.div`
  width:100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
` 


function Error() {
  return (
    <>
    <Helmet>
        <title>ERROR</title>
        <meta name="description" content="error"/>
      </Helmet>
      <ErrorCon>
      <div style={{fontWeight:"500",fontSize:"30px"}}>
      The page is't found (404) &#128546;
      </div>
      </ErrorCon>
    </>
  )
}

export default Error