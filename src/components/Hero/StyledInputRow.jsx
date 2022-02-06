import styled from "styled-components";

const StyledInputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  & > * {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 36px;
    text-align: start;

    color: #ffffff;
  }
`;

export default StyledInputRow;
