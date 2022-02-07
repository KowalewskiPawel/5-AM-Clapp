import styled, { css } from "styled-components";

const OutterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;

  ${(props) =>
    props.isLoading &&
    css`
      width: 100%;
      align-items: center;
    `}
`;

export default OutterWrapper;
