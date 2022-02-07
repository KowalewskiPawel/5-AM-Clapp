import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 2rem;

  background: #1e1e1e;
  backdrop-filter: blur(16px);
  border-radius: 30px;

  & > h1 {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 43px;
    text-align: center;

    color: #ea7207;
  }
`;

export default Main;
