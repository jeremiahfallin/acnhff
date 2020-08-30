import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  background: #88dbe7;
  height: 75px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1 style={{ textAlign: "center", margin: 0 }}>ACNH Villager Planner</h1>
    </StyledHeader>
  );
};

export default Header;
