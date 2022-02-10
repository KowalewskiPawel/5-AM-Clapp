import styled from "styled-components";

const Warning = styled.span`
  font-family: "Ruda", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.03em;

  color: #ff5507;

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

export default Warning;
