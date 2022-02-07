import styled, { css } from "styled-components";

const OutterFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  ${(props) =>
    props.isLoading &&
    css`
      width: 100%;
      align-items: center;
    `}
`;

export default OutterFlex;
