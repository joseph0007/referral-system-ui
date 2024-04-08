import styled, { css } from "styled-components";

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: 1px solid white;
  }
`;

const defaultButtonStyles = css`
  background-color: black;
  color: white;
  border: 1px solid transparent;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const googleSignInButtonStyles = css`
  background-color: #4267b2;
`;

const currentStyle = (props) => {
  if (props.isGoogleSignIn)
    return defaultButtonStyles + googleSignInButtonStyles;

  return props.inverted ? invertedButtonStyles : defaultButtonStyles;
};

export const CustomButtonContainer = styled.button`
  // max-width: 16.5rem;
  // height: 5rem;
  letter-spacing: 0.5px;
  padding: 1rem 3.5rem 1rem 3.5rem;
  font-size: 1.5rem;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:focus {
    outline: none;
  }

  ${currentStyle}

  @media only screen and (max-width: 75em) {
    padding: 1rem 1rem 1rem 1rem;
    font-size: 1.3rem;
  }

  @media only screen and (max-width: 56.25em) {
    padding: 1rem 1rem 1rem 1rem;
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 20em) {
    padding: 1rem 0.5rem 1rem 0.5rem;
    font-size: 1.2rem;
  }
`;
