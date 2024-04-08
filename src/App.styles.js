import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap");

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
    font-family: "Open Sans Condensed", sans-serif;
    font-weight: 300;
    font-size: 62.5%;

    @media only screen and (max-width: 112.5em) {
        font-size: 80%;
    }

    @media only screen and (max-width: 75em) {
        font-size: 60%;
    }

    @media only screen and (max-width: 56.25em) {
        font-size: 50%;
    }

    @media only screen and (max-width: 37.5em) {
        font-size: 40%;
    }

    @media only screen and (max-width: 20em) {
        font-size: 30%;
    }

}

body {
  padding: 2rem 6rem;
  box-sizing: border-box;
  font-size: 1.6rem;

  @media only screen and (max-width: 56.25em) {
    padding: 2rem 4rem;
}

  @media only screen and (max-width: 37.5em) {
    padding: 2rem 3rem;
  }

  @media only screen and (max-width: 20em) {
    padding: 2rem 2rem;
  }
}

a {
  text-decoration: none;
  color: black;
}

`;

export default GlobalStyles;
