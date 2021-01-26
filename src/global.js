import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
     body {
            margin: 0;
            padding: 0;
            outline: 0;
            box-sizing: border-box;
     }
     :root{
    --color-background-white: #FFFFFF;
    --color-background-navbar: #228A95;

    --unnamed-color-ef9c4b: #EF9C4B;
    --unnamed-color-228a95: #228A95;
    --unnamed-color-ffffff: rgb(255, 255, 255);
    --unnamed-color-fd8030: #FD8030;    
    --unnamed-color-187680: #187680;
    --unnamed-color-777777: #777777;
    --unnamed-color-E8FFE3: #E8FFE3;
    --unnamed-color-bc3434: #BC3434;
    --unnamed-color-f8f8f8: #F8F8F8; 
    --unnamed-color-4f4f4f: #4f4f4f;
    /* font-size: 60%; */

    --unnamed-font-family-flexo: Flexo;
    --unnamed-font-style-normal: normal;
    --unnamed-font-style-italic: italic;
    --unnamed-font-weight-bold: bold;
    --unnamed-font-weight-medium: medium;
    --unnamed-font-size-18: 18px;
    --unnamed-font-size-25: 25px;
    --unnamed-font-size-32: 32px;
    --unnamed-font-size-35: 35px;
    --unnamed-font-size-40: 40px;
    --unnamed-character-spacing-0: 0px;
    --unnamed-line-spacing-43: 43px;
    --unnamed-line-spacing-47: 47px;
}
`;
export { GlobalStyle };