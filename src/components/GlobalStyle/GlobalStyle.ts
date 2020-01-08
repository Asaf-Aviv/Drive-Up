import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    color: #FFF;
    background: #161616;
    letter-spacing: 0.5px;
    line-height: 1.3;
    overflow-x: hidden;
    @media (min-width: 600px) {
      line-height: 1.5;
    }
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    user-select: none;
    display: block;
  }

  button {
    cursor: pointer;
  }

  .slick-disabled {
    color: inherit;
  }

  .slick-disabled {
    color: inherit;
  }

  .slick-slide {
    padding: 0.5rem;
  }

  .slick-slider {
    padding: 0 1rem;
  }
`

export default GlobalStyle
