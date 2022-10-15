import {css} from "styled-components"


export const mobile = (props) =>{
   return css`
    @media screen and (max-width:540px){
    ${props}
    }
   `
};


export const Tablate = (props) =>{
   return css`
    @media screen and (max-width:768px){
    ${props}
    }
   `
};

export const largeTablate = (props) =>{
  return css`
   @media screen and (max-width:880px){
   ${props}
   }
  `
};

export const largeScreen = (props) =>{
  return css`
   @media screen and (max-width:1023px){
   ${props}
   }
  `
};

