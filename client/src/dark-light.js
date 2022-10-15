import {css} from "styled-components"


export const Dark = (props) =>{
   return css`
    @media (prefers-color-scheme: dark){
    ${props}
    }
   `
};