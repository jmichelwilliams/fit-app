import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
    */
    :root {
        --margin-line: #941c5a;
        --lines: #1d97b8;
        --background-color: #fbfff1;
        --button-color: #3066be;
        --font-color: #b4c5e4;
        --background-darkercolor: #3c3744;
        --title-color: #3066be;
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
        font-family: 'Roboto', sans-serif;
        color: var(--font-color);
        background-color: var(--background-darkercolor);
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
    .MuiTypography-body1{
        color:white 
    }
    .MuiInputBase-root {
        color: var(--font-color) !important;
    }
    .MuiInputBase-root.Mui-focused {
        color: var(--font-color);
    }
    .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
        border-color: white;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: white;
    }
    .MuiInputBase-root-MuiOutlinedInput-root {
        color: var(--font-color);
    }
    .MuiInputBase-root.Mui-disabled {
        color: var(--font-color);
    }   
    .MuiInputLabel-outlined {
        color: white !important;
    }
    .MuiInputLabel-outlined.Mui-focused {
        color: white;
    }
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
        color: white;
    }
    input:-internal-autofill-selected {
        background-color: var(--background-darkercolor) !important;
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px var(--background-darkercolor) inset !important;
        -webkit-text-fill-color: var(--font-color) !important;
    }
    input:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--font-color) !important;
    }
    input:-webkit-autofill {
        -webkit-text-fill-color: var(--font-color) !important;
    }

`

export default GlobalStyle
