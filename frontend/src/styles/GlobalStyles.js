import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
    */

    :root {
        --background-color: #14213d;
        --button-color: #fca311;
        --font-color: #ffffff;
        --textinput-color:#fca311
    }
    html, body, div, span, applet, object, iframe,
    blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
       
    }

    input {
        &:disabled {
            cursor: not-allowed;
        }
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body, textarea {
        line-height: 1;
        font-family: 'Oswald', sans-serif;
         font-optical-sizing: auto;
        font-weight: 400;
         font-style: normal;
        color: var(--font-color);
        background-color: var(--background-color);
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* MUI STYLING */

    /* font color */
    .MuiInputBase-root {
        color: rgb(252,163,17);
    }
    
    /* border */
    .MuiOutlinedInput-notchedOutline {
        border-color: white
    }
      /* border when focused */
      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: white; 
    }
    /* disabled button color */
    /* .MuiButton-root.Mui-disabled {
        color:white
    }    */
    /* Input label color */
    .MuiInputLabel-outlined {
        color: white
    }
    /* Label when focused */
    .MuiInputLabel-outlined.Mui-focused {
        color: rgb(252,163,17);
    }
  
    /* Adorment color */
    /* #root > div.MuiBox-root.css-1shb3wy > div:nth-child(2) > form > div > div.MuiBox-root.css-0 > div > div.MuiFormControl-root.MuiTextField-root.css-11xq223-MuiFormControl-root-MuiTextField-root > div > div > p{
        color: rgb(252,163,17);
    }
    #root > div.MuiBox-root.css-1shb3wy > div:nth-child(2) > form > div > div.MuiBox-root.css-0 > div > div:nth-child(4) > div > div > div > p{
        color: rgb(252,163,17)
    } */

    .MuiBox-root{
        border-color:#e5e5e5
    }
    .MuiTypography-root{
        color: rgb(252,163,17)
    }


    /* Table Styling */
    .MuiTable-root{
        background-color:var(--background-color);
    }
    .MuiTableCell-root {
    border-bottom-color: rgb(252,163,17);
    border-top-color: rgb(252,163,17);
    padding:6px 16px
   
}
    .MuiTableCell-body{
    color:white;
   
    }
    .MuiSvgIcon-root{
    color:white !important
    }
    .MuiTableCell-head{
    color: rgb(252,163,17)
    }

    .css-11xur9t-MuiPaper-root-MuiTableContainer-root{
        border: none;
        background-color:var(--background-color)
        
    }

    .tablehead-row{
        background-color:rgb(252,163,17);
        color:black
    }
  input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px var(--background-color) inset !important;
        -webkit-text-fill-color: black !important;
    }  
     input:-webkit-autofill:focus {
        -webkit-text-fill-color: black !important;
    }
    input:-webkit-autofill {
        -webkit-text-fill-color: black !important;
    }

`

export default GlobalStyle
