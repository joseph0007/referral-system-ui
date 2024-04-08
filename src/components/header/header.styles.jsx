import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  // height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  position: relative;

  @media only screen and (max-width: 56.25em) {
    padding: 0 2rem;
  }

  @media only screen and (max-width: 20em) {
    margin-bottom: 1rem;
  }
`;

export const OptionLink = styled(Link)`
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  text-transform: capitalize;
`;

export const LogoContainer = styled(Link)`
  align-self: center;

  @media only screen and (max-width: 37.5em) {
    width: 8rem;
    height: 8rem;
  }

  @media only screen and (max-width: 37.5em) {
    width: 6rem;
    height: 6rem;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
