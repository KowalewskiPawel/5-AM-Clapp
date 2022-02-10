import styled from "styled-components";

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  height: auto;

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
    margin-bottom: -0.8rem;
    transform: scale(0.7);
  }

  @media (max-width: 1266px) {
    & > h1 {
      font-size: 24px;
    }

    & > span {
      font-size: 14px;
    }

    & > article {
      font-size: 12px;
    }

    & > button > span {
      font-size: 14px;
    }
  }
`;

export default Stats;
