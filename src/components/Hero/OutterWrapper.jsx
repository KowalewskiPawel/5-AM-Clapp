import styled, { css } from "styled-components";

const OutterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  ${(props) =>
    props.isLoading &&
    css`
      width: 100%;
      align-items: center;
    `}

  @media (max-width: 700px) {
    gap: 10px;
  }
`;

export default OutterWrapper;
