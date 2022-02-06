import styled from "styled-components";

const StyledNavbar = styled.nav`
  position: sticky;
  width: 100%;
  height: 5rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.8);

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
`;

export default StyledNavbar;
