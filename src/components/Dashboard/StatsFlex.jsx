import styled from "styled-components";

const StatsFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4.4rem;

  background: #1e1e1e;
  backdrop-filter: blur(8px);

  border-radius: 40px;

  @media (max-width: 1314px) {
    padding: 3.2rem;
  }

  @media (min-width: 1544px) {
    padding: 4rem;
  }

  @media (max-width: 1180px) {
    order: 3;
  }
`;

export default StatsFlex;
