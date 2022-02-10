import styled from "styled-components";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;

  height: auto;
  width: 70%;

  margin-top: 10%;
  margin-left: 15%;

  background: rgba(20, 20, 20, 0.9);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);

  border-radius: 40px;

  @media (max-width: 1566px) {
    width: 80%;
    margin-left: 10%;
  }

  @media (max-width: 450px) {
    width: 95%;
    margin: 10% auto;
    padding: 20px;
  }
`;

export default StyledDashboard;
