import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Roboto, sans-serif;
    color: #FFF;
    background-color: #1f1f1f;
    letter-spacing: 1px;
    line-height: 1.6;
  }

  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: 600;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
  }

  .slick-disabled {
    color: inherit;
  }
`;

export default GlobalStyle;
