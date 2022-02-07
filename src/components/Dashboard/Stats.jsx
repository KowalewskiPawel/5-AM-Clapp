import styled from "styled-components";

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  & > h1 {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 43px;

    color: #ea7207;
  }

  & > span {
    font-family: "Russo One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 31px;

    color: #d7d7d7;
  }

  & > span > img {
    margin-bottom: -0.2rem;
    transform: scale(0.7);
  }
`;

export default Stats;
