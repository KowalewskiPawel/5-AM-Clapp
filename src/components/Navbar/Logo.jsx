import styled from "styled-components";

const Logo = styled.h1`
  font-family: "Russo One", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 68px;
  margin-right: 46%;
  color: #ea7207;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & > img {
    position: absolute;
    top: 1.5rem;
    margin-left: -2.5rem;
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 880px) {
    font-size: 1.2rem;
    margin-right: 12%;

    & > img {
      top: 1.9rem;
      margin-left: -2rem;
      width: 1.2rem;
      height: auto;
    }
  }
`;

export default Logo;
