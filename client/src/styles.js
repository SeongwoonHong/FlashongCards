import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Rubik', sans-serif;;
  }

  input, textarea, select, button {
    font: unset;
    border: none;
    
    &:focus, &:active {
      outline: none;
    }
  }
`;

export default GlobalStyle;
