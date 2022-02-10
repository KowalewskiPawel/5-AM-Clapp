import styled, { css } from "styled-components";

const OutterFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;

  ${(props) =>
    props.isLoading &&
    css`
      width: 100%;
      align-items: center;
    `}

  @media (max-width: 1180px) {
    flex-direction: column;
  }
`;

export default OutterFlex;
