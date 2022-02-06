import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 26px;
  width: 100%;

  background: #ea7207;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 20px;
  transition: 200ms ease-in-out;

  & > * {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;

    color: #ededed;
  }

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    background: #f57d14;
  }
`;

export default StyledButton;
