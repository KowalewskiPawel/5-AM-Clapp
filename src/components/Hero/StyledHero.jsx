import styled from "styled-components";

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;

  height: 24rem;
  width: 30rem;

  margin-top: 10%;
  margin-left: 20%;

  background: rgba(20, 20, 20, 0.9);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);

  border-radius: 40px;
`;

export default StyledHero;
