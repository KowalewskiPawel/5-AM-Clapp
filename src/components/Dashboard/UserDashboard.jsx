import styled from "styled-components";

const UserDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  width: 35rem;
  gap: 0.3rem;

  background: #1e1e1e;
  backdrop-filter: blur(16px);
  border-radius: 30px;

  & > span {
    font-family: "Ruda", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.03em;

    color: #ffffff;
  }

  & > h1 {
    align-self: center;
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 43px;
    text-align: center;

    color: #ea7207;
  }

  & > span > img {
    margin-bottom: -0.2rem;
    transform: scale(0.7);
  }

  @media (max-width: 1180px) {
    width: 100%;
  }
`;

export default UserDashboard;
