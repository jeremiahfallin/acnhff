import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  position: absolute;
  width: 100%;
  background: #88dbe7;
  height: 3rem;
  top: 0;
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1 style={{ textAlign: "center", margin: 0 }}>ACNH Dreamies</h1>
    </StyledHeader>
  );
};

export default Header;
